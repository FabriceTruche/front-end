import {ViewportInfoCell} from "../../containers/Viewport/ViewportDefinitions";
import {TextInput} from "../../ui/Text/TextInput"
import {Viewport} from "../../containers/Viewport/Viewport";
import {TableBody} from "./TableBody";
import {TableFooter} from "./TableFooter";
import {TableHeader} from "./TableHeader";
import {ITableData} from "./TableData";
import {useTableHook} from "./useTableHook";
import {TableRowEditor} from "./TableRowEditor";
import {useState} from "react";
import "./table.css"
import {helper} from "../../common/Helper";


export type TableRow = {
    rowIndex: number
    colIndex: number
    row: any
    value: any
}
export type TypeCell = "data"|"row"|"col"|"header"|"footer"

export type ViewportTableInfoCell = ViewportInfoCell & {
    typeCell: TypeCell
    rowId?: string
    colId?: string
}
export type TableProps<T> = {
    dataRows: ITableData<T>
    allowFind?:boolean
    allowEdit?:boolean
    viewportHeight?: number
    viewportRowHeight?: number
    onClick?:(cell:ViewportTableInfoCell)=>void
}
export const Table = <T,>(props: TableProps<T>) => {

    const [editIsOn,setEditIsOn] = useState(false)
    const [key,setKey] = useState(helper.genKey())

    const {
        tableDataView,
        handleSort,
        sortedColIndex,
        handleFilter,
        handleResetFilter,
        selectCell,
        rowData,
    } = useTableHook(props.dataRows)

    const headerRef = <div id="header-ref-style" className="array-header" style={{visibility: "hidden", width:0, height:0}}> HEADER REF STYLE</div>

    return (
        <div className="array-container">
            {headerRef}

            {(!!props.allowFind) && (
                <TextInput
                    name="array-find-input"
                    label="Find"
                    nullIfEmpty={false}
                    onChangeEnter={handleFilter}
                    onReset={handleResetFilter}
                />
            )}

            {(!!props.allowEdit) && (rowData!==null) && (
                <TableRowEditor
                    show={editIsOn}
                    object={rowData.row}
                    columns={props.dataRows.columns}
                    // editors={props.editors}
                    onCancel={()=>setEditIsOn(false)}
                    onOk={()=>setEditIsOn(false)}
                />
            )}

            <TableHeader
                tableDataCells={tableDataView}
                sortedColIndex={sortedColIndex}
                onClick={(colIndex:number)=>{
                    handleSort(colIndex)
                    setKey(helper.genKey())
                }}
            />

            <Viewport<ViewportTableInfoCell>
                key={key}
                viewportHeight={props.viewportHeight ?? 1000}
                viewportRowHeight={props.viewportRowHeight ?? 22}
                rowCount={tableDataView ? tableDataView.rowCount : 0}
                viewportGap={0}
                rowHeaderCount={0}
                collection={tableDataView ? tableDataView.body : []}
                columnsWidth={tableDataView ? tableDataView.widths : {}}
                onViewportCell={(item: ViewportTableInfoCell, index:number, style:any) => {
                    if (item.typeCell==="header" || item.typeCell==="footer")
                        return null

                    return (
                        <TableBody
                            // key={key}
                            item={item}
                            index={index}
                            style={style}
                            onRowClick={(cell:ViewportTableInfoCell)=>{
                                selectCell(cell)
                                setEditIsOn(true)
                                props.onClick && props.onClick(cell)
                            }}
                        />

                    )
                }}
            />

            <TableFooter
                tableDataCells={tableDataView}
            />
        </div>
    )
}




/*
            {props.allowEdit && (
                <div>
                    HELLO WORLD
                    <pre>
                        {JSON.stringify(rowData,null,3)}
                    </pre>
                </div>
            )}
*/    // onMouseOver?:((cellData:ViewportTableInfoCell, rowData: TableRow)=>void)
// onClickHeader?:((indexColumn:number,cell:ViewportTableInfoCell)=>void)
// onFind?:((text:string)=>void)
// onClick?:((cell:CellDataSelection)=>void)
// const [tableMgr,setTableMgr] = useState<ITableManager<T>>()
// const [tableDataCells, setTableDataCells] = useState<TableDataView|null>(null)
// const [editRow, setEditRow] = useState<boolean>(false)
// const [cellData, setCellData] = useState<ViewportTableInfoCell>()


// useEffect(() => {
//     const tm: ITableManager<T> = createTableManager(props.dataRows, "header-ref-style")
//     setTableMgr(tm)
//     setTableDataCells(tm.calcTableDataCellInfo(props.dataRows.data, "header-ref-style"))
//
//     // const tm:ITableManager<T> = createTableManager()
//     // const allCells:TableDataCellInfo = tm.calcTableDataCellInfo("header-ref-style")
//     // const gridTemplateColumns:string = Object.values(allCells.widths).join(" ")
//     // setColumnsWidth(gridTemplateColumns)
//
// }, [props.dataRows])

// const currentRow = (): T|null => {
//     if (tableMgr && cellData) {
//         return tableMgr.rowAt(cellData.y-1)
//     }
//     return null
// }
//
// if (tableDataCells === null)
//     return headerRef
// console.log("rowData=",rowData)
// console.log("cellData=",cellData)

