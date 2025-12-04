import {CSSProperties} from "react";

export type DisplayedCellData = {
    style?: CSSProperties
    className?: string
    value: string
}
export interface IFormatter {
    format(v: any): DisplayedCellData
    formatNumber(v: number): DisplayedCellData
    formatString(v: string): DisplayedCellData
    formatDate(v: Date): DisplayedCellData
    formatBoolean(v: boolean): DisplayedCellData
    formatObject(v: object): DisplayedCellData
}

