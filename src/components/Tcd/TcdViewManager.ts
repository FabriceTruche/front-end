import {IField} from "./Field";
import {IMeasureValue} from "./MeasureValue";
import {ITcdManager} from "./TcdManager";
import {IMeasure} from "./Measure";
import {IColumn} from "../common/Column";
import {_defaultRect, Rect} from "../common/Rect";
import {ICell, TypeCell} from "../common/Cell";
import {_GridViewManager, IGridViewManager} from "../common/GridViewManager";

// export enum TcdMode {
//     left,
//     top
// }
export interface ITcdViewManager<T> extends IGridViewManager {
    // ---- from IGridViewManager
    maxY: number;
    cells: ICell[];
    columnsWidth: number[];

    rowsCell: ICell[]
    colsCell: ICell[]
    measuresValueCell: ICell[]
    headerRowsCell: ICell[]
    headerColsCell: ICell[]
    measuresCell: ICell[]
    totalRowsCell: ICell[]
    totalColsCell: ICell[]
    coordTcd: Rect
    coordRows: Rect
    coordCols: Rect
    coordMeasures: Rect
    coordHeaderRows: Rect
    coordHeaderCols: Rect
    coordHeaderMeasures: Rect
    buildTcdView(tcdManager: ITcdManager<T>): void
}

export class _TcdViewManager<T> extends _GridViewManager implements ITcdViewManager<T> {

    private _headerRowsCell: ICell[] = []
    private _headerColsCell: ICell[] = []
    private _measuresCell: ICell[] = []
    private _rowsCell: ICell[] = []
    private _colsCell: ICell[] = []
    private _measuresValueCell: ICell[] = []
    private _totalRowsCell: ICell[] = []
    private _totalColsCell: ICell[] = []
    private _coordTcd: Rect= _defaultRect
    private _coordRows: Rect= _defaultRect
    private _coordCols: Rect= _defaultRect
    private _coordMeasures: Rect= _defaultRect
    private _coordHeaderRows: Rect= _defaultRect
    private _coordHeaderCols: Rect= _defaultRect
    private _coordHeaderMeasures: Rect= _defaultRect
    // private _columnsWidth: number[] = []

    // calcul des Coord à travers les map
    private _rowsCellMap: Map<IField<T>,Rect> = new Map<IField<T>, Rect>()
    private _colsCellMap: Map<IField<T>,Rect> = new Map<IField<T>, Rect>()
    private _measuresCellMap: Map<IMeasureValue<T>, Rect> = new Map<IMeasureValue<T>, Rect>()

    // tcd manager du build en cours
    private _tcdManager: ITcdManager<T>|null = null

    public get rowsCell(): ICell[] { return this._rowsCell }
    public get colsCell(): ICell[] { return this._colsCell }
    public get headerRowsCell(): ICell[] { return this._headerRowsCell }
    public get headerColsCell(): ICell[] { return this._headerColsCell }
    public get measuresCell(): ICell[]  { return this._measuresCell }
    public get measuresValueCell(): ICell[] { return this._measuresValueCell }
    public get totalRowsCell(): ICell[] { return this._totalRowsCell }
    public get totalColsCell(): ICell[] { return this._totalColsCell }
    public get coordTcd(): Rect { return this._coordTcd }
    public get coordRows(): Rect { return this._coordRows }
    public get coordCols(): Rect { return this._coordCols }
    public get coordMeasures(): Rect { return this._coordMeasures }
    public get coordHeaderRows(): Rect { return this._coordHeaderRows }
    public get coordHeaderCols(): Rect { return this._coordHeaderCols }
    public get coordHeaderMeasures(): Rect { return this._coordHeaderMeasures }
    public get cells(): ICell[] {
        return [
            ...this._measuresCell,
            ...this._measuresValueCell,
            ...this._totalRowsCell,
            ...this._totalColsCell,
            ...this._rowsCell,
            ...this._colsCell,
            ...this._headerRowsCell,
            ...this._headerColsCell,
        ]
    }
    // public get columnsWidth(): number[] { return this._columnsWidth }

    private get nbMeasures(): number { return this.tcd.measures.length }
    private get tcd(): ITcdManager<T> { return this._tcdManager as ITcdManager<T> }

    private reset(): void {
        this._rowsCellMap.clear()
        this._colsCellMap.clear()
        this._measuresCellMap.clear()
        this._rowsCell = []
        this._colsCell = []
        this._headerRowsCell = []
        this._headerColsCell = []
        this._measuresCell = []
        this._measuresValueCell = []
        this._totalRowsCell = []
        this._totalColsCell = []
        this._coordTcd = _defaultRect
        this._coordRows = _defaultRect
        this._coordCols = _defaultRect
        this._coordMeasures = _defaultRect
        this._coordHeaderRows = _defaultRect
        this._coordHeaderCols = _defaultRect
        this._coordHeaderMeasures = _defaultRect
        // this._columnsWidth = []
    }

