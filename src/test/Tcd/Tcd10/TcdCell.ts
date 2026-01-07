import { ITcdColumn } from './TcdColumn';
import { CSSProperties } from 'react';
import { formatterService } from './FormatService';
import {stylerService} from "./StyleService";

export interface ITcdCell {
    readonly value: any;
    readonly column: ITcdColumn;
    readonly isHeader: boolean;
    readonly rect: { x: number; y: number; xSpan?: number; ySpan?: number; };
    getFormattedValue(): string;
    getStyle(): CSSProperties;
}

class _TcdCell implements ITcdCell {
    constructor(
        public readonly value: any,
        public readonly column: ITcdColumn,
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

export const createCell = (v: any, c: ITcdColumn, r: any, h: boolean = false): ITcdCell =>
    new _TcdCell(v, c, r, h);