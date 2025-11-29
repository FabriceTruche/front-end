import * as React from 'react'
import {JSX, ReactElement, useEffect, useRef, useState} from "react";
import {TextInput} from "../../ui/Text/TextInput"
import {List} from "../../ui/List/List";
import {Checkbox} from "../../ui/Checkbox/Checkbox";
import {Radio} from "../../ui/Radio/Radio";
import {Textarea} from "../../ui/Text/Textarea";
import {AnyObject} from "../../common/common";
import "./form.css"

// const allowedChildren:((props:any)=>JSX.Element)[]=[List,Checkbox,Radio,TextInput,Textarea]

// export type UIElementProps = {
//     props: any
// }

export type FormProps = {
    //buttonValidation?: boolean
    onChange?: (inputName: string, value:any)=>void
    onFormChange? : (values: AnyObject, isValid: boolean)=>void
    debug?:boolean
    submit?:string
    children: React.ReactElement[]|React.ReactElement
}
// type FormState = {
//     formData: any
//     isValid: boolean
// }
/**
 * Component TestForm
 */
export function Form(props:FormProps): ReactElement {
    const [values,setValues]=useState<AnyObject>({})
    const [isValid,setIsValid]=useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    // const isValidChild=(child:any)=>(child.type.name===undefined) ? false : (allowedChildren.findIndex((jsxFunc:any)=>jsxFunc.name===child.type.name)!==-1)
    // const isValidChild=(child:any)=>child.props.__uiElement !== undefined

    useEffect(()=>{
        let values:AnyObject={}
        React.Children.forEach(props.children,((child:any)=>{
            
            // if (isValidChild(child)) {
            const name:string|undefined=child.props.name
            const defaultValue:any|undefined=child.props.defaultValue
            if ((name!==undefined) && (defaultValue!==undefined)) {
                values[name]=defaultValue
            }
            // }
        }))
        commit(values)
    },[])

    const commit=(values:AnyObject) => {
        let newIsValid:boolean=false
        setValues(values)
        if (formRef.current!==null) {
            newIsValid=formRef.current.checkValidity()
            setIsValid(newIsValid)
        }
        if (props.onFormChange!==undefined && props.submit===undefined) {
            props.onFormChange(values,newIsValid)
        }
    }

    // const inputMap = React.Children.map(props.children, (child:any)=>{
    //     // const index:number=(child.type.name===undefined) ? -1 : allowedChildren.findIndex((jsxFunc:any)=>jsxFunc.name===child.type.name)
    //     // // console.log('name=',child)
    //     //
    //     // if (index===-1)
    //     //     return null
    //     //
    //     return (
    //         <>
    //             <tr></tr>
    //             <tr>
    //                 {React.cloneElement(child, {
    //                     ...child.props,
    //                     __with_form: true,
    //                     debug: (props.debug) || (child.props.debug),
    //                     onChange: (value: any) => {
    //                         if (child.props.onChange !== undefined)
    //                             child.props.onChange(value)
    //                         if (props.onChange !== undefined)
    //                             props.onChange(child.props.name, value)
    //
    //                         let newValues = {...values, [child.props.name]: value}
    //                         commit(newValues)
    //                     }
    //                 })}
    //             </tr>
    //             <tr></tr>
    //         </>
    //     )
    // })

    return (
        <div>
            <form ref={formRef} onSubmit={(event:any)=>{
                event.preventDefault();
                if (props.onFormChange!==undefined) {
                    props.onFormChange(values,isValid)
                }
            }}>
                <table>
                    <tbody>
                        {React.Children.map(props.children, (child:any)=> (
                            <tr>
                                <td>{child.props.label}</td>
                                <td>
                                    {React.cloneElement(child, {
                                        ...child.props,
                                        __with_form: true,
                                        debug: (props.debug) || (child.props.debug),
                                        onChange: (value: any) => {
                                            if (child.props.onChange !== undefined)
                                                child.props.onChange(value)
                                            if (props.onChange !== undefined)
                                                props.onChange(child.props.name, value)

                                            let newValues = {...values, [child.props.name]: value}
                                            commit(newValues)
                                        }
                                    })}
                                </td>
                                <td></td>
                            </tr>
                            ))
                        }

                        {props.submit!==undefined && (
                            <tr>
                                <td></td>
                                <td>
                                    <button>{props.submit}</button>
                                </td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
        </div>
    )
}



/*
        <div>
            <form ref={formRef} onSubmit={(event:any)=>{
                event.preventDefault();
                if (props.onFormChange!==undefined) {
                    props.onFormChange(values,isValid)
                }
            }}>
                <table>
                    <tbody>
                        {inputMap}
                        {props.submit!==undefined && (
                            <tr>
                                <td></td>
                                <td>
                                    <button>{props.submit}</button>
                                </td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
        </div>

 */