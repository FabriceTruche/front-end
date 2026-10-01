import React from "react";
import {Input} from "./Input";
import {InputTextManager} from "./InputTextManager";
import {IInputManager} from "./IInputManager";
import {InputType} from "../Text/TextInput";

export type InputBasicProps = {
    name: string
    type?: InputType
    label?: string
    initValue?: any
    placeholder?: string
    pattern?: string
    mask?: string
    required?: boolean
    autocomplete?: string
    onChange?: (value:any)=>void
    onReset?: (value:any)=>void
}
export const InputText=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type:"text"
        })}
    />
)
export const InputDate=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type:"date"
        })}
    />
)
export const InputDateTime=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type:"datetime"
        })}
    />
)
export const InputTime=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type:"time"
        })}
    />
)
export const InputMonth=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type:"month"
        })}
    />
)
export const InputWeek=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type:"week"
        })}
    />
)
export const InputYear=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type: "tel",
            mask: "^[0-9]{0,4}$",
            pattern: "[0-9]{4,4}|[0-9]{2,2}",
        })}
    />
)
export const InputCurrency=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type: "tel",
            mask: "^(-|\\\+)?[0-9]*\\\.?[0-9]{0,2}$",
            pattern: "(\\\+|-)?[0-9]{1,6}(\\\.[0-9]{2,2})?"
        })}
    />
)
export const InputNumber=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type: "number",
        })}
    />
)
export const InputRange=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type: "range",
            initValue: props.initValue|1
        })}
    />
)
export const InputPassword=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type: "password",
        })}
    />
)
export const InputUrl=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type: "url",
        })}
    />
)
export const InputTel=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type: "tel",
            autocomplete: "tel",
            mask: "^[0-9]{0,10}$",
            pattern: "[0-9]{10}"
        })}
    />
)
export const InputMail=(props:InputBasicProps) => (
    <Input
        inputManager={new InputTextManager({
            ...props,
            type: "email",
            autocomplete: "email",
            mask: "^[a-z0-9@\\\.\\\-\\\+_%]+$",
            pattern: "[a-z0-9%\\\._\\\+\\\-]+@\\\w+(\\\.\\\w+)+"
        })}
    />
)
