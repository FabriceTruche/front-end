import {TableData, ViewportCellArray} from "./Table";
import {AnyObject, Column} from "../../common/common";
import {dataHelper} from "../../helper/DataHelper";
import {uiHelper} from "../../helper/UIHelper";

export type TableDataInfo = {
    collection: ViewportCellArray[]
    widths: AnyObject
}
export interface ITableManager {
    getArrayInfo(dbCollection: TableData, elementId: string): TableDataInfo
}
class TableManager implements ITableManager {
    // const newTexts: ValueObject = {}
    // private lenCols: number
    // private rowCount:number
    // private rowStart = 2

    private newCells: ViewportCellArray[] = []
    private mapCol: string[] = []
    private mapHeader: string[] = []

    constructor() {
    }

    public getArrayInfo(dbCollection: TableData, elementId: string): TableDataInfo {
        // const newCells: ViewportCellArray[] = []
        // // const newTexts: ValueObject = {}
        // const mapCol: string[] = []
        // const mapHeader: string[] = []
        // this._dbCollection = dbCollection

        this.mapCol=[]
        this.newCells=[]
        this.mapHeader=[]

        const lenCols = dbCollection.columns.length
        const rowCount = dbCollection.data.length
        const rowStart = 2

        const addItem = (item: ViewportCellArray, collection: ViewportCellArray[] = this.newCells): string => {
            const id: string = dataHelper.genKey()
            const newItem: ViewportCellArray = {
                id: id,
                value: item.value,
                y: item.y,
                ySpan: item.ySpan,
                x: item.x,
                xSpan: item.xSpan,
                className: item.className,
                typeCell: item.typeCell,
                colId: item.colId,
                rowId: item.rowId,
                headerId: item.headerId
            }
            collection.push(newItem)
            return id
        }

        // 1. colonnes de mouse-hover
        dbCollection.columns.forEach((m: Column, indexCol: number) => {
            const colId = addItem({
                id: "",
                value: "",
                y: rowStart,
                ySpan: rowCount,
                x: 1 + indexCol,
                xSpan: 1,
                className: "array-col",
                typeCell: "col",
            })
            this.mapCol.push(colId)
        })

        // 2. entêtes de colonnes et ind input
        dbCollection.columns.forEach((m: Column, indexCol: number) => {
            const headerId = addItem({
                id: "",
                y: 1,
                ySpan: 1,
                x: 1 + indexCol,
                xSpan: 1,
                className: "array-header",
                typeCell: "header",
                value: m.label,
                // sort: dbCollection.columns[indexCol].sort,
            })
            this.mapHeader.push(headerId)
            // newTexts[m.name]=m.name

            // const option: ViewportCellArray = {
            //     id: helper.genKey(),
            //     y: 2,
            //     ySpan: 1,
            //     x: 1+indexCol,
            //     xSpan: 1,
            //     className: "array-find",
            //     typeCell: "find",
            //     value: (<TextInput label="" name="toto"/>)
            // }
            // newCells.push(option)
            // &#11199;
        })

        // 3. lignes de mouse-hover
        dbCollection.data.forEach((valueRow: AnyObject, indexRow: number) => {
            const rowId = addItem({
                id: "", // "array-row-"+(3+indexRow),
                value: "",
                y: rowStart + indexRow,
                ySpan: 1,
                x: 1,
                xSpan: lenCols,
                className: "array-row",
                typeCell: "row"
            })

            // 3.1. cellule de données
            dbCollection.columns.forEach((m: Column, indexCol: number) => {
                addItem({
                    id: "",
                    value: valueRow[m.name],
                    y: rowStart + indexRow,
                    ySpan: 1,
                    x: 1 + indexCol,
                    xSpan: 1,
                    className: "array-cell",
                    typeCell: "data",
                    rowId: rowId,
                    colId: this.mapCol[indexCol],
                    headerId: this.mapHeader[indexCol]
                })

                // mise à jour des valeurs de width-max
                // if (valueRow[m.name]) {
                //     const text = valueRow[m.name].toString()
                //     const len = text.length
                //     const currLen = newTexts[m.name].length
                //
                //     if (len >= currLen) {
                //         newTexts[m.name] = text.toUpperCase() // "-".repeat(len) // text
                //     }
                // }
            })
        })

        // 4. cellule entete de width-max
        // dbCollection.columns.forEach((m: XArrayColumn, indexCol: number) => {
        //     addItem({
        //         id: "",
        //         value: newTexts[m.name],
        //         y: 1,
        //         ySpan: 1,
        //         x: 1+indexCol,
        //         xSpan: 1,
        //         className:"array-checkwidth",
        //         typeCell: "checkWidth",
        //     })
        // })

        const widths = uiHelper.getMaxWidthFromCollectionById(dbCollection, elementId, 13)

        return {
            collection: this.newCells,
            widths: widths
        }
    }
}

export const createArrayInfo=():ITableManager=>{ return new TableManager()}