import React from "react";

export type FormSwitchProps = {
    __with_form?: boolean
}
export function FormSwitch<Props extends FormSwitchProps>(
    WithForm:React.ComponentType<Props>,
    WithoutForm:React.ComponentType<Props>) 
{
    return (props:Props)=>{
        if (props.__with_form===undefined)
            return <WithoutForm {...props}/>
        return <WithForm {...props} />
    }
} 
