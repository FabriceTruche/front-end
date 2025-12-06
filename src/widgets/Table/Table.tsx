import {useEffect, useState} from "react";
import {ViewportInfoCell} from "../../containers/Viewport/ViewportDefinitions";
import {TextInput} from "../../ui/Text/TextInput"
import {Viewport} from "../../containers/Viewport/Viewport";
import {TableRowEditor} from "./TableRowEditor";
import {TableBody} from "./TableBody";
import {TableFooter} from "./TableFooter";
import {TableHeader} from "./TableHeader";
import {TableData} from "./TableData";
import {createTableManager, ITableManager, TableDataCellInfo} from "./ITableManager";
import "./table.css"

// export type CellDataSelection = {
//     rowIndex: number
//     colIndex: number
//     row: any
//     value: any
// }
export type ViewportTableInfoCell = ViewportInfoCell & {
    typeCell: "data"|"row"|"col"|"header"|"footer"
    rowId?: string
    colId?: string
}
export type TableProps<T> = {
    dataRows: TableData<T>
    allowFind?:boolean
    allowEdit?:boolean
    viewportHeight?: number
    viewportRowHeight?: number
    // onMouseOver?:((cell:ViewportTableInfoCell)=>void)
    // onClickHeader?:((indexColumn:number,cell:ViewportTableInfoCell)=>void)
    // onFind?:((text:string)=>void)
    // onClick?:((cell:CellDataSelection)=>void)
}
export const Table = <T,>(props: TableProps<T>) => {
    const [tableMgr,setTableMgr] = useState<ITableManager<T>>()
    const [tableDataCells, setTableDataCells] = useState<TableDataCellInfo|null>(null)
    const [editRow, setEditRow] = useState<boolean>(false)
    const [cellData, setCellData] = useState<ViewportTableInfoCell>()

    const headerRef = <div id="header-ref-style" className="array-header" style={{visibility: "hidden", width:0, height:0}}> HEADER REF STYLE</div>

    useEffect(() => {
        const tm: ITableManager<T> = createTableManager(props.dataRows, "header-ref-style")
        setTableMgr(tm)
        setTableDataCells(tm.calcTableDataCellInfo(props.dataRows.data, "header-ref-style"))

        // const tm:ITableManager<T> = createTableManager()
        // const allCells:TableDataCellInfo = tm.calcTableDataCellInfo("header-ref-style")
        // const gridTemplateColumns:string = Object.values(allCells.widths).join(" ")
        // setColumnsWidth(gridTemplateColumns)

    }, [props.dataRows])

    const currentRow = (): T|null => {
        if (tableMgr && cellData) {
            return tableMgr.rowAt(cellData.y-1)
        }
        return null
    }

    if (tableDataCells === null)
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
                        // if (props.onFind) props.onFind(text)
                    }}
                    onReset={()=>{
                        // if (props.onFind) props.onFind("")
                    }}
                />
            )}
            <TableRowEditor
                show={editRow}
                row={currentRow()} //cellData && cellData.row}
                onCancel={()=>setEditRow(false)}
                onOk={()=>setEditRow(false)}
            />

            <TableHeader
                tableDataCells={tableDataCells}
                onClick={(colIndex:number)=>{
                    if (tableMgr!==undefined) {
                        setTableDataCells(tableMgr.sort(colIndex))
                    }
                }}
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
                            // dataRows={props.dataRows}
                            // onMouseOver={()=>props.onMouseOver && props.onMouseOver(item)}
                            onClick={((cell:ViewportTableInfoCell,)=>{
                                if (!!props.allowEdit)
                                    setEditRow(true)

                                setCellData(cell)

                                // if (props.onClick)
                                //     props.onClick(cell)
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
