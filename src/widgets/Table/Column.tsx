import {IFormatter} from "./IFormatter";
import {DataFormatter} from "./DataFormatter";
import {TypeCell} from "./Table";
import {IFieldEditor} from "./IFieldEditor";

export interface IColumn {
    name: string
    type: string
    label: string
    headerDataFormatter: IFormatter
    bodyDataFormatter: IFormatter
    footerDataFormatter: IFormatter
    editor: IFieldEditor | undefined

    getFormatter(type: TypeCell): IFormatter
}

export class _Column implements IColumn {
    private readonly _name: string
    private readonly _type: string
    private readonly _label: string
    private _headerDataFormat: IFormatter
    private _bodyDataFormat: IFormatter
    private _footerDataFormat: IFormatter
    private _editor: IFieldEditor|undefined

    constructor(
        name: string,
        type: string,
        label:string="",
        bodyDataFormat:IFormatter|undefined=undefined,
        editor:IFieldEditor|undefined=undefined,
        headerDataFormat:IFormatter|undefined=undefined,
        footerDataFormat:IFormatter|undefined=undefined
    ) {
        this._name=name
        this._type=type
        this._label=label
        this._bodyDataFormat=bodyDataFormat===undefined ? DataFormatter.baseFormatter : bodyDataFormat
        this._editor=editor
        this._headerDataFormat=headerDataFormat===undefined ? DataFormatter.baseFormatter : headerDataFormat
        this._footerDataFormat=footerDataFormat===undefined ? DataFormatter.baseFormatter : footerDataFormat
    }

    public get name(): string {
        return this._name
    }

    public get type(): string {
        return this._type
    }

    public get label(): string {
        return this._label==="" ? this._name : this._label
    }

    public set bodyDataFormatter(formatter: IFormatter)  {
        this._bodyDataFormat = formatter
    }

    public set headerDataFormatter(formatter: IFormatter)  {
        this._headerDataFormat = formatter
    }

    public set footerDataFormatter(formatter: IFormatter)  {
        this._footerDataFormat = formatter
    }

    public get editor(): IFieldEditor | undefined {
        return this._editor
    }

    public set editor(editor: IFieldEditor | undefined) {
        this._editor = editor
    }

    public getFormatter(type: TypeCell): IFormatter {
        switch (type) {
            case "header":
                return this._headerDataFormat

            case "footer":
                return this._footerDataFormat

            case "data":
            default:
                return this._bodyDataFormat
        }
    }

}



// export type Column = {
//     name: string
//     type: string
//     // sort: number
//     label: string
//     // columnView: ColumnView
//     dataFormat?: IFormatter
//     editor?: JSX.Element
// }
//
// public get bodyDataFormatter(): IFormatter {
//     return this._bodyDataFormat
// }
//
// public get headerDataFormatter(): IFormatter {
//     return this._headerDataFormat
// }
//
// public get footerDataFormatter(): IFormatter {
//     return this._footerDataFormat
// }
//
