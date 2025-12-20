import {CSSProperties} from "react";

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
    width: number,
    height: number,
}
export const _defaultRect: Rect = {x: 0, y: 0, width: 1, height: 1};

export interface ICell {
    typeCell: TypeCell
    rect: Rect
    value: string;
    isTotal: boolean;
    className: string;
    style: CSSProperties
}
export class _Cell implements ICell {
    private _typeCell: TypeCell = TypeCell.none
    private _rect: Rect = _defaultRect
    private _value: string = ""
    private _className: string = ""
    private _style: CSSProperties = {}

    constructor(typeCell: TypeCell, rect: Rect, value: string) {
        this._typeCell = typeCell
        this._rect = {...rect}
        this._value = value
    }

    public get typeCell(): TypeCell { return this._typeCell }
    public get rect(): Rect { return this._rect }
    public get className(): string { return this._className }
    public get style(): CSSProperties  { return this._style }

    public get value(): string {
        return this._value + "(" + this._typeCell +")"
    }

    public get isTotal(): boolean {
        switch (this.typeCell) {
            case TypeCell.labelTotalRow:
            case TypeCell.labelTotalCol:
            case TypeCell.totalRowMeasure:
            case TypeCell.totalColMeasure:
            case TypeCell.totalMeasure:
                return true;
        }
        return false
    }
}
