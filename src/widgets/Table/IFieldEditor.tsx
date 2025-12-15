import {FC} from "react";

export interface IFieldEditor {
    jsx: FC<any>|undefined
    properties: any

    isEnum(): boolean
    enum(): any
}
export class _FieldEditor implements IFieldEditor {
    private readonly _jsx: FC<any> | undefined
    private readonly _properties: any | undefined

    constructor(jsx: FC<any> | undefined = undefined, properties: any | undefined = undefined) {
        this._jsx = jsx
        this._properties = properties
    }

    public get jsx(): FC<any> | undefined {
        return this._jsx
    }

    public get properties(): any | undefined {
        return this._properties
    }

    public isEnum(): boolean {
        return (this._properties!==undefined && this._properties.enum!==undefined)
    }

    public enum(): any {
        if (this._properties!==undefined && this._properties.enum!==undefined)
            return this._properties.enum

        return undefined
    }
}
