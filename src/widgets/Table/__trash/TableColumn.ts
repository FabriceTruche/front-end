import {CSSProperties} from "react";
// import {TableColumnOption} from "./TableConfig";

// export const TableColumnFormatArray = ['text','number','currency','date','boolean'] as const
// export type TableColumnFormat = typeof TableColumnFormatArray[number]
//
// export interface ITableColumnFormat {
//     type: TableColumnFormat;
//     precision?: number;
//     mask?: string;
// }
//
// export interface ITableColumn {
//     name: string;
//     label: string;
//     width: number;
//     total: boolean;
//     format?: ITableColumnFormat;
//     defaultStyle?: CSSProperties;
// }
//
// class _TableColumn implements ITableColumn {
//     public readonly name: string;
//     public readonly label: string;
//     public readonly width: number;
//     public readonly total: boolean;
//     public readonly format?: ITableColumnFormat;
//     public readonly defaultStyle?: CSSProperties;
//
//     constructor(
//         name: string,
//         width: number,
//         options: TableColumnOption,
//     ) {
//         this.name = name;
//         this.label = options.label || name // ===undefined || label===null || label==="") ? name : label;
//         this.width = width;
//         this.format = {type: options.typeFormat as TableColumnFormat, mask: options.mask, precision: options.precision};
//         this.defaultStyle = {};
//         this.total = (options.hasTotal!==undefined) && options.hasTotal
//     }
// }
//
// /**
//  * Factory pour créer des instances de ITableColumn
//  */
// export const createTableColumn = (
//     name: string,
//     width: number = 100,
//     options: TableColumnOption = {}
// ): ITableColumn => {
//     return new _TableColumn(name, width, options)
// };
