import {IFormatter} from "../widgets/Table/IFormatter";
import {JSX} from "react";

export type AnyObject = {
    [property:string]: any
}
export type DbColumn = {
    db: string
    schema: string
    name: string
    table: string
    orgName: string
    orgTable: string
    type: string
}
export type Column = {
    name: string
    type: string
    sort: number
    label: string
    dataFormat?: IFormatter
    editor?: JSX.Element
}
export type ResponseQuery = {
    data: any[]
    meta: any[]
    error?: any
}
// export type DataResult = {
//     data:any[]
//     sql:string
// }
// export interface UIElementProps {
//     __uiElement: string
// }
//    filter: string
