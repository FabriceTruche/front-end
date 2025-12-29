 import React, {
    CSSProperties, Fragment, JSX,
    ReactElement,
    useEffect,
    useRef,
    useState
} from "react";
import {
    defaultViewportRange, ViewportManager,
} from "./ViewportManager";
import {ViewportInfoCell, ViewportRange, IViewportManager} from "./ViewportDefinitions";
 import {AnyObject} from "../../common/common";

export type VirtualViewProps = {
    nbRows: number;             // nombre de lignes du tcd
    rowHeight: number;          // hauteur d'une ligne du tcd (px)
    virtualViewHeight: number;  // hauteur de la virtua view (px)

    onUpdateView: (topHeight: number) => ReactElement|null
}
export const VirtualView = (props:VirtualViewProps) => {
    const [topHeight, setTopHeight] = useState(0)
    const viewPortRef = useRef<any>(null)
    // const nbVisibleRows = Math.trunc(props.virtualViewHeight / props.rowHeight)

    return (
        <div
            style={{
                overflowY: "auto",
                height: props.virtualViewHeight,
                border: "1px solid red",
            }}
            ref={viewPortRef}
            onScroll={() => {
                setTopHeight(viewPortRef.current.scrollTop)     // correspond au nb de pixel du haut de l'élément jusqu'au 1er pixel visible
                // const nbHiddenRows = topHeight / props.rowHeight    // nombre de lignes masquées car situées au dessus de la zone de scroll
                //setFirstVisibleRow(Math.trunc(nbHiddenRows+1))
            }}
        >
            {props.onUpdateView(topHeight)}
        </div>
    )
}



 // // const [viewDataExtension, setViewDataExtension] = useState<ViewportData<T>[]>([])
 //
 // {/*{(!!props.extension) && viewDataExtension.map((item: ViewportData<T>, index: number) => {*/}
 // {/*    return (*/}
 // {/*        <div*/}
 // {/*            key={item.key}*/}
 // {/*            style={{*/}
 // {/*                gridRow: `${item.data.y} / span ${item.data.ySpan}`,*/}
 // {/*                gridColumn: `${item.data.x} / span ${item.data.xSpan}`,*/}
 // {/*                ...item.fixedStyle*/}
 // {/*            }}*/}
 // {/*        >*/}
 // {/*            <pre*/}
 // {/*                style={{*/}
 // {/*                    display: "flex",*/}
 // {/*                    justifyContent: "center",*/}
 // {/*                    alignItems: "center",*/}
 // {/*                    fontSize: "10px",*/}
 // {/*                }}*/}
 // {/*            >*/}
 // {/*                <span>{item.data.value}</span>*/}
 // {/*                <span className="material-symbols-outlined">stat_1</span>*/}
 // {/*            </pre>*/}
 // {/*        </div>*/}
 // {/*    )*/}
 // {/*})}*/}
 //extension?: boolean

 //
 // {props.rowHeaderCount>0 && (
 //     <div
 //         style={{
 //             ...(props.headerPanelStyle || defaultHeaderPanelStyle),
 //             gridRow: `1 / span ${viewportInfo.rowsHeaderCount}`,
 //             gridColumn: `1 / span ${viewportInfo.colsCount}`,
 //             top: "0",
 //             position: "sticky",
 //         }}
 //     />
 //     {/*)}*/}
 //
 // <div
 //     style={{
 //         height: viewportInfo.viewportContentHeight + "px",
 //         display: "grid",
 //         gridAutoRows: viewportInfo.viewportRowHeight + "px",
 //         gridTemplateColumns: gridTemplateColumns,
 //         gridGap: viewportInfo.viewportGap + "px",
 //     }}
 //     className={props.className}
 // >
 //     {viewData.map((item: T, index: number) => {
 //         const style:any = {
 //             gridRow: `${item.y} / span ${item.ySpan}`,
 //             gridColumn: `${item.x} / span ${item.xSpan}`,
 //             // ...item.fixedStyle,
 //         }
 //         return (
 //             <Fragment key={item.id}>
 //                 {props.onViewportCell(
 //                     item,
 //                     index,
 //                     style,
 //                     viewportInfo
 //                 )}
 //             </Fragment>
 //         )
 //     })}
 //
 // </div>
 // const [viewData, setViewData] = useState<T[]>([])
 // const [viewportInfo, setViewportInfo] = useState<IViewportManager>()
 // const [range, setRange] = useState<ViewportRange>(defaultViewportRange)
 // const defaultHeaderPanelStyle = {background: "white"}
 //
 // useEffect(() => {
 //     // console.log('use effect')
 //     const vpi: IViewportManager = new ViewportManager(props.viewportHeight, props.viewportRowHeight, props.rowCount, props.rowHeaderCount, props.viewportGap)
 //     setViewportInfo(vpi)
 //     refresh(vpi)
 // }, [props.collection])
 //
 // const defineColsCount = (vpi: IViewportManager) => {
 //     // compute colsCount
 //     const colsCount:ViewportInfoCell = {
 //         xSpan:0,
 //         value:"",
 //         y:0,
 //         ySpan:0,
 //         x:0,
 //         id:""
 //     };
 //     const maxColsCount:ViewportInfoCell = props.collection.reduce(
 //         (accumulator, currentValue) => (accumulator.x<currentValue.x)?currentValue:accumulator,
 //         colsCount,
 //     );
 //     vpi.setColsCount(maxColsCount.x)
 // }
 //
 // const refresh = (vpi: IViewportManager) => {
 //     // const data: ViewportData<T>[] =vpi.selectVisibleCells(props.collection)
 //     const data: T[] =vpi.selectVisibleCells(props.collection)
 //     // console.log(3,data.length)
 //     defineColsCount(vpi)
 //     const vpr: ViewportRange = vpi.viewportRange
 //     setRange(vpr)
 //     setViewData(data)
 //     // if (!!props.extension) {
 //     //     setViewDataExtension(vpi.projectExtension(props.collection))
 //     //     // console.log(viewDataExtension.length)
 //     // }
 //     if (props.onChange)
 //         props.onChange(vpi, vpr)
 // }
 //
 // // console.log('avant render',props.collection,viewportInfo)
 //
 // if (viewportInfo === undefined)
 //     return null

 // const gridTemplateColumns:string|undefined = (props.columnsWidth===undefined) ? undefined : Object.values(props.columnsWidth).join(" ")
 // console.log(">>", gridTemplateColumns)
 // collection: T[]
 // columnsWidth?:AnyObject
 // viewportHeight: number
 // viewportRowHeight: number
 // viewportGap?: number
 // rowCount: number
 // rowHeaderCount: number
 // headerPanelStyle?: CSSProperties
 // onChange?: (viewportInfo:IViewportManager,viewportRange: ViewportRange)=>void
 // onViewportCell: (cell: T, index:number, style:any, viewportInfo:IViewportManager)=>ReactElement|null
 // className?: string
 // if (viewportInfo !== undefined) {
 //     viewportInfo.setViewportTop(viewPortRef.current.scrollTop)
 //     if (viewportInfo.firstScrollableVisibleRow !== range.rowStart || viewportInfo.lastVisibleRow !== range.rowEnd) {
 //         refresh(viewportInfo)
 //     }
 // }
 // width: "fit-content",
 // minHeight: "auto",
 // maxHeight: viewportInfo.viewportHeight + "px",
