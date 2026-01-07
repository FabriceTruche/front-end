import {FuncType} from "./functionsGroup";
import {ITcdColumn} from "./TcdColumn";

export interface IMeasure {
    column: ITcdColumn
    funcGroup: FuncType
    index: number;

    // displayValue(): string
}
export class _Measure implements IMeasure {
    private readonly _column: ITcdColumn
    private _index: number
    private readonly _funcGroup: FuncType

    public get column(): ITcdColumn { return this._column }
    public get funcGroup(): FuncType { return this._funcGroup }
    public get index(): number { return this._index }
    public set index(index: number) { this._index = index }

    constructor(column: ITcdColumn, funcGroup: FuncType) {
        this._column = column
        this._funcGroup = funcGroup
        this._index = 0
    }

    // public displayValue(): string {
    //     return this.column.name
    // }
}

export function createMeasure(column: ITcdColumn, funcGroup: FuncType): IMeasure {
    return new _Measure(column, funcGroup)
}
