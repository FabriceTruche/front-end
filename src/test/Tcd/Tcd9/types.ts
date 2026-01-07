import { CSSProperties } from 'react';

export type ColumnFormatType = 'text' | 'number' | 'currency' | 'date' | 'boolean';

export interface IColumnFormat {
    type: ColumnFormatType;
    precision?: number;
    mask?: string
}

export interface IColumn {
    name: string;
    width: number;
    format?: IColumnFormat;
    defaultStyle?: CSSProperties;
}
