import * as React from "react";
// import {FormSwitch, FormSwitchProps} from "../../containers/FormSwitch/FormSwitch";
export type ListItem = {
    value: string
    label: string
}
export type ListProps = {
    name: string
    defaultValue?:string|string[]
    label: string
    multiple?: boolean
    help?: string
    items: ListItem[]
    debug?:boolean
    onChange?: (value:ListItem[])=>void
}
export const List=(props:ListProps)=>{
    const getValue=(e:any): ListItem[] => {
        let res:ListItem[] = []
        if (props.multiple) {
            for(const r of e.target.selectedOptions)
                res.push({
                    value:r.value,
                    label:r.label
                })
            return res
        }

        res=[{
            value: e.target.selectedOptions[0].value,
            label: e.target.selectedOptions[0].label,
        }]

        return res
    }

    return (
        <select
            name={props.name}
            id={props.name}
            multiple={props.multiple}
            defaultValue={props.defaultValue}
            onChange={(event:any)=>{
                const v: ListItem[] = getValue(event)
                if (props.onChange!==undefined)
                    props.onChange(v)
            }}
        >
            {props.items.map((item:{value:string,label:string,selected?:boolean},index:number)=>{
                return (
                    <option
                        key={index}
                        value={item.value}
                    >
                        {item.label}
                    </option>
                )
            })}
        </select>
    )
}


