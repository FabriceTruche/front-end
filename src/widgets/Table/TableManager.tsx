import {GridCellData, TableData, ViewportTableInfoCell} from "./Table";
import {AnyObject, Column, DbColumn} from "../../common/common";
import {dataHelper} from "../../helper/DataHelper";
import {uiHelper} from "../../helper/UIHelper";
import {DisplayedCellData, IFormatter} from "./IFormatter";
import {DataFormatter} from "./Formatter";
import {CSSProperties} from "react";

export type TableDataCellInfo = {
    body: ViewportTableInfoCell[]
    header: ViewportTableInfoCell[]
    footer: ViewportTableInfoCell[]
    widths: AnyObject
}
export class TableManager {

    /**
     *
     * @param dbCollection
     * @param elementId
     */
    public static calcTableDataCellInfo(dbCollection: TableData, elementId: string): TableDataCellInfo {
        const bodyCells: ViewportTableInfoCell[] = []
        const headerCells: ViewportTableInfoCell[] = []
        const footerCells: ViewportTableInfoCell[] = []
        const mapCol: string[] = []
        const lenCols = dbCollection.columns.length
        const rowCount = dbCollection.data.length
        const rowStart = 1

        const viewCollection: TableData = {
            data: [],
            columns: dbCollection.columns
        }

        // ajouter un element de cellule
        const addItem = (
            array: ViewportTableInfoCell[],
            column: Column|null, // null si cell non visuelle
            item: ViewportTableInfoCell,
        ): string => {
            const id: string = dataHelper.genKey()

            let clsName: string|undefined = item.className
            let style: CSSProperties|undefined = {}
            let value: any = ""

            if (column) {
                const formatter: IFormatter = DataFormatter.getFormatter(column)
                const dataCell: DisplayedCellData = formatter.format(item.value)

                clsName = uiHelper.mergeClassName(clsName, dataCell.className)
                style = uiHelper.mergeCSSProperties(style, dataCell.style)
                value = dataCell.value
            }

            const newItem: ViewportTableInfoCell = {
                id: id,
                value: value,
                y: item.y,
                ySpan: item.ySpan,
                x: item.x,
                xSpan: item.xSpan,
                className: clsName,
                style: style,
                typeCell: item.typeCell,
                colId: item.colId,
                rowId: item.rowId,
                // headerId: item.headerId
            }
            array.push(newItem)

            return id
        }

        // 1. parcours des colonnes
        dbCollection.columns.forEach((column: Column, indexCol: number) => {

            // 1.1. colonnes de mouse-hover
            const colId = addItem(
                bodyCells,
                null,
                {   id: "",
                    value: "",
                    y: rowStart,
                    ySpan: rowCount,
                    x: 1 + indexCol,
                    xSpan: 1,
                    className: "array-col",
                    typeCell: "col",
                })
            mapCol.push(colId)

            // 1.2. header
            addItem(
                headerCells,
                column,
                {   id: "",
                    y: 1,
                    ySpan: 1,
                    x: 1 + indexCol,
                    xSpan: 1,
                    className: "array-header",
                    typeCell: "header",
                    value: column.label,
                })

            // 1.3. footer
            addItem(
                footerCells,
                column,
                {   id: "",
                    y: 1,
                    ySpan: 1,
                    x: 1 + indexCol,
                    xSpan: 1,
                    className: "array-hfooter",
                    typeCell: "footer",
                    value: (dbCollection.totals===undefined) ? undefined : dbCollection.totals[column.name]
                })

        })


        // 3. lignes de mouse-hover
        dbCollection.data.forEach((valueRow: AnyObject, indexRow: number) => {
            const rowId = addItem(
                bodyCells,
                null,
                {   id: "", // "array-row-"+(3+indexRow),
                    value: "",
                    y: rowStart + indexRow,
                    ySpan: 1,
                    x: 1,
                    xSpan: lenCols,
                    className: "array-row",
                    typeCell: "row"
                })

            const viewRowObject: any = {}

            // 3.1. cellule de données
            dbCollection.columns.forEach((column: Column, indexCol: number) => {

                addItem(
                    bodyCells,
                    column,
                    {   id: "",
                        value: valueRow[column.name],
                        y: rowStart + indexRow,
                        ySpan: 1,
                        x: 1 + indexCol,
                        xSpan: 1,
                        className: "array-cell",
                        typeCell: "data",
                        rowId: rowId,
                        colId: mapCol[indexCol],
                        // headerId: mapHeader[indexCol]
                    })

                const newedItem: ViewportTableInfoCell = bodyCells.at(-1) as ViewportTableInfoCell
                viewRowObject[column.name] = newedItem.value
            })

            viewCollection.data.push(viewRowObject)
        })

        const result: TableDataCellInfo  = {
            body: bodyCells,
            header: headerCells,
            footer: footerCells,
            widths: uiHelper.getMaxWidthFromCollectionById(viewCollection, elementId, 25)
        }
        // console.log(">>", result)

        return result
    }
}






