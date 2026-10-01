import * as React from "react";

export type CheckboxProps = {
    name: string
    defaultValue?: boolean
    title?:string
    label?: string
    help?: string
    debug?:boolean
    onChange?: (value:any)=>void
}
export const Checkbox=(props:CheckboxProps)=>{
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
        </>
    )
}
