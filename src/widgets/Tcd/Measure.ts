import {ITcdColumn} from "./Column";
import {FuncType} from "./functionsGroup";

export interface IMeasure {
    column: ITcdColumn
    funcGroup: FuncType
}

export class _Measure implements IMeasure {
    private readonly _column: ITcdColumn
    private readonly _funcGroup: FuncType

    public get column(): ITcdColumn { return this._column }
    public get funcGroup(): FuncType { return this._funcGroup }

    constructor(column: ITcdColumn, funcGroup: FuncType) {
        this._column = column
        this._funcGroup = funcGroup
    }
}