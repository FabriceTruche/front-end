import {IField} from "./Field";
import {IMeasureValue} from "./MeasureValue";
import {ITcdManager} from "./TcdManager";
import {IMeasure} from "./Measure";
import {ITcdColumn} from "./TcdColumn";
import {_defaultRect, ICell, Rect, TypeCell} from "./Cell";
import {factory} from "../../../common/Factory";

export enum TcdMode {
    left,
    top
}
export interface ITcdViewManager<T> {
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

export class _TcdViewManager<T> implements ITcdViewManager<T> {

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
                width: 1,
                height: f.deep - adjustWithTotal
            }

            cellMap.set(f,{...rect})
            spany += f.deep

            // traiter les sous-noeuds
            const nextStart: Rect = { x: rect.x+1, y: rect.y, width: 1, height: 1 }
            this.calculateFieldsCoordinatesCascade(nextStart, f.fields, cellMap, totalRoom)
        })
    }

    /**
     *
     * @param rootField
     * @param cellMap
     * @param totalRoom
     * @private
     */
    private calculateFieldsCoord(rootField: IField<T>, cellMap: Map<IField<T>,Rect>, totalRoom: number): void {
        const startCoord: Rect = {x: 0, y: 0, width: 1, height: 1}
        this.calculateFieldsCoordinatesCascade(startCoord, rootField.fields, cellMap, totalRoom)
    }

    /**
     *
     * @private
     */
    private calculateGrandTotalabel() {
        // grand total row
        const rowRect: Rect = {
            x: 0,
            y: this.tcd.rowTreeField.deep,
            width: this.tcd.rowAxis.length,
            height: 1
        }
        this._rowsCellMap.set(this.tcd.rowTreeField,{...rowRect})

        // grand total col
        const colRect: Rect = {
            x: 0,
            y: this.tcd.colTreeField.deep,
            width: this.tcd.colAxis.length,
            height: this.nbMeasures
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

            this._measuresCellMap.set(m,{x,y,width:1,height:1})
        })
    }

    /**
     *
     * @param measures
     * @private
     */
    private calculateLabelTotalsCoord(measures: IMeasureValue<T>[]): void {
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
                    width: this.tcd.rowAxis.length - rowCoord.x,
                    height: 1
                }
                const cell:ICell = factory.createCell(TypeCell.labelTotalRow, rect,`TOTAL '${m.rowField.value}'`)
                this._totalRowsCell.push(cell)
            }

            // on ne traite ici QUE Les lables des totaux 'TOTAL ...'
            if (colTotal) {
                const rect: Rect = {
                    x: colCoord.x + m.colField.deep -  this.nbMeasures,
                    y: colCoord.y + m.measure.index,
                    width: this.nbMeasures,
                    height: this.tcd.colAxis.length - colCoord.y
                }
                const cell:ICell = factory.createCell(TypeCell.labelTotalCol, rect,`TOTAL '${m.colField.value}'`)
                this._totalColsCell.push(cell)
            }
        })
    }

    /**
     *
     * @private
     */
    private convertCoordToArray() {

        const toArray = <K extends {
            displayValue: () => string
        }, >(m: Map<K, Rect>, pred: (key: K) => TypeCell): ICell[] => {
            const cells: ICell[] = []
            m.forEach((v: Rect, k: K) => {
                const typeCell: TypeCell = pred(k)
                const cell: ICell = factory.createCell(typeCell, v, k.displayValue())
                cells.push(cell)
            })
            return cells
        }
        this._rowsCell = toArray(this._rowsCellMap, (key: IField<T>) => {
            if (key.isRoot) return TypeCell.labelGrandTotalRow
            return TypeCell.row
        })
        this._colsCell = toArray(this._colsCellMap, (key: IField<T>) => {
            if (key.isRoot) return TypeCell.labelGrandTotalCol
            return TypeCell.col
        })
        this._measuresValueCell = toArray(this._measuresCellMap,
            (key: IMeasureValue<T>) => {
                if (key.rowField.isRoot && key.colField.isRoot)
                    return TypeCell.grandTotal

                if (key.rowField.isRoot || key.colField.isRoot)
                    return TypeCell.grandTotalMeasure

                if (key.isTotal()) return TypeCell.totalMeasure
                if (key.isColTotal()) return TypeCell.totalColMeasure
                if (key.isRowTotal()) return TypeCell.totalRowMeasure
                return TypeCell.measure
            })
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
            const t2=v.width
            v.width=v.height
            v.height=t2
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
        tcdManager.rowAxis.forEach((axis: ITcdColumn, index: number)=>{
            const rect: Rect = {
                x: index,
                y: 0,
                width: 1,
                height: 1
            }
            const cell: ICell = factory.createCell(TypeCell.headerRow,rect,axis.label)
            this._headerRowsCell.push(cell)
        })

        // 2. col
        tcdManager.colAxis.forEach((axis: ITcdColumn, index: number)=>{
            const rect: Rect = {
                x: 0,
                y: index,
                width: 1,
                height: 1
            }
            const cell: ICell = factory.createCell(TypeCell.headerCol,rect,axis.label)
            this._headerColsCell.push(cell)
        })

        // 3. measure
        for(let i=0; i<nbColTerminals; i++)
        {
            tcdManager.measures.forEach((m: IMeasure)=> {
                const rect: Rect = {
                    x: (i*this.nbMeasures) + m.index,
                    y: 0,
                    width: 1,
                    height: 1
                }
                const cell: ICell = factory.createCell(TypeCell.headerMeasure,rect,m.displayValue())
                this._measuresCell.push(cell)
            })
        }
    }

    /**
     *
     * @private
     */
    private calculateCoords(tcdManager: ITcdManager<T>) {
        // calculer les ccord à partir de start
        // 1. headers
        this._coordHeaderRows = {
            x: this._coordTcd.x,
            y: this._coordTcd.y + tcdManager.colAxis.length,
            width: 1,
            height: 1
        }
        this._coordHeaderCols = {
            x: this._coordTcd.x + tcdManager.rowAxis.length - 1,
            y: this._coordTcd.y,
            width: 1,
            height: 1
        }
        this._coordHeaderMeasures = {
            x: this._coordTcd.x + tcdManager.rowAxis.length,
            y: this._coordTcd.y + tcdManager.colAxis.length,
            width: 1,
            height: 1
        }

        // 2. data
        this._coordRows = {
            x: this._coordTcd.x,
            y: this._coordTcd.y + tcdManager.colAxis.length + 1,
            width: 1,
            height: 1
        }
        this._coordCols = {
            x: this._coordTcd.x + tcdManager.rowAxis.length,
            y: this._coordTcd.y,
            width: 1,
            height: 1
        }
        this._coordMeasures = {
            x: this._coordTcd.x + tcdManager.rowAxis.length,
            y: this._coordTcd.y + tcdManager.colAxis.length + 1,
            width: 1,
            height: 1
        }
    }

    /**
     *
     * @param tcdManager
     */
    public buildTcdView(tcdManager: ITcdManager<T>): void {
        this._tcdManager = tcdManager

        this.reset()

        // 1. calculate fields coord
        this.calculateFieldsCoord(tcdManager.rowTreeField, this._rowsCellMap,1)
        this.calculateFieldsCoord(tcdManager.colTreeField, this._colsCellMap,this.nbMeasures)
        this.calculateGrandTotalabel()
        this.transposeCols()

        // 2. calculate measures coord
        this.calculateMeasuresCoord(tcdManager.measuresValue)
        this.convertCoordToArray()

        // 3 .calculate totals coord
        this.calculateLabelTotalsCoord(tcdManager.measuresValue)

        // 4. entete des col
        this.calculateHeaderCoords(tcdManager, tcdManager.colsTerminalField.length)

        // 5. calculate coordinates for all parts
        this.calculateCoords(tcdManager)
    }

}
