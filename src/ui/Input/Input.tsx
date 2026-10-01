import React, {useState} from "react";
import {InputType} from "../Text/TextInput";
import {IInputManager} from "./IInputManager";

/*    name: string
    label?: string
    initValue?: any
    placeholder?: string
    pattern?: string
    mask?: string
    required?: boolean
    autocomplete?: string
    // ---- handle
    onChange?: (value:any)=>void
    onReset?: (value:any)=>void
    // ---- internals
    min?: string
    max?: string
    step?: string
    type: InputType
*/

export type InputProps<T> = {
    inputManager: IInputManager<React.ChangeEvent<HTMLInputElement>, React.MouseEvent<HTMLSpanElement>>
}
export const Input=(props:InputProps<React.ChangeEvent<HTMLInputElement>>)=>{
    const [value,setValue]=useState<string>(props.inputManager.props.initValue ?? "")

    return (
        <div>
            <span className="input-text">
                <input
                    {...props}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.inputManager.handleInputChange(e,setValue)}
                />
                <span
                    onClick={(e: React.MouseEvent<HTMLSpanElement>) => props.inputManager.handleInputReset(e,setValue)}
                >
                    &#11198;
                </span>
            </span>

            <span className="input-control">
                {props.inputManager.props.required ? "(*)" : ""}
                {props.inputManager.props.pattern}
            </span>
        </div>
    )
}