    /**
     *
     * @param start
     * @param fields
     * @param cellMap
     * @param totalRoom
     * @private
     */
    private calculateFieldsCoordinatesCascade(
        start: Rect,
        fields: IField<T>[],
        cellMap: Map<IField<T>,Rect>,
        totalRoom: number
    ): void {
        let spany: number = 0

        fields.forEach((f: IField<T>) => {
            // si colonne total, enlever une ligne pour le ySpan
            // enlever le nombre de measures pour les cols
            const adjustWithTotal: number = f.column.total ? totalRoom : 0
            const rect: Rect = {
                x: start.x,
                y: start.y + spany,
                xSpan: 1,
                ySpan: f.deep - adjustWithTotal
            }

            cellMap.set(f,{...rect})
            spany += f.deep

            // traiter les sous-noeuds
            const nextStart: Rect = { x: rect.x+1, y: rect.y, xSpan: 1, ySpan: 1 }
            this.calculateFieldsCoordinatesCascade(nextStart, f.fields, cellMap, totalRoom)
        })
    }

    /**
     *
     * @param rootField
     * @param startCoord
     * @param cellMap
     * @param totalRoom
     * @private
     */
    private calculateFieldsCoord(rootField: IField<T>, startCoord: Rect, cellMap: Map<IField<T>,Rect>, totalRoom: number): void {
        // const startCoord: Rect = {x: 0, y: 0, width: 1, height: 1}
        this.calculateFieldsCoordinatesCascade(startCoord, rootField.fields, cellMap, totalRoom)
    }

    /**
     *
     * @private
     */
    private calculateGrandTotalabel() {
        // GT ROW
        const rowRect: Rect = {
            x: this._coordRows.x,
            y: this._coordRows.y + this.tcd.rowTreeField.deep,
            xSpan: this.tcd.rowAxis.length,
            ySpan: 1
        }
        this._rowsCellMap.set(this.tcd.rowTreeField,{...rowRect})

        // GT COL
        const colRect: Rect = {
            x: this._coordCols.x,
            y: this._coordCols.y + this.tcd.colTreeField.deep,
            xSpan: this.tcd.colAxis.length,
            ySpan: this.nbMeasures
        }
        this._colsCellMap.set(this.tcd.colTreeField,{...colRect})
    }

    /**
     *
     * @param measures
     * @private
     */
    private calculateMeasuresCoord(measures: IMeasureValue<T>[]): void {
        measures.forEach((m: IMeasureValue<T>) => {
            const rowCoord: Rect = this._rowsCellMap.get(m.rowField) as Rect
            const colCoord: Rect = this._colsCellMap.get(m.colField) as Rect

            let x = 0
            let y = 0

            // si total => calcul différent des Coord
            y = rowCoord.y
            if (m.rowField.column.total) {
                y += m.rowField.deep - 1
            }

            x = colCoord.x + m.measure.index
            if (m.colField.column.total) {
                x += (m.colField.deep - this.nbMeasures )
            }

            this._measuresCellMap.set(m,{x,y,xSpan:1,ySpan:1})
        })
    }

    /**
     *
     * @private
     */
    private calculateLabelTotalsCoord() {

        // ROWS TOTAL LABEL RECT
        this._rowsCellMap.forEach((r: Rect, field: IField<T>) => {

            // on ne traite que les fields ayant un total et non terminal (de part la propriété)
            if (field.column.total && !field.isTerminal()) {
                const rect: Rect = {
                    x: r.x,
                    y: r.y + field.deep - 1,
                    xSpan: this.tcd.rowAxis.length - r.x,
                    ySpan: 1
                }
                const cell:ICell = this.registerCell(TypeCell.labelTotalRow, rect,`TOTAL '${field.value}'`,field.column, true)
                this._totalRowsCell.push(cell)
            }
        })

        // COLS TOTAL LABEL RECT
        this._colsCellMap.forEach((r: Rect, field: IField<T>) => {

            // on ne traite que les fields ayant un total et non terminal (de part la propriété)
            if (field.column.total && !field.isTerminal()) {
                const rect: Rect = {
                    x: r.x + field.deep -  this.nbMeasures,
                    y: r.y,
                    xSpan: this.nbMeasures,
                    ySpan: this.tcd.colAxis.length - r.y
                }
                const cell:ICell = this.registerCell(TypeCell.labelTotalRow, rect,`TOTAL '${field.value}'`,field.column, true)
                this._totalRowsCell.push(cell)
            }
        })
    }

