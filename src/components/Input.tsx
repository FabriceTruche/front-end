import React, {useState} from "react";
import {IInputManager} from "./IInputManager";

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
