import * as React from "react";
import {FormSwitch, FormSwitchProps} from "../../containers/FormSwitch/FormSwitch";

export type CheckboxProps = {
    name: string
    defaultValue?: boolean
    title?:string
    label: string
    help?: string
    debug?:boolean
    onChange?: (value:any)=>void
} & FormSwitchProps

export const Checkbox=(props:CheckboxProps)=>FormSwitch(Checkbox_form,Checkbox_noform)(props)

const Checkbox_form=(props:CheckboxProps)=>{
    return (
        <tr key={props.name}>
            <td>
                {props.title}
            </td>
            <td>
                <XCheckbox_input {...props}/>
                <br/>
                {props.help && <span className="input-help">({props.help})</span>}
            </td>
            <td>
                {props.debug && (
                    <div className="input-debug">{props.name}</div>
                )}
            </td>
        </tr>
    )
}

const Checkbox_noform=(props:CheckboxProps)=>{
    return (
        <div key={props.name}>
            <div>
                {props.title}
            </div>
            <div>
                <XCheckbox_input {...props}/>
                <br/>
                {props.help && <span className="input-help">({props.help})</span>}
            </div>
            <div>
                {props.debug && (
                    <div className="input-debug">{props.name}</div>
                )}
            </div>
        </div>
    )
}

const XCheckbox_input=(props:CheckboxProps)=>{
    return (
        <>
            <input
                id={props.name}
                type={"checkbox"}
                defaultChecked={props.defaultValue}
                onChange={(e: any) => {
                    // console.log(e)
                    if (props.onChange!==undefined) {
                        const v = e.target.checked
                        props.onChange(v)
                    }
                }}
            />
            <label htmlFor={props.name}>
                {props.label}
            </label>
        </>
    )
}
