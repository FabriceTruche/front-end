import {ITableData} from "./TableData";
import {useCallback, useEffect, useMemo, useState} from "react";
import {TableRow, ViewportTableInfoCell} from "./Table";
import {ITableManager, SortType, TableDataView} from "./TableManager";
import {factory} from "../../common/Factory";

export interface ITableHook<T> {
    // tableManager: ITableManager<T>
    tableDataView: TableDataView | null
    cellData: ViewportTableInfoCell | null
    rowData: TableRow | null
    sortedColIndex: [number, SortType]
    handleSort: (colIndex: number) => void
    handleFilter: (text: string) => void
    handleResetFilter: () => void
    selectCell: (cell: ViewportTableInfoCell) => void
}

export function useTableHook<T>(dataRows: ITableData<T>): ITableHook<T> {
    const [tableDataView, setTableDataViews] = useState<TableDataView|null>(null)
    const [cellData, setCellData] = useState<ViewportTableInfoCell|null>(null)
    const [rowData, setRowData] = useState<TableRow|null>(null)
    const [sortedColIndex, setSortedColIndex] = useState<[number,SortType]>([-1,SortType.init])
    const tableManager: ITableManager<T> = useMemo(()=>factory.createTableManager(dataRows,"header-ref-style"),[dataRows])

    useEffect(() => {
        setTableDataViews(tableManager.calcTableDataCellInfo())
    }, [tableManager])

    const handleFilter= useCallback((text: string):void => {
        tableManager.filter(text)
        setTableDataViews(tableManager.calcTableDataCellInfo())
    },[tableManager])

    const handleSort= useCallback((colIndex: number):void => {
        tableManager.sort(colIndex)
        setTableDataViews(tableManager.calcTableDataCellInfo())
        setSortedColIndex([
            tableManager.currentSortedColIndex(),
            tableManager.currentSort()
        ])
    },[tableManager])

    const handleResetFilter = useCallback(():void => {
        tableManager.filter("")
        setSortedColIndex([-1,SortType.init])
        setTableDataViews(tableManager.calcTableDataCellInfo())
    },[tableManager])

    const selectCell= useCallback((cell: ViewportTableInfoCell):void => {
        setCellData(cell)
        setRowData({
            colIndex: cell.x-1,
            rowIndex: cell.y-1,
            row: tableManager.rowAt(cell.y-1),
            value: cell.value
        })
    },[tableManager])

    return {
        // tableManager,
        tableDataView,
        cellData,
        rowData,
        sortedColIndex,
        handleSort,
        handleFilter,
        handleResetFilter,
        selectCell
    }
}