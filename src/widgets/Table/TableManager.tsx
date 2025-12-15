import {ViewportTableInfoCell} from "./Table";
import {DisplayedCellData, IFormatter} from "./IFormatter";
import {CSSProperties} from "react";
import {IColumn} from "./Column";
import {AnyObject} from "../../common/common";
import {ITableData} from "./TableData";
import {factory} from "../../common/Factory";
import {helper} from "../../common/Helper";

export type TableDataView = {
    header: ViewportTableInfoCell[]
    body: ViewportTableInfoCell[]
    footer: ViewportTableInfoCell[]
    widths: AnyObject
    rowCount: number
}
export enum SortType {
    asc,
    desc,
    init,
    next
}
export interface ITableManager<T> {
    calcTableDataCellInfo(): TableDataView
    sort(colIndex: number, sortType?: SortType): void
    filter(text: string): void
    rowAt(rowIndex: number): T|null
    currentSort(): SortType
    currentSortedColIndex(): number
}
/**
 * porte la logique biz de la manipuation des doinnées de la table :
 * - tri
 * - filtre
 * - calcul des objets visuel de cellules
 * - ...
 *
 */
export class _TableManager<T> implements ITableManager<T>{

    private _currSortType: SortType
    private _currSortedColIndex: number = -1
    private _currentDataRows: T[]
    private _initialDataRows: T[]
    private readonly _dataSet: ITableData<T>
    private readonly _elementId: string

    public constructor(dataSet: ITableData<T>, elementId: string) {
        this._dataSet = dataSet
        this._initialDataRows = [...dataSet.data]
        this._currentDataRows = [...dataSet.data]
        this._elementId = elementId
        this._currSortType = SortType.init

        // à l'init, on calcul directement le tableau des éléments visuels
    }

    /**
     *
     */
    public currentSort(): SortType {
        return this._currSortType
    }

    /**
     *
     */
    public currentSortedColIndex(): number {
        return this._currSortedColIndex
    }

    /**
     *
     * @param rowIndex
     */
    public rowAt(rowIndex: number): T|null {
        if (rowIndex<this._currentDataRows.length) {
            return this._currentDataRows[rowIndex]
        }

        return null
    }

    /**
     * filter table data
     * le type next permet de passer au sens de tri suvant selon la séquence suivante : initial => asc => desc => initial => ...
     * @param colIndex
     * @param sortType
     */
    public sort(colIndex: number, sortType: SortType = SortType.next): void {
        if (colIndex>=this._dataSet.columns.length)
            throw new Error('Index de colonne invalide')

        let res: number = 0

        if (this._currSortedColIndex !== colIndex) {

            this._currSortType = SortType.asc
            this._currSortedColIndex = colIndex
            res = 1

        } else {

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

        }

        const colName: keyof T = this._dataSet.columns[this._currSortedColIndex].name as keyof T

        // calcul du tri des données d'origine
        //
        this._currentDataRows = [...this._initialDataRows]

        if (res !== 0)
            this._currentDataRows.sort((item1: T, item2: T) => {
                if (item1[colName] === null) return -res
                if (item2[colName] === null) return res

                if (item1[colName] < item2[colName]) return -res
                if (item1[colName] > item2[colName]) return res

                return 0
            })
    }

    /**
     * filtre les lignes de données selon un critère simple (regexp)
     * le filtre se fait sur chacun des colonnes.
     * Dés que la correspondance est trouvée, la ligne est remontée
     * @param text
     */
    public filter(text: string): void {

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
        } else {
            this._currentDataRows = [...this._dataSet.data]
        }

        // le tri revient au tableau initial (qu'il soit effectivement trié ou pas)
        this._initialDataRows = [...this._currentDataRows]
        this._currSortType = SortType.init
    }

    /**
     *
     */
    public calcTableDataCellInfo(): TableDataView {
        const bodyCells: ViewportTableInfoCell[] = []
        const headerCells: ViewportTableInfoCell[] = []
        const footerCells: ViewportTableInfoCell[] = []
        const mapCol: string[] = []
        const lenCols = this._dataSet.columns.length
        const rowCount = this._currentDataRows.length
        const rowStart = 1

        // const viewCollection: ITableData<{[prop: string]: string}> = {
        //     data: [],
        //     columns: this._dataSet.columns
        // }
        const viewCollection: ITableData<{[prop: string]: string}> = factory.createTableData([],this._dataSet.columns)

        // ajouter un element de cellule
        const addItem = (
            array: ViewportTableInfoCell[],
            column: IColumn|null, // null si cell non visuelle
            item: ViewportTableInfoCell,
        ): string => {
            const id: string = helper.genKey()

            let clsName: string|undefined = item.className
            let style: CSSProperties|undefined = {}
            let value: any = ""

            if (column) {
                const formatter: IFormatter = column.getFormatter(item.typeCell) //  DataFormatter.getFormatter(column)
                const dataCell: DisplayedCellData = formatter.format(item.value)

                clsName = helper.mergeClassName(clsName, dataCell.className)
                style = helper.mergeCSSProperties(style, dataCell.style)
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
        this._dataSet.columns.forEach((column: IColumn, indexCol: number) => {

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
                    value: this._dataSet.getTotals(column.name)
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
            this._dataSet.columns.forEach((column: IColumn, indexCol: number) => {

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
            widths: helper.getMaxWidthFromCollectionById(viewCollection, this._elementId, 30),
            rowCount: this._currentDataRows.length
        }
    }
}
