
export enum TypeCell {
    none,
    headerRow,
    headerCol,
    headerMeasure,
    row,
    col,
    labelTotalRow,
    labelTotalCol,
    measure,
    totalRowMeasure,
    totalColMeasure,
    totalMeasure,

    // grandtTotal
    labelGrandTotalRow,
    labelGrandTotalCol,
    grandTotalMeasure,
    grandTotal
}
export type Rect = {
    x: number,
    y: number,
    xSpan: number,
    ySpan: number,
}
export const _defaultRect: Rect = {x: 0, y: 0, xSpan: 1, ySpan: 1};

export interface ITcdCell {
    typeCell: TypeCell
    rect: Rect
    value: string;
}
export class _Cell implements ITcdCell {
    private readonly _typeCell: TypeCell = TypeCell.none
    private readonly _rect: Rect = _defaultRect
    private readonly _value: string = ""

    constructor(typeCell: TypeCell, rect: Rect, value: string) {
        this._typeCell = typeCell
        this._rect = {...rect}
        this._value = value
    }

    public get typeCell(): TypeCell { return this._typeCell }
    public get rect(): Rect { return this._rect }

    public get value(): string {
        return this._value // + "(" + this._typeCell +")"
    }
}

export const createCell=(typeCell: TypeCell, rect: Rect, value: string): ITcdCell => {
    return new _Cell(typeCell, rect, value)
}




// public isTotal(): boolean {
//     switch (this.typeCell) {
//         case TypeCell.labelTotalRow:
//         case TypeCell.labelTotalCol:
//         case TypeCell.totalRowMeasure:
//         case TypeCell.totalColMeasure:
//         case TypeCell.totalMeasure:
//             return true;
//     }
//     return false
// }
