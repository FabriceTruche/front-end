import {IColumn} from "../common/Column";
import {FuncObject} from "./functionsGroup";

export interface IMeasure {
    column: IColumn
    funcGroup: FuncObject
    index: number;

    // displayValue(): string
}
export class _Measure implements IMeasure {
    private readonly _column: IColumn
    private _index: number
    private readonly _funcGroup: FuncObject

    public get column(): IColumn { return this._column }
    public get funcGroup(): FuncObject { return this._funcGroup }
    public get index(): number { return this._index }
    public set index(index: number) { this._index = index }

    constructor(column: IColumn, funcGroup: FuncObject) {
        this._column = column
        this._funcGroup = funcGroup
        this._index = 0
    }

    // public displayValue(): string {
    //     return this.column.name
    // }
}

export function createMeasure(column: IColumn, funcGroup: FuncObject): IMeasure {
    return new _Measure(column, funcGroup)
}