    /**
     *
     * @param measures
     * @private
     */
    private calculateLabelTotalsCoord_OLD(measures: IMeasureValue<T>[]): void {
        measures.forEach((m: IMeasureValue<T>) => {

            // on ne traite les libellés qQU'UNE fois pour toutes les measuesValues ==> sur le premier index des measuresValues
            if (m.measure.index>0)
                return

            const rowCoord: Rect = this._rowsCellMap.get(m.rowField) as Rect
            const colCoord: Rect = this._colsCellMap.get(m.colField) as Rect

            const rowTotal: boolean = m.rowField.column.total
            const colTotal: boolean = m.colField.column.total

            if (rowTotal) {
                const rect: Rect = {
                    x: rowCoord.x,
                    y: rowCoord.y + m.rowField.deep - 1,
                    xSpan: this.tcd.rowAxis.length - rowCoord.x,
                    ySpan: 1
                }
                const cell:ICell = this.registerCell(TypeCell.labelTotalRow, rect,`TOTAL '${m.rowField.value}'`,m.rowField.column, true)
                this._totalRowsCell.push(cell)
            }

            // on ne traite ici QUE Les lables des totaux 'TOTAL ...'
            if (colTotal) {
                const rect: Rect = {
                    x: colCoord.x + m.colField.deep -  this.nbMeasures,
                    y: colCoord.y + m.measure.index,
                    xSpan: this.nbMeasures,
                    ySpan: this.tcd.colAxis.length - colCoord.y
                }
                const cell:ICell = this.registerCell(TypeCell.labelTotalCol, rect,`TOTAL '${m.colField.value}'`,m.colField.column, true)
                this._totalColsCell.push(cell)
            }
        })
    }

    /**
     *
     * @private
     */
    private convertCoordToArray() {

        const toArray = <K extends {value: any},>(
            m: Map<K, Rect>,
            predInfoCell: (key: K) => {typeCell: TypeCell, column: IColumn, isLabel: boolean}

        ): ICell[] => {
            const cells: ICell[] = []
            m.forEach((v: Rect, k: K) => {
                const { typeCell, column, isLabel } = predInfoCell(k)
                const cell: ICell = this.registerCell(typeCell, v, k.value, column,isLabel)
                cells.push(cell)
            })
            return cells
        }

        // ROWS CELL
        this._rowsCell = toArray(
            this._rowsCellMap,
            (key: IField<T>) => {
                return {
                    typeCell: (key.isRoot) ? TypeCell.labelGrandTotalRow : TypeCell.row,
                    column: key.column,
                    isLabel: false
                }
            },
        )

        // COLS CELL
        this._colsCell = toArray(
            this._colsCellMap,
            (key: IField<T>) => {
                return {
                    typeCell: (key.isRoot) ? TypeCell.labelGrandTotalCol : TypeCell.col,
                    column: key.column,
                    isLabel: false
                }
            }
        )

        // MEASURE VALUE
        this._measuresValueCell = toArray(
            this._measuresCellMap,
            (key: IMeasureValue<T>) => {
                let tc: TypeCell = TypeCell.none

                if (key.rowField.isRoot && key.colField.isRoot)
                    tc=TypeCell.grandTotal

                else if (key.rowField.isRoot || key.colField.isRoot)
                    tc = TypeCell.grandTotalMeasure

                else if (key.isTotal())
                    tc = TypeCell.totalMeasure

                else if (key.isColTotal())
                    tc = TypeCell.totalColMeasure

                else if (key.isRowTotal())
                    tc = TypeCell.totalRowMeasure

                else
                    tc = TypeCell.measure

                return {
                    typeCell: tc,
                    column: key.measure.column,
                    isLabel: false
                }
            },
        )
    }

    /**
     * spécial transposition for col coords
     * @private
     */
    private transposeCols() {
        this._colsCellMap.forEach((v: Rect) => {
            const t=v.x
            // noinspection JSSuspiciousNameCombination
            v.x=v.y
            v.y=t
            const t2=v.xSpan
            v.xSpan=v.ySpan
            v.ySpan=t2
        })
    }

