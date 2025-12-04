import * as React from "react";
// import {FormSwitch, FormSwitchProps} from "../../containers/FormSwitch/FormSwitch";

export type TextareaProps = {
    label: string
    name: string
    nullIfEmpty?: boolean
    placeholder?: string
    defaultValue?: string
    required?: boolean
    help?: string
    data?: string[]
    rows?:number
    cols?:number
    maxlength?:number
    debug?:boolean
    onChange?: (value:any)=>void
}
export const Textarea=(props:TextareaProps)=>{
    const getValue=(e:any): any => {
        const nie: boolean = (props.nullIfEmpty === undefined) ? true : props.nullIfEmpty
        return (e.target.value === "" && nie) ? null : e.target.value
    }

    return (
        <textarea
            id={props.name}
            placeholder={props.placeholder}
            required={props.required}
            rows={props.rows}
            cols={props.cols}
            maxLength={props.maxlength}
            defaultValue={props.defaultValue}
            onKeyDown={(k: React.KeyboardEvent<HTMLTextAreaElement>)=>{
                console.log('1',k.key)
            }}
            onChange={(e: any) => {
                // console.log(e)
                if (props.onChange) {
                    const v = getValue(e)
                    props.onChange(v)
                }
            }}
        />
    )
}
