export {}

//  import React, {
//     CSSProperties, Fragment,
//     ReactElement,
//     useEffect,
//     useRef,
//     useState
// } from "react";
// import {AnyObject, Column} from "../../common/common";
// import {IFormatter} from "../../widgets/Table/IFormatter";
//  import {IViewportManager, ViewportRange} from "../Viewport/ViewportDefinitions";
//  import {defaultViewportRange, ViewportManager} from "../Viewport/ViewportManager";
//
//
// export type Viewport2Props = {
//     collection: T[]
//     viewportHeight: number
//     viewportRowHeight: number
//     viewportGap?: number
//
//     onDisplayCell: (cell: Viewport2Cell) => ReactElement
//
//     // rowCount: number
//     // rowHeaderCount: number
//     // headerPanelStyle?: CSSProperties
//     // onChange?: (viewportInfo:IViewportManager,viewportRange: ViewportRange)=>void
//     // className?: string
//     // extension?: boolean
//     // columnsWidth?:AnyObject
// }
// export const Viewport2 = (props:Viewport2Props) => {
//     const [viewData, setViewData] = useState<Viewport2Cell[]>([])
//     // const [viewDataExtension, setViewDataExtension] = useState<ViewportData<T>[]>([])
//     const [viewportInfo, setViewportInfo] = useState<IViewportManager>()
//     const [range, setRange] = useState<ViewportRange>(defaultViewportRange)
//     const viewPortRef = useRef<any>(null)
//     const defaultHeaderPanelStyle = {background: "white"}
//
//     useEffect(() => {
//         // console.log('use effect')
//         const vpi: IViewportManager = new ViewportManager(props.viewportHeight, props.viewportRowHeight, props.rowCount, props.rowHeaderCount, props.viewportGap)
//         setViewportInfo(vpi)
//         refresh(vpi)
//     }, [props.collection])
//
//     const defineColsCount = (vpi: IViewportManager) => {
//         // compute colsCount
//         const colsCount:ViewportInfoCellBase = {
//             xSpan:0,
//             value:"",
//             y:0,
//             ySpan:0,
//             x:0,
//             id:""
//         };
//         const maxColsCount:ViewportInfoCellBase = props.collection.reduce(
//             (accumulator, currentValue) => (accumulator.x<currentValue.x)?currentValue:accumulator,
//             colsCount,
//         );
//         vpi.setColsCount(maxColsCount.x)
//     }
//
//     const refresh = (vpi: IViewportManager) => {
//         const data: ViewportData<T>[] =vpi.projectCells(props.collection)
//         // console.log(3,data.length)
//         defineColsCount(vpi)
//         const vpr: ViewportRange = vpi.getViewportRange()
//         setRange(vpr)
//         setViewData(data)
//         if (!!props.extension) {
//             setViewDataExtension(vpi.projectExtension(props.collection))
//             // console.log(viewDataExtension.length)
//         }
//         if (props.onChange)
//             props.onChange(vpi, vpr)
//     }
//
//     // console.log('avant render',props.collection,viewportInfo)
//
//     if (viewportInfo === undefined)
//         return null
//
//     const gridTemplateColumns:string|undefined = (props.columnsWidth===undefined) ? undefined : Object.values(props.columnsWidth).join(" ")
//
//     return (
//         <div
//             style={{
//                 width: "fit-content",
//                 minHeight: "auto",
//                 maxHeight: viewportInfo.getViewportHeight() + "px",
//                 overflowY: "auto",
//             }}
//             ref={viewPortRef}
//             onScroll={() => {
//                 if (viewportInfo !== undefined) {
//                     viewportInfo.setViewportTop(viewPortRef.current.scrollTop)
//                     if (viewportInfo.firstScrollableVisibleRow() !== range.rowStart || viewportInfo.lastVisibleRow() !== range.rowEnd) {
//                         refresh(viewportInfo)
//                     }
//                 }
//             }}
//         >
//             <div
//                 style={{
//                     height: viewportInfo.getViewportContentHeight() + "px",
//                     display: "grid",
//                     gridAutoRows: viewportInfo.getViewportRowHeight() + "px",
//                     gridTemplateColumns: gridTemplateColumns,
//                     gridGap: viewportInfo.getViewportGap() + "px",
//                 }}
//                 className={props.className}
//             >
//                 <div
//                     style={{
//                         ...(props.headerPanelStyle || defaultHeaderPanelStyle),
//                         gridRow: `1 / span ${viewportInfo.getRowsHeaderCount()}`,
//                         gridColumn: `1 / span ${viewportInfo.getColsCount()}`,
//                         top: "0",
//                         position: "sticky",
//                     }}
//                 />
//
//                 {viewData.map((item: ViewportData<T>, index: number) => {
//                     const style:any = {
//                         gridRow: `${item.data.y} / span ${item.data.ySpan}`,
//                         gridColumn: `${item.data.x} / span ${item.data.xSpan}`,
//                         ...item.fixedStyle,
//                     }
//                     return (
//                         <Fragment key={item.key}>
//                             {props.onDisplayCell(
//                                 item,
//                                 index,
//                                 style,
//                                 viewportInfo
//                             )}
//                         </Fragment>
//                     )
//                 })}
//
//                 {(!!props.extension) && viewDataExtension.map((item: ViewportData<T>, index: number) => {
//                     return (
//                         <div
//                             key={item.key}
//                             style={{
//                                 gridRow: `${item.data.y} / span ${item.data.ySpan}`,
//                                 gridColumn: `${item.data.x} / span ${item.data.xSpan}`,
//                                 ...item.fixedStyle
//                             }}
//                         >
//                             <pre
//                                 style={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     fontSize: "10px",
//                                 }}
//                             >
//                                 <span>{item.data.value}</span>
//                                 <span className="material-symbols-outlined">stat_1</span>
//                             </pre>
//                         </div>
//                     )
//                 })}
//
//             </div>
//         </div>
//     )
// }
//
//
//
