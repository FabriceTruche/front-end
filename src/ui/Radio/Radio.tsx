import * as React from "react";
import {Fragment} from "react";
// import {FormSwitch, FormSwitchProps} from "../../containers/FormSwitch/FormSwitch";

export type XRadioProps = {
    name: string
    defaultValue?: string
    choices: {
        id: string
        label: string
        value: string
    }[]
    help?: string
    debug?:boolean
    onChange?: (value:any)=>void
}
export const Radio=(props:XRadioProps)=>(
    <div>
        {props.choices.map((c:{id:string,label:string,value:any},index:number)=>{
            return (
                <Fragment key={c.id}>
                    <input
                        name={props.name}
                        id={c.id}
                        type='radio'
                        defaultChecked={(props.defaultValue!==undefined) && (props.defaultValue===c.value)}
                        onChange={(e: any) => {
                            const v = e.target.value
                            // console.log(e,v)
                            if (props.onChange!==undefined)
                                props.onChange(v)
                        }}
                        value={c.value}
                    />
                    <label
                        htmlFor={c.id}
                    >
                        {c.label}
                    </label>
                </Fragment>
            )
        })}
    </div>
)