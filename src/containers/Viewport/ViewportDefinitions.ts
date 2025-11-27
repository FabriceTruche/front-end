import {Property} from "csstype";

export type ViewportHeaderStyle = {
    position: Property.Position
    top: Property.Top
}
export type ViewportRange = {
    rowStart: number
    rowEnd: number
}
export type ViewportData<T> = {
    data: T
    key:string
    isRowLimit: boolean
    isHeader: boolean
    fixedStyle?: ViewportHeaderStyle
}
export type ViewportInfoCellBase = {
    id: string,
    y: number,
    ySpan: number
    x: number
    xSpan: number
    className?: string
    value:any
}
export interface IViewportConfig<T extends ViewportInfoCellBase> {
    lenData: ()=>number
    viewportHeight: ()=>number
    viewportRowHeight: ()=>number
    headerRowCount: ()=>number
    data: ()=>T[]
}
export interface IViewportManager {
    // getter index
    firstVisibleRow: () => number
    firstScrollableVisibleRow: () => number
    lastVisibleRow: () => number

    // getter
    getScrollableRowsCount: () => number
    getVisibleRowsCount: () => number
    getRowsCount: () => number
    getViewportHeight: () => number
    getViewportRowHeight: () => number
    getViewportContentHeight: () => number
    getViewportRange: () => ViewportRange
    getViewportTop: () => number
    getRowsHeaderCount: () => number
    getViewportGap: ()=>number
    getColsCount: ()=>number

    // setter
    setViewportRowHeight: (value: number) => void
    setViewportTop: (value: number) => void
    setRowsCount: (value: number) => void
    setRowsHeaderCount: (value: number) => void
    setColsCount: (value: number) => void

    // state
    fixedRowStyle: (y:number)=> ViewportHeaderStyle
    isVisibleRow: (rowIndex: number)=>boolean
    isHeaderRow: (rowIndex: number)=>boolean

    // helper
    projectExtension<T extends ViewportInfoCellBase>(collection: T[]): ViewportData<T>[]
    projectCells<T extends ViewportInfoCellBase>(collection: T[]): ViewportData<T>[]
}
