import { CSSProperties } from 'react';

export interface IRect {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ICell {
    value: string;
    rect: IRect;
    className?: string;
    style?: CSSProperties;
}

export interface IColumn {
    name: string;
    width: number;
    label: string;
}

export interface IScrollContext {
    firstRow: number;
    lastRow: number;
    firstCol: number;
    lastCol: number;
}

export interface IRowData {
    y: number;
    cells: ICell[];
    isHeader: boolean;
    isFooter: boolean;
}