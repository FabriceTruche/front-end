import {ViewportTableInfoCell} from "./Table";
import {dataHelper} from "../../helper/DataHelper";
import {uiHelper} from "../../helper/UIHelper";
import {DisplayedCellData, IFormatter} from "./IFormatter";
import {CSSProperties} from "react";
import {Column} from "./Column";
import {TableData} from "./TableData";
import {AnyObject} from "../../common/common";
import {DataFormatter} from "./DataFormatter";

export type TableDataView = {
    header: ViewportTableInfoCell[]
    body: ViewportTableInfoCell[]
    footer: ViewportTableInfoCell[]
    widths: AnyObject
}
export enum SortType {
    asc,
    desc,
    init,
    next
}
export interface ITableManager<T> {
    calcTableDataCellInfo(): TableDataView
    sort(colIndex: number, sortType?: SortType): TableDataView
    filter(text: string): TableDataView
    rowAt(index: number): T|null
}
export function createTableManager<T>(data: TableData<T>, elementId: string):ITableManager<T> {
    return new TableManager<T>(data, elementId)
}

/**
 * porte la logique biz de la manipuation des doinnées de la table :
 * - tri
 * - filtre
 * - calcul des objets visuel de cellules
 * - ...
 *
 */
class TableManager<T> implements ITableManager<T>{

    private _currSortType: SortType
    private _currentDataRows: T[]
    private readonly _dataSet: TableData<T>
    private readonly _elementId: string

    public constructor(initialDataSet: TableData<T>, elementId: string) {
        this._dataSet = initialDataSet
        this._currentDataRows = [...initialDataSet.data]
        this._elementId = elementId
        this._currSortType = SortType.init

        // à l'init, on calcul directement le tableau des éléments visuels
    }

    /**
     *
     * @param index
     */
    public rowAt(index: number): T|null {
        if (index<this._currentDataRows.length) {
            return this._currentDataRows[index]
        }

        return null
    }

    /**
     * filter table data
     * le type next permet de passer au sens de tri suvant selon la séquence suivante : initial => asc => desc => initial => ...
     * @param colIndex
     * @param sortType
     */
    public sort(colIndex: number, sortType: SortType = SortType.next): TableDataView {
        if (colIndex>=this._dataSet.columns.length)
            throw new Error('Index de colonne invalide')

        const colName: keyof T = this._dataSet.columns[colIndex].name as keyof T
        let res: number = 0

        switch (sortType) {
            case SortType.init:
                this._currSortType = SortType.init
                res = 0
                break; //return [...this._initialRows.data]

            case SortType.next:
                if (this._currSortType===SortType.asc) {
                    this._currSortType = SortType.desc
                    res = -1
                }
                else if (this._currSortType===SortType.desc) {
                    this._currSortType = SortType.init
                    res = 0
                    // return [...this._initialRows.data]
                }
                else if (this._currSortType===SortType.init) {
                    this._currSortType = SortType.asc
                    res = 1
                }
                break;
            default:
                break;
        }

        // calcul du tri des données d'origine
        //
        this._currentDataRows = [...this._dataSet.data]

        if (res !== 0)
            this._currentDataRows.sort((item1: T, item2: T) => {
                if (item1[colName] === null) return -res
                if (item2[colName] === null) return res

                if (item1[colName] < item2[colName]) return -res
                if (item1[colName] > item2[colName]) return res

                return 0
            })

        // calcul des donénes visuelles
        //
        return this.calcTableDataCellInfo()
    }

    /**
     * filtre les lignes de données selon un critère simple (regexp)
     * le filtre se fait sur chacun des colonnes.
     * Dés que la correspondance est trouvée, la ligne est remontée
     * @param text
     */
    public filter(text: string): TableDataView {

        if (text !== "") {

            const re = new RegExp(text, 'i')

            this._currentDataRows = this._dataSet.data.filter((row: T) => {
                let isValid: boolean = false

                for (const c of this._dataSet.columns) {
                    const value: any = row[c.name as keyof T]

                    if (value) {
                        const valueStr: string = value.toString()
                        if (re.test(valueStr)) {
                            isValid = true
                            break
                        }
                    }
                }
                return isValid
            })
        }

        // retourner le tableaux des éléments visuels
        //
        return this.calcTableDataCellInfo()
    }

    /**
     *
     * @param rows
     * @param elementId
     */
    public calcTableDataCellInfo(): TableDataView {
        const bodyCells: ViewportTableInfoCell[] = []
        const headerCells: ViewportTableInfoCell[] = []
        const footerCells: ViewportTableInfoCell[] = []
        const mapCol: string[] = []
        const lenCols = this._dataSet.columns.length
        const rowCount = this._dataSet.data.length
        const rowStart = 1

        const viewCollection: TableData<{[prop: string]: string}> = {
            data: [],
            columns: this._dataSet.columns
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
        this._dataSet.columns.forEach((column: Column, indexCol: number) => {

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
                    className: "array-footer",
                    typeCell: "footer",
                    value: (this._dataSet.totals===undefined) ? undefined : this._dataSet.totals[column.name]
                })

        })


        this._currentDataRows.forEach((valueRow: T, indexRow: number) => {

            // 3. lignes de mouse-hover
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
            this._dataSet.columns.forEach((column: Column, indexCol: number) => {

                addItem(
                    bodyCells,
                    column,
                    {   id: "",
                        value: valueRow[column.name as keyof T],
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

        return {
            body: bodyCells,
            header: headerCells,
            footer: footerCells,
            widths: uiHelper.getMaxWidthFromCollectionById(viewCollection, this._elementId, 25)
        }
    }
}
