import { IColumn } from './types';
import { CSSProperties } from 'react';
import { formatterService } from './FormatService';
import {stylerService} from "./StyleService";

export interface ICell {
    readonly value: any;
    readonly column: IColumn;
    readonly isHeader: boolean;
    readonly rect: { x: number; y: number; xSpan?: number; ySpan?: number; };
    getFormattedValue(): string;
    getStyle(): CSSProperties;
}

class _Cell implements ICell {
    constructor(
        public readonly value: any,
        public readonly column: IColumn,
        public readonly rect: { x: number; y: number; xSpan?: number; ySpan?: number; },
        public readonly isHeader: boolean = false
    ) {}

    public getFormattedValue(): string {
        if (this.isHeader) return String(this.value);
        return formatterService.formatValue(this);
    }

    public getStyle(): CSSProperties {
        return stylerService.computeCellStyle(this);
    }
}

export const createCell = (v: any, c: IColumn, r: any, h: boolean = false): ICell =>
    new _Cell(v, c, r, h);