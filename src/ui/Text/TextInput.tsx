import * as React from "react";
import {useState} from "react";
import './text-input.css'
import {dataHelper} from "../../helper/DataHelper";

export type TextInputProps = {
    name: string
    label: string
    type?: | 'date' | 'datetime-local' | 'email' | 'hidden' | 'month' | 'number' | 'password' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'
    defaultValue?: string
    nullIfEmpty?: boolean
    placeholder?: string
    pattern?: string
    required?: boolean
    help?: string
    data?: string[]
    debug?:boolean
    onChange?: (value:any)=>void
    onReset?: ()=>void
}
export const TextInput=(props:TextInputProps)=>{
    const [value,setValue]=useState<string >(props.defaultValue??"")

    const getValue=(e:any): any => {
        const nie: boolean = (props.nullIfEmpty === undefined) ? true : props.nullIfEmpty
        return (e.target.value === "" && nie) ? null : e.target.value
    }
    const key=dataHelper.genKey()

    return (
        <>
            <span className="input-text">
                <input
                    id={key}
                    name={props.name}
                    type={(props.type===undefined) ? "text" : props.type}
                    placeholder={props.placeholder}
                    pattern={props.pattern}
                    required={props.required}
                    defaultValue={props.defaultValue}
                    value={value}
                    step={"any"}
                    onChange={(e: any) => {
                        const v = getValue(e)
                        setValue(v)
                        if (props.onChange) props.onChange(v)
                    }}
                    list={(props.data!==undefined) ? props.name+"-data" : undefined}
                />
                <span
                    onClick={()=>{
                        setValue(props.defaultValue??"")
                        if (props.defaultValue!==undefined) {
                            if (props.onChange) props.onChange(props.defaultValue)
                        }
                        if (props.onReset) {
                            props.onReset()
                        }
                    }}
                >
                    &#11198;
                </span>
            </span>

            {(props.data!==undefined) && (
                <datalist
                    id={props.name+"-data"}
                >
                    {props.data.map((item:string,index:number)=>{
                        return (
                            <option
                                key={index}
                                value={item}
                            />
                        )
                    })}
                </datalist>
            )}
            <span className="input-control">
                {props.required ? "(*)" : ""}
                {props.pattern}
            </span>
        </>
    )
}