// //export const createTableManager=():ITableManager=>{ return new TableManager()}
//
//
//
//
// import {GridCellData, TableData, ViewportTableInfoCell} from "./Table";
// import {AnyObject, Column, DbColumn} from "../../common/common";
// import {dataHelper} from "../../helper/DataHelper";
// import {uiHelper} from "../../helper/UIHelper";
//
// export type TableDataCellInfo = {
//     collection: ViewportTableInfoCell[]
//     widths: AnyObject
// }
// // export interface ITableManager {
// //     getArrayInfo(dbCollection: TableData, elementId: string): TableDataCellInfo
// //     editRow(row: GridCellData): void
// // }
// export class TableManager /*implements ITableManager*/  {
//     // private newCells: ViewportCellArray[] = []
//     // private mapCol: string[] = []
//     // private mapHeader: string[] = []
//     //
//     // /**
//     //  *
//     //  * @param row
//     //  */
//     // public editRow(row: GridCellData) {
//     //
//     // }
//
//     /**
//      *
//      * @param dbCollection
//      * @param elementId
//      */
//     public static getArrayInfo(dbCollection: TableData, elementId: string): TableDataCellInfo {
//         // const newCells: ViewportCellArray[] = []
//         // // const newTexts: ValueObject = {}
//         // const mapCol: string[] = []
//         // const mapHeader: string[] = []
//         // this._dbCollection = dbCollection
//
//         const newCells: ViewportTableInfoCell[] = []
//         const mapCol: string[] = []
//         //const mapHeader: string[] = []
//
//         // this.mapCol=[]
//         // this.newCells=[]
//         // this.mapHeader=[]
//
//         const lenCols = dbCollection.columns.length
//         const rowCount = dbCollection.data.length
//         const rowStart = 1
//
//         const addItem = (item: ViewportTableInfoCell, collection: ViewportTableInfoCell[] = newCells): string => {
//             const id: string = dataHelper.genKey()
//             const newItem: ViewportTableInfoCell = {
//                 id: id,
//                 value: item.value,
//                 y: item.y,
//                 ySpan: item.ySpan,
//                 x: item.x,
//                 xSpan: item.xSpan,
//                 className: item.className,
//                 typeCell: item.typeCell,
//                 colId: item.colId,
//                 rowId: item.rowId,
//                 // headerId: item.headerId
//             }
//             collection.push(newItem)
//             return id
//         }
//
//         // 1. colonnes de mouse-hover
//         dbCollection.columns.forEach((m: Column, indexCol: number) => {
//             const colId = addItem({
//                 id: "",
//                 value: "",
//                 y: rowStart,
//                 ySpan: rowCount,
//                 x: 1 + indexCol,
//                 xSpan: 1,
//                 className: "array-col",
//                 typeCell: "col",
//             })
//             mapCol.push(colId)
//         })
//
//         // 2. entêtes de colonnes et ind input
//         // dbCollection.columns.forEach((m: Column, indexCol: number) => {
//         //     const headerId = addItem({
//         //         id: "",
//         //         y: 1,
//         //         ySpan: 1,
//         //         x: 1 + indexCol,
//         //         xSpan: 1,
//         //         className: "array-header",
//         //         typeCell: "header",
//         //         value: m.label,
//         //         // sort: dbCollection.columns[indexCol].sort,
//         //     })
//         //     this.mapHeader.push(headerId)
//         //     // newTexts[m.name]=m.name
//         //
//         //     // const option: ViewportCellArray = {
//         //     //     id: helper.genKey(),
//         //     //     y: 2,
//         //     //     ySpan: 1,
//         //     //     x: 1+indexCol,
//         //     //     xSpan: 1,
//         //     //     className: "array-find",
//         //     //     typeCell: "find",
//         //     //     value: (<TextInput label="" name="toto"/>)
//         //     // }
//         //     // newCells.push(option)
//         //     // &#11199;
//         // })
//
//         // 3. lignes de mouse-hover
//         dbCollection.data.forEach((valueRow: AnyObject, indexRow: number) => {
//             const rowId = addItem({
//                 id: "", // "array-row-"+(3+indexRow),
//                 value: "",
//                 y: rowStart + indexRow,
//                 ySpan: 1,
//                 x: 1,
//                 xSpan: lenCols,
//                 className: "array-row",
//                 typeCell: "row"
//             })
//
//             // 3.1. cellule de données
//             dbCollection.columns.forEach((m: Column, indexCol: number) => {
//                 addItem({
//                     id: "",
//                     value: valueRow[m.name],
//                     y: rowStart + indexRow,
//                     ySpan: 1,
//                     x: 1 + indexCol,
//                     xSpan: 1,
//                     className: "array-cell",
//                     typeCell: "data",
//                     rowId: rowId,
//                     colId: mapCol[indexCol],
//                     // headerId: mapHeader[indexCol]
//                 })
//
//                 // mise à jour des valeurs de width-max
//                 // if (valueRow[m.name]) {
//                 //     const text = valueRow[m.name].toString()
//                 //     const len = text.length
//                 //     const currLen = newTexts[m.name].length
//                 //
//                 //     if (len >= currLen) {
//                 //         newTexts[m.name] = text.toUpperCase() // "-".repeat(len) // text
//                 //     }
//                 // }
//             })
//         })
//
//         // 4. cellule entete de width-max
//         // dbCollection.columns.forEach((m: XArrayColumn, indexCol: number) => {
//         //     addItem({
//         //         id: "",
//         //         value: newTexts[m.name],
//         //         y: 1,
//         //         ySpan: 1,
//         //         x: 1+indexCol,
//         //         xSpan: 1,
//         //         className:"array-checkwidth",
//         //         typeCell: "checkWidth",
//         //     })
//         // })
//
//         const result = {
//             collection: newCells,
//             widths: uiHelper.getMaxWidthFromCollectionById(dbCollection, elementId, 13)
//         }
//         console.log(">>", result)
//
//         return result
//     }
// }
//
// //export const createTableManager=():ITableManager=>{ return new TableManager()}