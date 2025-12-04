export {}


// import {Property} from "csstype";
// import {ViewportRange} from "../Viewport/ViewportDefinitions";
// import {AnyObject} from "../../common/common";
// import {CSSProperties} from "react";
//
// export type Viewport2Cell = {
//
//     // ---- data info
//     object: AnyObject
//     value: any
//     row: number
//     property: string
//
//     // ---- cell info
//     id: string,
//     y: number,
//     ySpan: number
//     x: number
//     xSpan: number
//     className: string
//     style: CSSProperties
// }
// export interface IViewportManager2 {
//     // getter index
//     firstVisibleRow: () => number
//     firstScrollableVisibleRow: () => number
//     lastVisibleRow: () => number
//
//     // getter
//     getScrollableRowsCount: () => number
//     getVisibleRowsCount: () => number
//     getRowsCount: () => number
//     getViewportHeight: () => number
//     getViewportRowHeight: () => number
//     getViewportContentHeight: () => number
//     getViewportRange: () => ViewportRange
//     getViewportTop: () => number
//     getRowsHeaderCount: () => number
//     getViewportGap: ()=>number
//     getColsCount: ()=>number
//
//     // setter
//     setViewportRowHeight: (value: number) => void
//     setViewportTop: (value: number) => void
//     setRowsCount: (value: number) => void
//     setRowsHeaderCount: (value: number) => void
//     setColsCount: (value: number) => void
//
//     // state
//     //fixedRowStyle: (y:number)=> ViewportHeaderStyle
//     isVisibleRow: (rowIndex: number)=>boolean
//     isHeaderRow: (rowIndex: number)=>boolean
//
//     // helper
//     projectExtension(collection: any[]): Viewport2Cell[]
//     projectCells(collection: any[]): Viewport2Cell[]
// }
//
//
//
//
//
//
// // export type ViewportHeaderStyle = {
// //     position: Property.Position
// //     top: Property.Top
// // }
// // export type ViewportRange = {
// //     rowStart: number
// //     rowEnd: number
// // }
// // export type ViewportData<T> = {
// //     data: T
// //     key:string
// //     isRowLimit: boolean
// //     isHeader: boolean
// //     fixedStyle?: ViewportHeaderStyle
// // }
// // export type ViewportInfoCellBase = {
// //     id: string,
// //     y: number,
// //     ySpan: number
// //     x: number
// //     xSpan: number
// //     className?: string
// //     value:any
// // }
// // export type Viewport2ColDef = {
// //      name: string
// //      type: string
// //      label: string
// //      dataFormat?: IFormatter
// // }
// // export type Viewport2Collection = {
// //      data: AnyObject[]
// //      columns: ColDef[]
// // }
// // export type Viewport2Data<T> = {
// // }
// //  export type Viewport2Info<T> = {
// //      value: any
// //      data : Viewport2Data<T>
// //      cell: Viewport2Cell
// //  }
