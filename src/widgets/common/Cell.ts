import { IColumn } from './Column';
import { CSSProperties } from 'react';
import { formatterService } from './FormatService';
import {stylerService} from "./StyleService";
import {Rect} from "./Rect";

export enum TypeCell {
    // tcd & table
    none,

    // tcd
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

    // tcd => grandtTotal
    labelGrandTotalRow,
    labelGrandTotalCol,
    grandTotalMeasure,
    grandTotal,

    // table
    header,
    body,
    footer,
    total,
}
export interface ICell {
    readonly value: any;
    readonly column: IColumn;
    readonly isLabel: boolean;
    readonly typeCell: TypeCell
    readonly rect: Rect // { x: number; y: number; xSpan?: number; ySpan?: number; };

    getFormattedValue(): string;
    getStyle(): CSSProperties;
}

class _Cell implements ICell {
    constructor(
        public readonly value: any,
        public readonly column: IColumn,
        public readonly rect: Rect, // { x: number; y: number; xSpan?: number; ySpan?: number; },
        public readonly isLabel: boolean,
        public readonly typeCell: TypeCell,
    ) {}

    public getFormattedValue(): string {
        if (this.isLabel) return String(this.value);
        return formatterService.formatValue(this);
    }

    public getStyle(): CSSProperties {
        return stylerService.computeCellStyle(this);
    }
}

export const createCell = (tc: TypeCell, rect: Rect, value: any, column: IColumn, isLabel: boolean): ICell =>
    new _Cell(value, column, rect, isLabel, tc);