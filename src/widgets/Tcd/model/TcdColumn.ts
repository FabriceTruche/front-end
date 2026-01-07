import {IFormatter} from "../../Table/IFormatter";
import {DataFormatter} from "../../Table/DataFormatter";

export interface ITcdColumn {
    name: string
    type: string
    label: string
    total: boolean
    dataFormatter: IFormatter
}

export class _Tcd implements ITcdColumn {
    private readonly _name: string
    private readonly _type: string
    private readonly _label: string
    private _total: boolean
    private _dataFormatter: IFormatter

    constructor(
        name: string,
        type: string,
        total: boolean = false,
        label: string = "",
        dataFormat: IFormatter | undefined = undefined,
    ) {
        this._name = name
        this._type = type
        this._label = label
        this._total = total
        this._dataFormatter = dataFormat === undefined ? DataFormatter.baseFormatter : dataFormat
    }

    public get name(): string {
        return this._name
    }

    public get type(): string {
        return this._type
    }

    public get label(): string {
        return this._label === "" ? this._name : this._label
    }

    public get total(): boolean {
        return this._total
    }

    public set total(total: boolean) {
        this._total = total
    }

    public get dataFormatter(): IFormatter {
        return this._dataFormatter;
    }

    public set dataFormatter(formatter: IFormatter) {
        this._dataFormatter = formatter;
    }
}
export function createTcdColumn(name: string, type: string, total: boolean=false, label:string="", formatter=undefined) {
    return new _Tcd(name,type,total,label, formatter)
}
