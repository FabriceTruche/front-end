import {Form} from "../../containers/Form/Form";
import React, {FC, JSX} from "react";
import {Checkbox} from "../../ui/Checkbox/Checkbox";
import {List} from "../../ui/List/List";
import {TextInput} from "../../ui/Text/TextInput";
import {IColumn} from "../Table/Column";
import {helper} from "../../common/Helper";


// export type ComponentObject = { [prop:string] : React.ElementType }
export type AnyObject = { [prop:string] : any }

export type EditorProps = {
    object: any
    columns: IColumn[]
    onChange?: (obj: object, isValid: boolean)=>void
}
export const Editor=(props: EditorProps) => {

    const allEditors: { [propName: string]: FC<any> } = {}
    const allProps: any = {}

    const fieldProps = (column: IColumn, value: any) => {
        const defaultProps = (column.editor && column.editor.properties) ? column.editor.properties : {}
        const typeOf = typeof value
        let newProps: any = {}

        if (value instanceof Date)
            newProps = {
                type: "date",
                defaultValue: helper.toStandardDate(value)
            }
        else if (column.editor && column.editor.isEnum()) {
            const enumType = column.editor.enum()
            const items: unknown[] = Object.values(enumType).filter((itemValue: unknown) => {
                return (typeof itemValue === "string")
            }).map((v: any, index: number) => ({value: v, label: v}))

            newProps = {
                items: items,
                defaultValue: enumType[value]
            }
        } else if (typeOf === "number")
            newProps = {
                type: "number",
                defaultValue: value,
            }
        else if (typeOf === "string" || typeOf === "boolean")
            newProps = {
                type: "text",
                defaultValue: value
            }
        else
            newProps = {
                type: "text",
                defaultValue: value
            }

        return {
            ...newProps,
            ...defaultProps
        }
    }

    props.columns.forEach((c: IColumn) => {
        const fieldName = c.name
        const filedValue = props.object[fieldName]

        if (c.editor && c.editor.jsx !== undefined)
            allEditors[fieldName] = c.editor.jsx
        else {
            if (typeof filedValue === "boolean") {
                allEditors[fieldName] = Checkbox
            } else if (c.editor && c.editor.isEnum()) {
                // on considére qu'il s'agit d'un enum
                allEditors[fieldName] = List
            } else
                allEditors[fieldName] = TextInput
        }

        allProps[fieldName] = {
            id: fieldName,
            name: fieldName,
            label: c.label,
            ...fieldProps(c, props.object[fieldName])
        }
    })

    return (
        <Form
            onFormChange={(values: AnyObject, isValid: boolean) => {
                if (props.onChange)
                    props.onChange(values, isValid)
            }}
        >
            {Object.keys(props.object).map((field: string) => {
                const Control: React.ElementType = allEditors[field]
                const pr = allProps[field]

                return (
                    <Control key={field} {...pr}></Control>
                )
            })}
        </Form>
    )
}







// export type EditConf = {
//     editors?: any
//     props?: any
// }
// export interface IEditor {
//     getEditors(): ComponentObject
//     getProps(): any
// }
// const defProps = (k: string): any | undefined => (props.columns[k]. !== undefined) ? this.props.properties[k] : undefined
// const defaultValue = (value: any) => {
//     if (value instanceof Date)
//         return DateHelper.toStandardDate(value)
//
//     return value
// }
