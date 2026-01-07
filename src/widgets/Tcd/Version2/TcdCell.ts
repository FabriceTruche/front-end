import { ITcdColumn } from './TcdColumn';
import { CSSProperties } from 'react';
import { formatterService } from './FormatService';
import {stylerService} from "./StyleService";

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
    readonly value: any;
    readonly column: ITcdColumn;
    readonly isLabel: boolean;
    readonly typeCell: TypeCell
    readonly rect: Rect // { x: number; y: number; xSpan?: number; ySpan?: number; };

    getFormattedValue(): string;
    getStyle(): CSSProperties;
}

class _TcdCell implements ITcdCell {
    constructor(
        public readonly value: any,
        public readonly column: ITcdColumn,
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

export const createCell = (tc: TypeCell, rect: Rect, value: any, column: ITcdColumn, isLabel: boolean): ITcdCell =>
    new _TcdCell(value, column, rect, isLabel, tc);