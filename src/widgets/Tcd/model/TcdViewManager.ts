import {IField} from "./Field";
import {IMeasureValue} from "./MeasureValue";
import {ITcdManager} from "./TcdManager";
import {Cell} from "../component/TcdBlock";
import {IMeasure} from "./Measure";
import {ITcdColumn} from "./TcdColumn";

export type Coord = {
    x: number,
    y: number,
    xSpan?: number,
    ySpan?: number,
}
export enum TcdMode {
    left,
    top
}
export class DisplayValue {
    private readonly _label: string;
    constructor(label: string) {
        this._label = label;
    }
    public get label() { return this._label}

    public displayValue(): string { return this._label; }
}

export interface ITcdViewManager<T> {
    rowsCell: Cell<IField<T>>[] // MapField<T>
    colsCell: Cell<IField<T>>[] // MapField<T>
    measuresValueCell: Cell<IMeasureValue<T>>[] // MapMeasureValue<T>
    totalMeasuresValueCell: Cell<IMeasureValue<T>>[] // MapMeasureValue<T>
    headerRowsCell: Cell<DisplayValue>[]
    headerColsCell: Cell<DisplayValue>[]
    measuresCell: Cell<IMeasure>[]
    totalRowsCell: Cell<DisplayValue>[]
    totalColsCell: Cell<DisplayValue>[]
    posTcd: Coord
    posRows: Coord
    posCols: Coord
    posMeasures: Coord
    posHeaderRows: Coord
    posHeaderCols: Coord
    posHeaderMeasures: Coord

    buildTcdView(tcdManager: ITcdManager<T>): void
}

export class _TcdViewManager<T> implements ITcdViewManager<T> {

    private static readonly _defaultCoord: Coord = {x: 0, y: 0};

    private _headerRowsCell: Cell<DisplayValue>[] = []
    private _headerColsCell: Cell<DisplayValue>[] = []
    private _measuresCell: Cell<IMeasure>[] = []
    private _rowsCell: Cell<IField<T>>[] = []
    private _colsCell: Cell<IField<T>>[] = []
    private _measuresValueCell: Cell<IMeasureValue<T>>[] = []
    private _totalMeasuresValueCell: Cell<IMeasureValue<T>>[] = []
    private _totalRowsCell: Cell<DisplayValue>[] = []
    private _totalColsCell: Cell<DisplayValue>[] = []
    private _posTcd: Coord= _TcdViewManager._defaultCoord
    private _posRows: Coord= _TcdViewManager._defaultCoord
    private _posCols: Coord= _TcdViewManager._defaultCoord
    private _posMeasures: Coord= _TcdViewManager._defaultCoord
    private _posHeaderRows: Coord= _TcdViewManager._defaultCoord
    private _posHeaderCols: Coord= _TcdViewManager._defaultCoord
    private _posHeaderMeasures: Coord= _TcdViewManager._defaultCoord

    // calcul des Coord à travers les map
    private _rowsCellMap: Map<IField<T>,Coord> = new Map<IField<T>, Coord>()
    private _colsCellMap: Map<IField<T>,Coord> = new Map<IField<T>, Coord>()
    private _measuresCellMap: Map<IMeasureValue<T>, Coord> = new Map<IMeasureValue<T>, Coord>()

