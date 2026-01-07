import {ITcdColumn} from "./TcdColumn";

export interface IField<T> {
    value: any
    column: ITcdColumn
    deep: number
    fields: IField<T>[]
    dataRows: T[]
    isRoot: boolean

    isTerminal(): boolean
    addField(field: IField<T>): IField<T>
    lastNestedField(): IField<T>|undefined
    addDataRow(dataRow: T): void
    reset(): void
    // displayValue(): string
}
export class _Field<T> implements IField<T> {
    private readonly _value: any
    private readonly _column: ITcdColumn
    private _fields: IField<T>[]
    private _dataRows: T[]
    private _deep: number
    private _isRoot: boolean

    constructor(value: any, column: ITcdColumn, isRoot: boolean=false) {
        this._value = value
        this._column = column
        this._fields = []
        this._dataRows = []
        this._deep = 0
        this._isRoot = isRoot
    }

    public get column(): ITcdColumn { return this._column }
    public get fields(): IField<T>[] { return this._fields }
    public get value(): any { return this._value }
    public get dataRows(): T[] { return this._dataRows }
    public get deep(): number { return this._deep }
    public set deep(d: number) { this._deep = d }
    public get isRoot(): boolean { return this._isRoot }

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

    // public displayValue(): string {
    //     return this._column.dataFormatter.format(this._value).value
    // }
}

export function createField<T>(value: any, column: ITcdColumn, isRoot: boolean=false): IField<T> {
    return new _Field(value, column, isRoot)
}