    /**
     *
     * @private
     * @param tcdManager
     * @param nbColTerminals
     */
    private calculateHeaderCoords(tcdManager: ITcdManager<T>, nbColTerminals: number): void {
        // 1. row
        tcdManager.rowAxis.forEach((axis: IColumn, index: number)=>{
            const rect: Rect = {
                x: this._coordHeaderRows.x + index,
                y: this._coordHeaderRows.y,
                xSpan: 1,
                ySpan: 1
            }
            const cell: ICell = this.registerCell(TypeCell.headerRow,rect,axis.label,axis, true)
            this._headerRowsCell.push(cell)
        })

        // 2. col
        tcdManager.colAxis.forEach((axis: IColumn, index: number)=>{
            const rect: Rect = {
                x: this._coordHeaderCols.x,
                y: this._coordHeaderCols.y + index,
                xSpan: 1,
                ySpan: 1
            }
            const cell: ICell = this.registerCell(TypeCell.headerCol,rect,axis.label,axis, true)
            this._headerColsCell.push(cell)
        })

        // 3. measure
        if (tcdManager.colAxis.length>0)
            for(let i=0; i<nbColTerminals; i++)
            {
                tcdManager.measures.forEach((m: IMeasure)=> {
                    const rect: Rect = {
                        x: this._coordHeaderMeasures.x + (i*this.nbMeasures) + m.index,
                        y: this._coordHeaderMeasures.y,
                        xSpan: 1,
                        ySpan: 1
                    }
                    const cell: ICell = this.registerCell(TypeCell.headerMeasure,rect,m.column.name,m.column, true)
                    this._measuresCell.push(cell)
                })
            }
    }

    /**
     *
     * @private
     */
    private calculateOrigins(tcdManager: ITcdManager<T>) {
        // calculer les ccord à partir de start
        // 1. headers
        this._coordHeaderRows = {
            x: this._coordTcd.x,
            y: this._coordTcd.y + tcdManager.colAxis.length,
            xSpan: 1,
            ySpan: 1
        }
        this._coordHeaderCols = {
            x: this._coordTcd.x + tcdManager.rowAxis.length - 1,
            y: this._coordTcd.y,
            xSpan: 1,
            ySpan: 1
        }
        this._coordHeaderMeasures = {
            x: this._coordTcd.x + tcdManager.rowAxis.length,
            y: this._coordTcd.y + tcdManager.colAxis.length,
            xSpan: 1,
            ySpan: 1
        }

        // 2. data
        this._coordRows = {
            x: this._coordTcd.x,
            y: this._coordTcd.y + tcdManager.colAxis.length + 1,
            xSpan: 1,
            ySpan: 1
        }
        // ATTENTION : x/y swappé ici pour le transpose des col
        this._coordCols = {
            x: this._coordTcd.x,
            y: this._coordTcd.y + tcdManager.rowAxis.length,
            xSpan: 1,
            ySpan: 1
        }
        this._coordMeasures = {
            x: this._coordTcd.x + tcdManager.rowAxis.length,
            y: this._coordTcd.y + tcdManager.colAxis.length + 1,
            xSpan: 1,
            ySpan: 1
        }
    }

    /**
     *
     * @private
     */
    // private calculateColumnsWidth(tcd: ITcdManager<T>) {
    //     //row cols
    //     tcd.rowAxis.forEach((c: IColumn) => {
    //         this._columnsWidth.push(c.width)
    //     })
    //
    //     // all measures includes GT
    //     tcd.colsTerminalField.forEach(()=>{
    //         tcd.measures.forEach((m: IMeasure) => {
    //             this._columnsWidth.push(m.column.width)
    //         })
    //     })
    // }

    /**
     *
     * @param tcdManager
     */
    public buildTcdView(tcdManager: ITcdManager<T>): void {
        this._tcdManager = tcdManager

        // reset all prévious data
        this.reset()

        // 0. calculate coordinates for all parts
        this.calculateOrigins(tcdManager)

        // 1. calculate fields coord
        this.calculateFieldsCoord(tcdManager.rowTreeField, this._coordRows, this._rowsCellMap,1)
        this.calculateFieldsCoord(tcdManager.colTreeField, this._coordCols, this._colsCellMap,this.nbMeasures)
        this.calculateGrandTotalabel()
        this.transposeCols()

        // 2. calculate measures coord
        this.calculateMeasuresCoord(tcdManager.measuresValue)
        this.convertCoordToArray()

        // 3 .calculate totals coord
        this.calculateLabelTotalsCoord()

        // 4. entete des col
        this.calculateHeaderCoords(tcdManager, tcdManager.colsTerminalField.length)

        // 5. calculate viewColumns
        // this.calculateColumnsWidth(tcdManager)
    }
}

export function createTcdViewManager<T>(): ITcdViewManager<T> {
    return new _TcdViewManager<T>()
}
