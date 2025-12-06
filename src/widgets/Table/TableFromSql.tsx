import {useEffect, useState} from "react";
import {ViewportTableInfoCell, Table, TableProps} from "./Table";
import {AnyObject, DbColumn, ResponseQuery} from "../../common/common";
import {helper} from "../../helper/Helper";
import {apiHelper} from "../../helper/ApiHelper";
import {Column} from "./Column";
import {defaultTableData, TableData} from "./TableData";

export type TableFromSqlProps<T> = Omit<TableProps<T> & {sql: string,labelName?:(col:DbColumn)=>string},"dataRows">

// export const TableFromSql = <T,>(props:TableFromSqlProps<T>) => {
//     const [initialDataRows, setInitialDataRows] = useState<T[]>([])
//     const [collection, setCollection] = useState<TableData<T>>(defaultTableData)
//
//     useEffect(() => {
//         // console.log('useEffect de XArrayFromSql')
//
//         apiHelper.executeQuery(props.sql)
//             .then((response: ResponseQuery) => {
//                 const newCollection: TableData<T> | null = helper.toCollection(response,props.labelName)
//                 if (newCollection) {
//                     setInitialDataRows([...response.data])
//                     setCollection(newCollection)
//                 } else {
//                     setInitialDataRows([])
//                     setCollection(defaultTableData)
//                 }
//             })
//
//         return ()=>{
//             // console.log('cleanup de useEffect')
//             setCollection(defaultTableData)
//         }
//
//     }, [props.sql])
//
//     const sortData = (column: keyof T, sort: number): T[] => {
//         if (sort === 0)
//             return [...initialDataRows]
//         const res: number = (sort === 1) ? 1 : -1
//         return collection.data.sort((item1: T, item2: T) => {
//             if (item1[column] === null) return -res
//             if (item2[column] === null) return res
//             if (item1[column] < item2[column]) return -res
//             if (item1[column] > item2[column]) return res
//             return 0
//         })
//     }
//
//     const filterData = (text: string): T[] => {
//         const result: T[] = []
//         if (text === "")
//             return initialDataRows
//         const re = new RegExp(text, 'i')
//         initialDataRows.forEach((row: T) => {
//             let isValid: boolean = false
//             for (let i = 0; i < collection.columns.length; i++) {
//                 const col: keyof T = collection.columns[i].name as keyof T
//                 const value: any = row[col]
//                 if (value) {
//                     const valueStr: string = value.toString()
//                     if (re.test(valueStr)) {
//                         isValid = true
//                         break
//                     }
//                 }
//             }
//             if (isValid) {
//                 result.push(row)
//             }
//         })
//         return result
//     }
//
//     // console.log('render de XArrayFromSql',collection.columns.length,props.sql)
//
//     if (collection.columns.length === 0)
//         return null
//
//     return (
//         <Table
//             dataRows={collection}
//             viewportHeight={props.viewportHeight}
//             onMouseOver={(cell: ViewportTableInfoCell) => {
//                 if (props.onMouseOver) props.onMouseOver(cell)
//             }}
//             onClickHeader={(indexHeader: number, cell: ViewportTableInfoCell) => {
//                 const newSort = (collection.columns[indexHeader].sort + 1) % 3
//                 const newRows = sortData(collection.columns[indexHeader].name as keyof T, newSort)
//                 collection.columns.forEach((c: Column) => c.sort = 0)
//                 collection.columns[indexHeader].sort = newSort
//                 setCollection({
//                     data: newRows,
//                     columns: [...collection.columns]
//                 })
//                 if (props.onClickHeader) props.onClickHeader(indexHeader,cell)
//             }}
//             onFind={(text: string) => {
//                 const newRows: T[] = filterData(text)
//                 setCollection({
//                     data: newRows,
//                     columns: [...collection.columns]
//                 })
//                 if (props.onFind) props.onFind(text)
//             }}
//         />
//     )
// }