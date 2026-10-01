import * as React from 'react'
import {ButtonHTMLAttributes} from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
    return (
        <button
            {...props}
        >
            {props.children}
        </button>
    )
}
