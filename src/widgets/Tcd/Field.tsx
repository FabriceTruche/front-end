import {ITcdColumn} from "./Column";
import {IColumn} from "../Table/Column";

export interface IField<T> {
    value: any
    column: ITcdColumn
    fields: IField<T>[]
    dataRows: T[]

    isTerminal(): boolean
    addField(field: IField<T>): IField<T>
    lastNestedField(): IField<T>|undefined
    addDataRow(dataRow: T): void
    reset(): void
}
export class _Field<T> implements IField<T> {
    private readonly _value: any
    private readonly _column: ITcdColumn
    private _fields: IField<T>[]
    private _dataRows: T[]

    constructor(value: any, column: ITcdColumn) {
        this._value = value
        this._column = column
        this._fields = []
        this._dataRows = []
    }

    public get column(): ITcdColumn { return this._column }
    public get fields(): IField<T>[] { return this._fields }
    public get value(): any { return this._value }
    public get dataRows(): T[] { return this._dataRows }

    public addDataRow(dataRow: T): void {
        this._dataRows.push(dataRow)
    }

    public lastNestedField(): IField<T>|undefined {
        if (this._fields.length === 0)
            return undefined

        return this._fields[this._fields.length-1]
    }

    public addField(field: IField<T>): IField<T> {
        const n = this._fields.push(field)
        return this._fields[n-1]
    }

    public isTerminal(): boolean {
        return this._fields.length===0
    }

    public reset(): void {
        this._fields = []
        this._dataRows = []
    }

}