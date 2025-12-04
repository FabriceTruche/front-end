import {Property} from "csstype";
import {CSSProperties} from "react";

export type ViewportHeaderStyle = {
    position: Property.Position
    top: Property.Top
}
export type ViewportRange = {
    rowStart: number
    rowEnd: number
}
export type ViewportInfoCell = {
    id: string,
    y: number,
    ySpan: number
    x: number
    xSpan: number
    className?: string
    style?: CSSProperties
    value:any
}
export interface IViewportManager {
    // getter index
    firstVisibleRow: number
    firstScrollableVisibleRow: number
    lastVisibleRow: number

    // getter
    scrollableRowsCount: number
    visibleRowsCount: number
    rowsCount: number
    viewportHeight: number
    viewportRowHeight: number
    viewportContentHeight: number
    viewportRange: ViewportRange
    viewportTop: number
    rowsHeaderCount: number
    viewportGap: number
    colsCount: number

    // setter
    setViewportRowHeight(value: number): void
    setViewportTop(value: number): void
    setRowsCount(value: number): void
    setRowsHeaderCount(value: number): void
    setColsCount(value: number): void

    // state
    fixedRowStyle(y:number): ViewportHeaderStyle
    isVisibleRow(rowIndex: number): boolean
    isHeaderRow(rowIndex: number): boolean

    // helper
    selectVisibleCells<T extends ViewportInfoCell>(collection: T[]): T[]
    // projectExtension<T extends ViewportInfoCellBase>(collection: T[]): ViewportData<T>[]
}




// export interface IViewportConfig<T extends ViewportInfoCellBase> {
//     lenData: ()=>number
//     viewportHeight: ()=>number
//     viewportRowHeight: ()=>number
//     headerRowCount: ()=>number
//     data: ()=>T[]
// }
// export type ViewportData<T> = {
//     data: T
//     //key:string
//     // isRowLimit: boolean
//     // isHeader: boolean
//     // fixedStyle?: ViewportHeaderStyle
// }
