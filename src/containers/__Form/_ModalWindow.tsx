export {}

// import * as React from 'react'
// import {JSX, ReactElement, useEffect, useRef, useState} from "react";
// import {AnyObject} from "../../common/common";
// import "./form.css"
// import {InputType, inputTypeProperties} from "../../ui/Text/TextInput";
//
// export type FormProps = {
//     //buttonValidation?: boolean
//     onChange?: (inputName: string, value:any)=>void
//     onFormChange? : (values: AnyObject, isValid: boolean)=>void
//     debug?:boolean
//     submit?:string
//     children: React.ReactElement[]|React.ReactElement
// }
// /**
//  * Component TestForm
//  */
// export function ModalWindow(props:FormProps): ReactElement {
//     const [values,setValues]=useState<AnyObject>({})
//     const [isValid,setIsValid]=useState(false)
//     const formRef = useRef<HTMLFormElement>(null)
//
//     useEffect(()=>{
//         let newValues:AnyObject={}
//
//         React.Children.forEach(props.children,((child:any)=>{
//             setDefaultChildValue(newValues, child, child.props.defaultValue)
//         }))
//         commit(newValues)
//     },[])
//
//     const setDefaultChildValue=(result:any,child:any,value:any)=>{
//         const name:string|undefined = child.props.name
//
//         if (name === undefined)
//             return
//
//         if (value === undefined) {
//             delete result[name]
//             return
//         }
//
//         result[name] = value
//     }
//
//     const setChildValue=(result:any,child:any,value:any)=>{
//         const name:string|undefined = child.props.name
//
//         if (name === undefined)
//             return
//
//         if (value === undefined) {
//             delete result[name]
//             return
//         }
//
//         const inputType: InputType = child.props.inputType || 'text'
//         // const getValueFunc = inputTypeProperties[inputType].valueFromTarget
//
//         result[name] = value
//
//         console.log(value, result)
//     }
//
//     const commit=(values:AnyObject) => {
//         let newIsValid:boolean=false
//         setValues(values)
//         if (formRef.current!==null) {
//             newIsValid=formRef.current.checkValidity()
//             setIsValid(newIsValid)
//         }
//         if (props.onFormChange!==undefined && props.submit===undefined) {
//             props.onFormChange(values,newIsValid)
//         }
//     }
//
//     return (
//         <div>
//             <form ref={formRef} onSubmit={(event:any)=>{
//                 event.preventDefault();
//                 if (props.onFormChange!==undefined) {
//                     props.onFormChange(values,isValid)
//                 }
//             }}>
//                 <table>
//                     <tbody>
//                         {React.Children.map(props.children, (child:any)=> (
//                             <tr>
//                                 <td>{child.props.label || child.props.name}</td>
//                                 <td>
//                                     {React.cloneElement(child, {
//                                         ...child.props,
//                                         onChange: (value: any) => {
//                                             if (child.props.onChange !== undefined)
//                                                 child.props.onChange(value)
//                                             if (props.onChange !== undefined)
//                                                 props.onChange(child.props.name, value)
//
//                                             const newValues = {...values}
//                                             setChildValue(newValues,child, value)
//                                             commit(newValues)
//                                         },
//                                         onReset: (nv: any) =>{
//                                             if (nv==="") {
//                                                 const {[child.props.name]: string, ...rest} = values
//                                                 setValues(rest)
//                                             } else {
//                                                 let newValues = {...values, [child.props.name]: nv}
//                                                 setValues(newValues)
//                                             }
//                                         }
//                                     })}
//                                 </td>
//                                 <td></td>
//                             </tr>
//                             ))
//                         }
//
//                         {/*{props.submit!==undefined && (*/}
//                         {/*    <tr>*/}
//                         {/*        <td></td>*/}
//                         {/*        <td>*/}
//                         {/*            <button>{props.submit}</button>*/}
//                         {/*        </td>*/}
//                         {/*        <td></td>*/}
//                         {/*    </tr>*/}
//                         {/*)}*/}
//                     </tbody>
//                 </table>
//             </form>
//             <button
//                 onClick={(event:any)=>{
//
//                     if (formRef.current!==null) {
//                         if (!isValid) {
//                             formRef.current.reportValidity()
//                             return
//                         }
//                     }
//
//                     if (props.onFormChange!==undefined)
//                         props.onFormChange(values,isValid)
//                 }}
//             >{props.submit || "Validate"}
//             </button>
//         </div>
//     )
// }
//
