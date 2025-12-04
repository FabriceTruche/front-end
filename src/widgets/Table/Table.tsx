import {useEffect, useState} from "react";
import {TableDataCellInfo, TableManager} from "./TableManager";
import {AnyObject, Column} from "../../common/common";
import {ViewportInfoCell} from "../../containers/Viewport/ViewportDefinitions";
import {TextInput} from "../../ui/Text/TextInput"
import {Viewport} from "../../containers/Viewport/Viewport";
import {TableRowEditor} from "./TableRowEditor";
import {TableBody} from "./TableBody";
import "./table.css"
import {TableFooter} from "./TableFooter";
import {TableHeader} from "./TableHeader";

export type TableData = {
    data: AnyObject[]
    columns: Column[]
    totals?: { [property: string]: number }
}
export const defaultTableData: TableData = {
    columns:[],
    data:[]
}
export type GridCellData = {
    rowIndex: number
    columnIndex: number
    row: any
    cellValue: any
    // columns: Column[]
}
export type ViewportTableInfoCell = ViewportInfoCell & {
    typeCell: "data"|"row"|"col"|"header"|"footer"
    rowId?: string
    colId?: string
    // headerId?: string
}
export type TableProps = {
    dataRows: TableData
    allowFind?:boolean
    allowEdit?:boolean
    viewportHeight?: number
    viewportRowHeight?: number
    onMouseOver?:((cell:ViewportTableInfoCell)=>void)
    onClickHeader?:((indexColumn:number,cell:ViewportTableInfoCell)=>void)
    onFind?:((text:string)=>void)
    // onClick?:((cell:CellData, info: IViewportManager)=>void)
}
export const Table = (props: TableProps) => {
    const [tableDataCells, setTableDataCells] = useState<TableDataCellInfo>()
    const [editRow, setEditRow] = useState<boolean>(false)
    const [cellData, setCellData] = useState<GridCellData>()
    const [columnsWidth, setColumnsWidth] = useState("")

    const headerRef = <div id="header-ref-style" className="array-header" style={{visibility: "hidden", width:0, height:0}}> HEADER REF STYLE</div>

    useEffect(() => {
        // const ai:ITableManager=createTableManager()
        const allCells:TableDataCellInfo = TableManager.calcTableDataCellInfo(props.dataRows,"header-ref-style")
        const gridTemplateColumns:string = Object.values(allCells.widths).join(" ")

        setColumnsWidth(gridTemplateColumns)
        setTableDataCells(allCells)
    }, [props.dataRows])

    if (tableDataCells===undefined)
        return headerRef

    return (
        <div className="array-container">
            {headerRef}
            {(!!props.allowFind) && (
                <TextInput
                    name="array-find-input"
                    label="Find"
                    nullIfEmpty={false}
                    onChange={(text:string)=>{
                        if (props.onFind) props.onFind(text)
                    }}
                    onReset={()=>{
                        if (props.onFind) props.onFind("")
                    }}
                />
            )}
            <TableRowEditor
                show={editRow}
                row={cellData && cellData.row}
                onCancel={()=>setEditRow(false)}
                onOk={()=>setEditRow(false)}
            />

            <TableHeader
                tableDataCells={tableDataCells}
                // dataRows={props.dataRows}
                // columnsWidth={columnsWidth}
            />

            <Viewport<ViewportTableInfoCell>
                // key={key}
                viewportHeight={props.viewportHeight ?? 1000}
                viewportRowHeight={props.viewportRowHeight ?? 22}
                rowCount={props.dataRows.data.length}
                viewportGap={0}
                rowHeaderCount={0}
                collection={tableDataCells.body}
                columnsWidth={tableDataCells.widths}
                onViewportCell={(item: ViewportTableInfoCell, index:number, style:any) => {
                    if (item.typeCell==="header" || item.typeCell==="footer")
                        return null

                    return (
                        <TableBody
                            item={item}
                            index={index}
                            style={style}
                            // viewportInfo={viewportInfo}
                            dataRows={props.dataRows}
                            onMouseOver={()=>props.onMouseOver && props.onMouseOver(item)}
                            onClick={((cell:GridCellData,)=>{
                                if (!!props.allowEdit)
                                    setEditRow(true)

                                setCellData(cell)
                            })}
                        />

                    )
                }}
            />

            <TableFooter
                tableDataCells={tableDataCells}
            />

        </div>
    )
}







// <div
//     id={item.key}
//     className={item.data.className}
//     style={style}
//     onMouseEnter={()=> {
//         assignHover(item.data,"array-row-hover",item.data.rowId,true)
//         assignHover(item.data,"array-col-hover",item.data.colId,true)
//         assignHover(item.data,"array-header-hover",item.data.headerId,true)
//     }}
//     onMouseLeave={()=>{
//         assignHover(item.data,"array-row-hover",item.data.rowId,false)
//         assignHover(item.data,"array-col-hover",item.data.colId,false)
//         assignHover(item.data,"array-header-hover",item.data.headerId,false)
//     }}
//     onMouseOver={()=>props.onMouseOver && props.onMouseOver(item.data)}
//     onClick={()=>{
//         if (item.data.typeCell==="header") {
//             props.onClickHeader && props.onClickHeader(item.data.x-1,item)
//         } else {
//             const cell: CellData = {
//                 rowIndex: item.data.y - 2,
//                 columnIndex: item.data.x - 1,
//                 cellValue: item.data.value,
//                 row: props.dataRows.data[item.data.y - 2],
//             }
//             props.onClick && props.onClick(cell, viewportInfo)
//
//             if (!!props.allowEdit)
//                 setEditRow(true)
//
//             setCellData(cell)
//         }
//     }}
// >
//     {displayCell(item)}
// </div>
/*                                if (item.typeCell==="header") {
                                    props.onClickHeader && props.onClickHeader(item.x-1,item)
                                } else {
                                }
*/