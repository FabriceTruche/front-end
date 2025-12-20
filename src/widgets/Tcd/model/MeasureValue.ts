import {IField} from "./Field";
import {IMeasure} from "./Measure";
import {KeyOf} from "./TcdManager";

export interface IMeasureValue<T> {
    measure: IMeasure
    dataRows: T[]
    value: any
    rowField: IField<T>
    colField: IField<T>

    displayValue(): string
    isRowTotal(): boolean
    isColTotal(): boolean
    isTotal(): boolean
}

export class _MeasureValue<T> implements IMeasureValue<T>{

    private readonly _measure: IMeasure
    private readonly _dataRows: T[]
    private readonly _value: any
    private readonly _rowField: IField<T>
    private readonly _colField: IField<T>

    constructor(rowField: IField<T>, colField: IField<T>, dataRows: T[], measure: IMeasure) {
        const values: any[] = dataRows.map(row => row[measure.column.name as KeyOf<T>])
        const aggragateValue = measure.funcGroup(values)

        this._dataRows = dataRows
        this._measure = measure
        this._value = aggragateValue
        this._rowField = rowField
        this._colField = colField
    }

    public get dataRows(): T[] { return this._dataRows }
    public get measure(): any { return this._measure }
    public get value(): any { return this._value }
    public get rowField(): IField<T> { return this._rowField }
    public get colField(): IField<T> { return this._colField }

    public displayValue(): string {
        return this._measure.column.dataFormatter.format(this._value).value
    }

    public isRowTotal(): boolean {
        return this._rowField.column.total
    }

    public isColTotal(): boolean {
        return this._colField.column.total
    }

    public isTotal(): boolean {
        return this.isRowTotal() && this.isColTotal()
        // if (!this._rowField.isTerminal())
        //     return true
        //
        // return !this._colField.isTerminal();
    }
}
