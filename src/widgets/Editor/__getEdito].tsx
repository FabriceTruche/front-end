export {}


// import {JSX, ReactNode} from "react";
// import {TextInput} from "../../ui/Text/TextInput";
// import {DateHelper} from "../../helper/DateHelper";
// import {Checkbox} from "../../ui/Checkbox/Checkbox";
// import {List} from "../../ui/List/List";
//
// export type ComponentObject = { [prop:string] : JSX.Element }
// export type AnyObject = { [prop:string] : any }
//
// export const getEditors = (object: AnyObject, props?: any, editors?: ComponentObject): ComponentObject  => {
//
//     const editor = (k:string): JSX.Element|undefined => (editors!==undefined) ? editors[k] : undefined
//     const allEditors: any = {}
//
//     Object.keys(object).forEach((k:string)=>{
//         const ed: JSX.Element | undefined = editor(k)
//         const v = object[k]
//
//         if (ed!==undefined)
//             allEditors[k] = ed
//         else {
//             if (typeof v === "boolean") {
//                 allEditors[k] = Checkbox
//             } else if ((props!==undefined && props[k] !== undefined && props[k].enum !== undefined)) {
//                 // on considére qu'il s'agit d'un enum
//                 allEditors[k] = List
//             }
//             else
//                 allEditors[k] = TextInput
//         }
//     })
//
//     return allEditors
// }
// export const getProps = (object: AnyObject, props?: any): any  => {
//
//     const defProps = (k:string): any|undefined => (props!==undefined) ? props[k] : undefined
//     // const defaultValue = (value: any) => {
//     //     if (value instanceof Date)
//     //         return DateHelper.toStandardDate(value)
//     //
//     //     return value
//     // }
//     const fieldProps = (k: string, value: any) => {
//         const defaultProps = defProps(k)
//         const typeOf = typeof value
//         let newProps:any = {}
//
//         if (value instanceof Date)
//             newProps = {
//                 type: "date",
//                 defaultValue: DateHelper.toStandardDate(value)
//             }
//         else if (props!==undefined && props[k] !== undefined && props[k].enum !== undefined) {
//             const enumType = props[k].enum
//             const items: unknown[] = Object.values(enumType).filter((itemValue: unknown) => {
//                 return (typeof itemValue === "string")
//             }).map((v: any, index: number) => ({value: v, label: v}))
//
//             newProps = {
//                 items: items,
//                 defaultValue: props[k].enum[value]
//             }
//         }
//         else if (typeOf==="number")
//             newProps = {
//                 type: "number",
//                 defaultValue: value,
//             }
//         else if (typeOf==="string" || typeOf==="boolean")
//             newProps = {
//                 type: "text",
//                 defaultValue: value
//             }
//         else
//             newProps = {
//                 type: "text",
//                 defaultValue: value
//             }
//
//         return {
//             ...newProps,
//             ...defaultProps
//         }
//     }
//     const allProps: any = {}
//
//     Object.keys(object).forEach((k:string)=>{
//         const v = object[k]
//         const pr = {
//             id: k,
//             name: k,
//             label: k,
//             ...fieldProps(k,v)
//         }
//
//         allProps[k] = pr
//     })
//
//     return allProps
// }
