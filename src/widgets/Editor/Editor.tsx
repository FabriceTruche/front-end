import {Form} from "../../containers/Form/Form";
import React, {JSX} from "react";
import {Checkbox} from "../../ui/Checkbox/Checkbox";
import {List} from "../../ui/List/List";
import {TextInput} from "../../ui/Text/TextInput";
import {DateHelper} from "../../helper/DateHelper";

export type ComponentObject = { [prop:string] : React.ElementType }
export type AnyObject = { [prop:string] : any }

export interface IEditor {
    getEditors(): ComponentObject
    getProps(): any
}
export type EditorProps = {
    object: any
    editors?: any
    props?: any
}
export class Editor extends React.Component<EditorProps> implements IEditor {

    constructor(props: EditorProps) {
        super(props)
    }

    /**
     *
     */
    public render(): JSX.Element {
        const allEditors: ComponentObject = this.getEditors(/*this.props.object, this.props.props, this.props.editors*/)
        const allProps = this.getProps(/*this.props.object, this.props.props*/)

        return (
            <Form
                onFormChange={(values: AnyObject, isValid: boolean) => {
                    console.log(">>", JSON.stringify(values, null, 3))
                }}
            >
                {Object.keys(this.props.object).map((field: string) => {
                    const Control: React.ElementType = allEditors[field]
                    const pr = allProps[field]

                    return (
                        <Control {...pr}></Control>
                    )
                })}
            </Form>
        )
    }

    /**
     *
     */
    public getEditors(): ComponentObject {

        const editor = (k: string): JSX.Element | undefined => (this.props.editors !== undefined) ? this.props.editors[k] : undefined
        const allEditors: any = {}

        Object.keys(this.props.object).forEach((k: string) => {
            const ed: JSX.Element | undefined = editor(k)
            const v = this.props.object[k]

            if (ed !== undefined)
                allEditors[k] = ed
            else {
                if (typeof v === "boolean") {
                    allEditors[k] = Checkbox
                } else if ((this.props.props !== undefined && this.props.props[k] !== undefined && this.props.props[k].enum !== undefined)) {
                    // on considére qu'il s'agit d'un enum
                    allEditors[k] = List
                } else
                    allEditors[k] = TextInput
            }
        })

        return allEditors
    }

    /**
     *
     */
    public getProps(): any {

        const defProps = (k: string): any | undefined => (this.props.props !== undefined) ? this.props.props[k] : undefined
        // const defaultValue = (value: any) => {
        //     if (value instanceof Date)
        //         return DateHelper.toStandardDate(value)
        //
        //     return value
        // }
        const fieldProps = (k: string, value: any) => {
            const defaultProps = defProps(k)
            const typeOf = typeof value
            let newProps: any = {}

            if (value instanceof Date)
                newProps = {
                    type: "date",
                    defaultValue: DateHelper.toStandardDate(value)
                }
            else if (this.props.props !== undefined && this.props.props[k] !== undefined && this.props.props[k].enum !== undefined) {
                const enumType = this.props.props[k].enum
                const items: unknown[] = Object.values(enumType).filter((itemValue: unknown) => {
                    return (typeof itemValue === "string")
                }).map((v: any, index: number) => ({value: v, label: v}))

                newProps = {
                    items: items,
                    defaultValue: this.props.props[k].enum[value]
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
        const allProps: any = {}

        Object.keys(this.props.object).forEach((k: string) => {
            const v = this.props.object[k]
            allProps[k] = {
                id: k,
                name: k,
                label: k,
                ...fieldProps(k, v)
            }
        })

        return allProps
    }
}



