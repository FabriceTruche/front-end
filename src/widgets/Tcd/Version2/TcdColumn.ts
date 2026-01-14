import { CSSProperties } from 'react';
import {TcdColumnOption} from "./view/TcdConfig";

export const ColumnFormatArray = ['text','number','currency','date','boolean'] as const
export type ColumnFormat = typeof ColumnFormatArray[number]

export interface ITcdColumnFormat {
    type: ColumnFormat;
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
        options: TcdColumnOption,
        // format?: ITcdColumnFormat,
        // defaultStyle?: CSSProperties,
        // label?: string,
        // total?: boolean,
    ) {
        this.name = name;
        this.label = options.label || name // ===undefined || label===null || label==="") ? name : label;
        this.width = width;
        this.format = {type: options.typeFormat as ColumnFormat, mask: options.mask, precision: options.precision};
        this.defaultStyle = {};
        this.total = (options.hasTotal!==undefined) && options.hasTotal
    }
}

/**
 * Factory pour créer des instances de TcdColumn de manière fluide
 */
export const createTcdColumn = (
    name: string,
    width: number = 100,
    // type: ColumnFormatType = 'text',
    options: TcdColumnOption = {}
): TcdColumn => {

// {
//     precision?: number;
//     mask?: string;
//     style?: CSSProperties,
//     label? : string,
//     total?: boolean,
// } = {}

    // const format: ITcdColumnFormat = {
    //     // type: type,
    //     precision: options.precision,
    //     mask: options.mask
    // };

    return new TcdColumn(name, width, options) //.style, options.label, options.total);
};
