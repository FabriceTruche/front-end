import { CSSProperties } from 'react';

export type ColumnFormatType = 'text' | 'number' | 'currency' | 'date' | 'boolean';

export interface ITcdColumnFormat {
    type: ColumnFormatType;
    precision?: number;
    mask?: string;
}

export interface ITcdColumn {
    name: string;
    label: string;
    width: number;
    total: boolean;
    format?: ITcdColumnFormat;
    defaultStyle?: CSSProperties;
}

export class TcdColumn implements ITcdColumn {
    public readonly name: string;
    public readonly label: string;
    public readonly width: number;
    public readonly total: boolean;
    public readonly format?: ITcdColumnFormat;
    public readonly defaultStyle?: CSSProperties;

    constructor(
        name: string,
        width: number,
        format?: ITcdColumnFormat,
        defaultStyle?: CSSProperties,
        label?: string,
        total?: boolean,
    ) {
        this.name = name;
        this.label = (label===undefined || label===null || label==="") ? name : label;
        this.width = width;
        this.format = format;
        this.defaultStyle = defaultStyle || {};
        this.total = (total!==undefined) && total
    }
}

/**
 * Factory pour créer des instances de TcdColumn de manière fluide
 */
export const createTcdColumn = (
    name: string,
    width: number = 100,
    type: ColumnFormatType = 'text',
    options: {
        precision?: number;
        mask?: string;
        style?: CSSProperties,
        label? : string,
        total?: boolean,
    } = {}
): TcdColumn => {

    const format: ITcdColumnFormat = {
        type: type,
        precision: options.precision,
        mask: options.mask
    };

    return new TcdColumn(name, width, format, options.style, options.label, options.total);
};
