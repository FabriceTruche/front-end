import * as React from "react";
import {formSwitch, FormSwitchProps} from "../../containers/FormSwitch/FormSwitch";

export type XTextareaProps = {
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
} & FormSwitchProps

export const Textarea=(props:XTextareaProps)=>formSwitch(TextareaForm,TextareaNoform)(props)

const TextareaNoform=(props:XTextareaProps)=>(
    <div key={props.name}>
        <div>
            <label id={props.name}>
                {props.label}
            </label>
        </div>
        <div>
            <TextareaInput {...props} />
            <span className="input-control">
                {props.required ? "(*)" : ""}
            </span><br/>
            {props.help && <span className="input-help">({props.help})</span>}
        </div>
        <div className="input-decoration">
            
            {props.debug && (
                <div className="input-debug">{props.name}</div>
            )}
        </div>
    </div>
)

const TextareaForm=(props:XTextareaProps)=>(
    <tr key={props.name}>
        <td>
            <label id={props.name}>
                {props.label}
            </label>
        </td>
        <td>
            <TextareaInput {...props} />
            <span className="input-control">
                {props.required ? "(*)" : ""}
            </span><br/>
            {props.help && <span className="input-help">({props.help})</span>}
        </td>
        <td className="input-decoration">
            
            {props.debug && (
                <div className="input-debug">{props.name}</div>
            )}
        </td>
    </tr>
)

const TextareaInput=(props:XTextareaProps)=>{
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
