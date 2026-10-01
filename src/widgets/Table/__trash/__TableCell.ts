export {}

// import {CSSProperties} from "react";
// import {Rect} from "../common/Rect";
// import {IColumn} from "../common/Column";
// import {formatterService} from "../common/FormatService";
//
// export enum TableTypeCell {
//     none,
//     header,
//     body,
//     footer,
//     total
// }
//
// export interface ITableCell {
//     readonly value: any;
//     readonly column: IColumn;
//     readonly isLabel: boolean;
//     readonly typeCell: TableTypeCell
//     readonly rect: Rect // { x: number; y: number; xSpan?: number; ySpan?: number; };
//
//     getFormattedValue(): string;
//     getStyle(): CSSProperties;
// }
//
// class _TableCell implements ITableCell {
//     constructor(
//         public readonly value: any,
//         public readonly column: IColumn,
//         public readonly rect: Rect, // { x: number; y: number; xSpan?: number; ySpan?: number; },
//         public readonly isLabel: boolean,
//         public readonly typeCell: TableTypeCell,
//     ) {}
//
//     public getFormattedValue(): string {
//         if (this.isLabel) return String(this.value);
//         return formatterService.formatValue(this);
//     }
//
//     public getStyle(): CSSProperties {
//         return stylerService.computeCellStyle(this);
//     }
// }
//
// export const createTableCell = (tc: TableTypeCell, rect: Rect, value: any, column: IColumn, isLabel: boolean): ITableCell =>
//     new _TableCell(value, column, rect, isLabel, tc);