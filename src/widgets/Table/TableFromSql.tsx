import {useEffect, useState} from "react";
import {defaultTableData, ViewportTableInfoCell, Table, TableData, TableProps} from "./Table";
import {AnyObject, Column, DbColumn, ResponseQuery} from "../../common/common";
import {helper} from "../../helper/Helper";
import {apiHelper} from "../../helper/ApiHelper";

export type TableFromSqlProps = Omit<TableProps & {sql: string,labelName?:(col:DbColumn)=>string},"dataRows">

export const TableFromSql = (props:TableFromSqlProps) => {
    const [initialDataRows, setInitialDataRows] = useState<AnyObject[]>([])
    const [collection, setCollection] = useState<TableData>(defaultTableData)

    useEffect(() => {
        // console.log('useEffect de XArrayFromSql')

        apiHelper.executeQuery(props.sql)
            .then((response: ResponseQuery) => {
                const newCollection: TableData | null = helper.toCollection(response,props.labelName)
                if (newCollection) {
                    setInitialDataRows([...response.data])
                    setCollection(newCollection)
                } else {
                    setInitialDataRows([])
                    setCollection(defaultTableData)
                }
            })

        return ()=>{
            // console.log('cleanup de useEffect')
            setCollection(defaultTableData)
        }

    }, [props.sql])

    const sortData = (column: string, sort: number): AnyObject[] => {
        if (sort === 0)
            return [...initialDataRows]
        const res: number = (sort === 1) ? 1 : -1
        return collection.data.sort((item1: AnyObject, item2: AnyObject) => {
            if (item1[column] === null) return -res
            if (item2[column] === null) return res
            if (item1[column] < item2[column]) return -res
            if (item1[column] > item2[column]) return res
            return 0
        })
    }

    const filterData = (text: string): AnyObject[] => {
        const result: AnyObject[] = []
        if (text === "")
            return initialDataRows
        const re = new RegExp(text, 'i')
        initialDataRows.forEach((row: AnyObject) => {
            let isValid: boolean = false
            for (let i = 0; i < collection.columns.length; i++) {
                const col: string = collection.columns[i].name
                const value: any = row[col]
                if (value) {
                    const valueStr: string = value.toString()
                    if (re.test(valueStr)) {
                        isValid = true
                        break
                    }
                }
            }
            if (isValid) {
                result.push(row)
            }
        })
        return result
    }

    // console.log('render de XArrayFromSql',collection.columns.length,props.sql)

    if (collection.columns.length === 0)
        return null

    return (
        <Table
            dataRows={collection}
            viewportHeight={props.viewportHeight}
            onMouseOver={(cell: ViewportTableInfoCell) => {
                if (props.onMouseOver) props.onMouseOver(cell)
            }}
            onClickHeader={(indexHeader: number, cell: ViewportTableInfoCell) => {
                const newSort = (collection.columns[indexHeader].sort + 1) % 3
                const newRows = sortData(collection.columns[indexHeader].name, newSort)
                collection.columns.forEach((c: Column) => c.sort = 0)
                collection.columns[indexHeader].sort = newSort
                setCollection({
                    data: newRows,
                    columns: [...collection.columns]
                })
                if (props.onClickHeader) props.onClickHeader(indexHeader,cell)
            }}
            onFind={(text: string) => {
                const newRows: AnyObject[] = filterData(text)
                setCollection({
                    data: newRows,
                    columns: [...collection.columns]
                })
                if (props.onFind) props.onFind(text)
            }}
        />
    )
}