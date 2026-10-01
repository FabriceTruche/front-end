import * as React from "react";
import {useEffect, useState} from "react";
import './text-input.css'
import {helper} from "../common/Helper";

export type InputType = 'date' | 'datetime' | 'month' | 'number' | 'range' | 'text' | 'password' | 'time' | 'week' | 'url' | 'email' | 'year' | 'currency' | 'tel'

type InputHtmlType = 'date' | 'datetime-local' | 'email' | 'hidden' | 'month' | 'number' | 'password' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'
type InputProperties = {
    type: InputHtmlType
    mask?: string
    pattern?: string
    autocomplete?: string
    valueFromTarget : (value:HTMLInputElement) => any
    stringValue: (defaultValue: any) => string
}
export const inputTypeProperties:  Record<InputType, InputProperties> = {
    text: {
        autocomplete: "on",
        type: "text",
        valueFromTarget: (target: HTMLInputElement) => target.value,
        stringValue: (defaultValue: any) => defaultValue
    },
    date: {
        type: "date",
        valueFromTarget: (target: HTMLInputElement): Date => new Date(target.value),
        stringValue: (defaultValue: any) => defaultValue.toISOString().split('T')[0]
    },
    datetime: {
        type: "datetime-local",
        valueFromTarget: (target: HTMLInputElement): Date => new Date(target.valueAsNumber),
        stringValue: (defaultValue: any) => defaultValue.toISOString().slice(0, 16)
    },
    month: {
        type: "month",
        valueFromTarget: (target: HTMLInputElement): number => +target.value,
        stringValue: (defaultValue: any) => defaultValue.toISOString().slice(0, 7)
    },
    week: {
        type: "week",
        valueFromTarget: (target: HTMLInputElement) => target.value,
        stringValue: (defaultValue: any) => defaultValue
    },
    number: {
        type: "number",
        valueFromTarget: (target: HTMLInputElement): number => +target.value,
        stringValue: (defaultValue: any) => defaultValue
    },
    range: {
        type: "range",
        valueFromTarget: (target: HTMLInputElement): number => +target.value,
        stringValue: (defaultValue: any) => defaultValue
    },
    password: {
        autocomplete: "current-password",
        type: "password",
        valueFromTarget: (target: HTMLInputElement) => target.value,
        stringValue: (defaultValue: any) => defaultValue
    },
    time: {
        type: "time",
        valueFromTarget: (target: HTMLInputElement) => target.value,
        stringValue: (defaultValue: any) => String(defaultValue.getHours()).padStart(2, '0') + ":" + String(defaultValue.getMinutes()).padStart(2, '0') + ":" + String(defaultValue.getSeconds()).padStart(2, '0')
    },
    url: {
        type: "url",
        valueFromTarget: (target: HTMLInputElement) => target.value,
        stringValue: (defaultValue: any) => defaultValue
    },
    email: {
        type: "email",
        autocomplete: "email",
        mask: "^[a-z0-9@\\\.\\\-\\\+_%]+$",
        pattern: "[a-z0-9%\\\._\\\+\\\-]+@\\\w+(\\\.\\\w+)+",
        valueFromTarget: (target: any) => target.value,
        stringValue: (defaultValue: any) => defaultValue
    },
    year: {
        type: "tel",
        mask: "^[0-9]{0,4}$",
        pattern: "[0-9]{4,4}|[0-9]{2,2}",
        valueFromTarget: (target: any): number => +target.value,
        stringValue: (defaultValue: any) => defaultValue.year
    },
    currency: {
        type: "tel",
        mask: "^(-|\\\+)?[0-9]*\\\.?[0-9]{0,2}$",
        pattern: "(\\\+|-)?[0-9]{1,6}(\\\.[0-9]{2,2})?",
        valueFromTarget: (target: any): number => +target.value,
        stringValue: (defaultValue: any) => defaultValue
    },
    tel: {
        type: "tel",
        autocomplete: "tel",
        mask: "^[0-9]{0,10}$",
        pattern: "[0-9]{10}",
        valueFromTarget: (target: any) => target.value,
        stringValue: (defaultValue: any) => defaultValue
    },
}


export type TextInputProps = {
    name: string
    label?: string
    inputType?: InputType
    defaultValue?: any
    nullIfEmpty?: boolean
    placeholder?: string
    pattern?: string
    mask?: string
    required?: boolean
    help?: string
    data?: string[]
    debug?:boolean
    min?:number
    max?:number
    step?:number
    onChange?: (value:any)=>void
    onChangeEnter?: (value:any)=>void
    onReset?: ()=>void
}
export const TextInput=(props:TextInputProps)=>{
    const [value,setValue]=useState(props.defaultValue)

    const inputType: InputType = props.inputType || 'text'
    const properties: InputProperties = inputTypeProperties[inputType]
    const mask: string|undefined = props.mask || properties.mask
    const pattern = props.pattern || properties.pattern

    // const isRange: boolean = inputType === "range"
    // let min: number = props.min || 1
    // let max: number = props.max || 10
    // let step: number = props.step || 1

    useEffect(()=>{
        if (props.defaultValue !== undefined)
            setValue(properties.stringValue(props.defaultValue))
    },[props.defaultValue])

    const handleChange=(element:HTMLInputElement): boolean => {
        const nie: boolean = (props.nullIfEmpty === undefined) ? true : props.nullIfEmpty
        const newInputValue = properties.valueFromTarget(element)
        const newValue = (newInputValue === undefined && nie) ? null : newInputValue

        if (newValue === undefined || newValue === "" || newValue === null) {
            setValueAndNotify(undefined)
            return true
        }

        if (mask === undefined) {
            setValueAndNotify(newValue)
            return true
        }

        const re = new RegExp(mask, "i")

        if (re.test(newValue)) {
            setValueAndNotify(newValue)
            return true
        }

        return false
    }

    const setValueAndNotify=(newValue:any)=>{
        setValue(newValue)
        if (props.onChange)
            props.onChange(newValue)
    }

    return (
        <>
            <span className="input-text">
                <input
                    // id={key}
                    name={props.name}
                    type={properties.type}
                    autoComplete={properties.autocomplete}
                    placeholder={props.placeholder}
                    pattern={pattern}
                    required={props.required}
                    value={value??""}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e.target)
                    }}
                    onKeyDown={(e: React.KeyboardEvent)=>{
                        if ((e.key === "Enter") && props.onChangeEnter)
                            props.onChangeEnter(value)
                    }}
                    list={(props.data!==undefined) ? props.name+"-data" : undefined}
                />
                <span
                    onClick={()=>{
                        setValueAndNotify("")
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