    public get rowsCell(): Cell<IField<T>>[] { return this._rowsCell }
    public get colsCell(): Cell<IField<T>>[] { return this._colsCell }
    public get headerRowsCell(): Cell<DisplayValue>[] { return this._headerRowsCell }
    public get headerColsCell(): Cell<DisplayValue>[] { return this._headerColsCell }
    public get measuresCell(): Cell<IMeasure>[] { return this._measuresCell }
    public get measuresValueCell(): Cell<IMeasureValue<T>>[] { return this._measuresValueCell }
    public get totalMeasuresValueCell(): Cell<IMeasureValue<T>>[] { return this._totalMeasuresValueCell  }
    public get totalRowsCell(): Cell<DisplayValue>[] { return this._totalRowsCell }
    public get totalColsCell(): Cell<DisplayValue>[] { return this._totalColsCell }
    public get posTcd(): Coord { return this._posTcd }
    public get posRows(): Coord { return this._posRows }
    public get posCols(): Coord { return this._posCols }
    public get posMeasures(): Coord { return this._posMeasures }
    public get posHeaderRows(): Coord { return this._posHeaderRows }
    public get posHeaderCols(): Coord { return this._posHeaderCols }
    public get posHeaderMeasures(): Coord { return this._posHeaderMeasures }

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
        this._totalMeasuresValueCell = []
        this._totalRowsCell = []
        this._totalColsCell = []
        this._posTcd = _TcdViewManager._defaultCoord
        this._posRows = _TcdViewManager._defaultCoord
        this._posCols = _TcdViewManager._defaultCoord
        this._posMeasures = _TcdViewManager._defaultCoord
        this._posHeaderRows = _TcdViewManager._defaultCoord
        this._posHeaderCols = _TcdViewManager._defaultCoord
        this._posHeaderMeasures = _TcdViewManager._defaultCoord
    }

    /**
     *
     * @param start
     * @param fields
     * @param cellMap
     * @private
     */
    private calculateFieldsCoordinatesCascade(
        start: Coord,
        fields: IField<T>[],
        cellMap: Map<IField<T>,Coord>,
    ): void {
        let spany: number = 0

        fields.forEach((f: IField<T>) => {
            const pos: Coord = {
                x:start.x,
                y:start.y + spany,
                xSpan: 1,
                ySpan: f.deep
            }

            cellMap.set(f,{...pos})
            spany += f.deep

            // noeud total
            // if (f.column.total) {
            //     cellMap.set(f,{...pos})
            // }

            // traiter les sous-noeuds
            const nextStart: Coord = { x: pos.x+1, y: pos.y }
            this.calculateFieldsCoordinatesCascade(nextStart, f.fields, cellMap)
        })
    }

    /**
     *
     * @param rootField
     * @param cellMap
     * @private
     */
    private calculateFieldsCoord(rootField: IField<T>, cellMap: Map<IField<T>,Coord>): void {
        const startCoord: Coord = { x:0, y:0 }
        this.calculateFieldsCoordinatesCascade(startCoord, rootField.fields, cellMap)
    }

    /**
     *
     * @param measures
     * @param nbMeasures
     * @private
     */
    private calculateMeasuresCoord(measures: IMeasureValue<T>[], nbMeasures: number): void {
        measures.forEach((m: IMeasureValue<T>) => {
            const rowCoord: Coord = this._rowsCellMap.get(m.rowField) as Coord
            const colCoord: Coord = this._colsCellMap.get(m.colField) as Coord

            let x = 0
            let y = 0

            // si total => calcul différent des Coord
            y = rowCoord.y
            if (m.rowField.column.total) {
                y += m.rowField.deep - 1
            }

            x = colCoord.x + m.measure.index
            if (m.colField.column.total) {
                x += (m.colField.deep - nbMeasures )
            }

            this._measuresCellMap.set(m,{x,y})
        })
    }

    /**
     *
     * @param measures
     * @param nbMeasures
     * @private
     */
    private calculateTotalsCoord(measures: IMeasureValue<T>[], nbMeasures: number): void {
        measures.forEach((m: IMeasureValue<T>) => {

            // on ne traite les libellés qQU'UNE fois pour toutes les measuesValues ==> sur le premier index des measuresValues
            if (m.measure.index>0)
                return

            const rowCoord: Coord = this._rowsCellMap.get(m.rowField) as Coord
            const colCoord: Coord = this._colsCellMap.get(m.colField) as Coord

            let xTotal = 0
            let yTotal = 0

            // si total => calcul différent des Coord
            if (m.rowField.column.total) {
                xTotal = rowCoord.x
                yTotal = rowCoord.y + m.rowField.deep - 1
                this._totalRowsCell.push({
                    object: new DisplayValue(`TOTAL '${m.rowField.value}'`),
                    coord: {
                        x: xTotal,
                        y: yTotal,
                    }
                })
            }

            if (m.colField.column.total) {
                // x += ((m.colField.deep) * (measures.length-1)) + m.measure.index
                xTotal = colCoord.x + m.colField.deep -  nbMeasures
                yTotal = colCoord.y + m.measure.index
                this._totalColsCell.push({
                    object: new DisplayValue(`TOTAL '${m.colField.value}'`),
                    coord: {
                        x: xTotal,
                        y: yTotal,
                    }
                })
            }
        })
    }

    /**
     *
     * @private
     */
    private convertCoordToArray() {

        const toArray = <K extends {displayValue: ()=>string},>(m: Map<K,Coord>, pred?: (key: K)=>boolean) : Cell<K>[] => {
            const res: Cell<K>[] = []
            m.forEach((v: Coord, k: K)=>{
                if (!pred || (pred && pred(k))) {
                    res.push({
                        coord: {...v},
                        object: k
                    })
                }
            })
            return res
        }

        this._rowsCell = toArray(this._rowsCellMap)
        this._colsCell = toArray(this._colsCellMap)
        this._measuresValueCell = toArray(this._measuresCellMap, (key: IMeasureValue<T>)=>!key.isTotalMeasure())
        this._totalMeasuresValueCell = toArray(this._measuresCellMap, (key: IMeasureValue<T>)=>key.isTotalMeasure())
    }

    /**
     * spécial transposition for col coords
     * @private
     */
    private transposeCols() {
        this._colsCellMap.forEach((v: Coord) => {
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
     * @param nbMeasures
     */
    private calculateHeaderCoords(tcdManager: ITcdManager<T>, nbColTerminals: number, nbMeasures: number): void {
        // 1. row
        tcdManager.rowAxis.forEach((axis: ITcdColumn, index: number)=>{
            this._headerRowsCell.push({
                object: new DisplayValue(axis.label),
                coord: {
                    y: 0,
                    x: index
                }
            })
        })

        // 2. col
        tcdManager.colAxis.forEach((axis: ITcdColumn, index: number)=>{
            this._headerColsCell.push({
                object: new DisplayValue(axis.label),
                coord: {
                    y: index,
                    x: 0
                }
            })
        })

        // 3. measure
        for(let i=0; i<nbColTerminals; i++)
        {
            tcdManager.measures.forEach((m: IMeasure)=> {
                this._measuresCell.push({
                    object: m,
                    coord: {
                        y: 0,
                        x: (i*nbMeasures) + m.index,
                    }
                })
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
        this._posHeaderRows = {
            x: this._posTcd.x,
            y: this._posTcd.y + tcdManager.colAxis.length
        }
        this._posHeaderCols = {
            x: this._posTcd.x + tcdManager.rowAxis.length - 1,
            y: this._posTcd.y
        }
        this._posHeaderMeasures = {
            x: this._posTcd.x + tcdManager.rowAxis.length,
            y: this._posTcd.y + tcdManager.colAxis.length
        }

        // 2. data
        this._posRows = {
            x: this._posTcd.x,
            y: this._posTcd.y + tcdManager.colAxis.length + 1
        }
        this._posCols = {
            x: this._posTcd.x + tcdManager.rowAxis.length,
            y: this._posTcd.y
        }
        this._posMeasures = {
            x: this._posTcd.x + tcdManager.rowAxis.length,
            y: this._posTcd.y + tcdManager.colAxis.length + 1
        }
    }

    /**
     *
     * @param tcdManager
     */
    public buildTcdView(tcdManager: ITcdManager<T>): void {

        this.reset()

        // 1. calculate fields coord
        this.calculateFieldsCoord(tcdManager.rowTreeField, this._rowsCellMap)
        this.calculateFieldsCoord(tcdManager.colTreeField, this._colsCellMap)
        this.transposeCols()

        // 2. calculate measures coord
        this.calculateMeasuresCoord(tcdManager.measuresValue, tcdManager.measures.length)
        this.convertCoordToArray()

        // 3 .calculate totals coord
        this.calculateTotalsCoord(tcdManager.measuresValue, tcdManager.measures.length)

        // 4. entete des col
        this.calculateHeaderCoords(tcdManager, tcdManager.colsTerminalField.length, tcdManager.measures.length)

        // 5. calculate coordinates for all parts
        this.calculateCoords(tcdManager)
    }

}





// type MapField<T> = Map<IField<T>,Coord>
// type MapMeasureValue<T> = Map<IMeasureValue<T>,Coord>
