import {IField} from "./Field";
import {IMeasureValue} from "./MeasureValue";
import {ITcdManager} from "./TcdManager";
import {Cell} from "./TcdBlock";
import {IMeasure} from "./Measure";

// type MapField<T> = Map<IField<T>,Coord>
// type MapMeasureValue<T> = Map<IMeasureValue<T>,Coord>

export type Coord = { x: number, y: number }
export enum TcdMode {
    left,
    top
}
export interface ITcdViewManager<T> {
    rowsCell: Cell<IField<T>>[] // MapField<T>
    colsCell: Cell<IField<T>>[] // MapField<T>
    measuresCell: Cell<IMeasure>[]
    measuresValueCell: Cell<IMeasureValue<T>>[] // MapMeasureValue<T>
    origin: Coord
    originRows: Coord
    originCols: Coord
    originMeasures: Coord
    headerOriginRows: Coord
    headerOriginCols: Coord
    headerMeasuresRows: Coord

    buildTcdView(tcdManager: ITcdManager<T>): void
}

export class _TcdViewManager<T> implements ITcdViewManager<T> {

    private static readonly _defaultCoord: Coord = {x: 0, y: 0};

    private _rowsCell: Cell<IField<T>>[] = []
    private _colsCell: Cell<IField<T>>[] = []
    private _measuresCell: Cell<IMeasure>[] = []
    private _measuresValueCell: Cell<IMeasureValue<T>>[] = []
    private _origin: Coord= _TcdViewManager._defaultCoord
    private _originRows: Coord= _TcdViewManager._defaultCoord
    private _originCols: Coord= _TcdViewManager._defaultCoord
    private _originMeasures: Coord= _TcdViewManager._defaultCoord
    private _headerOriginRows: Coord= _TcdViewManager._defaultCoord
    private _headerOriginCols: Coord= _TcdViewManager._defaultCoord
    private _headerMeasuresRows: Coord= _TcdViewManager._defaultCoord

    // calcul des Coord à travers les map
    private _rowsCellMap: Map<IField<T>,Coord> = new Map<IField<T>, Coord>()
    private _colsCellMap: Map<IField<T>,Coord> = new Map<IField<T>, Coord>()
    private _measuresCellMap: Map<IMeasureValue<T>, Coord> = new Map<IMeasureValue<T>, Coord>()

    public get rowsCell(): Cell<IField<T>>[] { return this._rowsCell }
    public get colsCell(): Cell<IField<T>>[] { return this._colsCell }
    public get measuresCell(): Cell<IMeasure>[] { return this._measuresCell }
    public get measuresValueCell(): Cell<IMeasureValue<T>>[] { return this._measuresValueCell }
    public get origin(): Coord { return this._origin }
    public get originRows(): Coord { return this._originRows }
    public get originCols(): Coord { return this._originCols }
    public get originMeasures(): Coord { return this._originMeasures }
    public get headerOriginRows(): Coord { return this._headerOriginRows }
    public get headerOriginCols(): Coord { return this._headerOriginCols }
    public get headerMeasuresRows(): Coord { return this._headerMeasuresRows }

    private reset(): void {
        this._rowsCellMap.clear()
        this._colsCellMap.clear()
        this._measuresCellMap.clear()
        this._rowsCell = []
        this._colsCell = []
        this._measuresCell = []
        this._measuresValueCell = []
        this._origin = _TcdViewManager._defaultCoord
        this._originRows = _TcdViewManager._defaultCoord
        this._originCols = _TcdViewManager._defaultCoord
        this._originMeasures = _TcdViewManager._defaultCoord
        this._headerOriginRows = _TcdViewManager._defaultCoord
        this._headerOriginCols = _TcdViewManager._defaultCoord
        this._headerMeasuresRows = _TcdViewManager._defaultCoord
    }

    /**
     *
     * @param start
     * @param fields
     * @param cellMap
     * @private
     */
    private calculateFieldsCoordinatesCascade(start: Coord, fields: IField<T>[], cellMap: Map<IField<T>,Coord>): void {
        let spany: number = 0

        fields.forEach((f: IField<T>) => {
            const pos: Coord = {
                x:start.x,
                y:start.y + spany,
            }

            cellMap.set(f,{...pos})
            spany += f.deep

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
     * @private
     */
    private calculateMeasuresCoord(measures: IMeasureValue<T>[]): void {
        measures.forEach((m: IMeasureValue<T>) => {
            const rowCoord: Coord = this._rowsCellMap.get(m.rowField) as Coord
            const colCoord: Coord = this._colsCellMap.get(m.colField) as Coord

            this._measuresCellMap.set(m,{
                x: colCoord.x + m.measure.index,
                y: rowCoord.y,
            })
        })
    }

    /**
     *
     * @private
     */
    private convertCoordToArray() {

        const toArray = <K extends {displayValue: ()=>string},>(m: Map<K,Coord>) : Cell<K>[] => {
            const res: Cell<K>[] = []
            m.forEach((v: Coord, k: K)=>{
                res.push({
                    coord: {...v},
                    object: k
                })
            })
            return res
        }

        this._rowsCell = toArray(this._rowsCellMap)
        this._colsCell = toArray(this._colsCellMap)
        this._measuresValueCell = toArray(this._measuresCellMap)
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
        })
    }

    /**
     *
     * @param measures
     * @private
     */
    private calculateHeaderCols(measures: IMeasure[]) {
        this._colsCellMap.forEach((colCoord: Coord)=>{
            measures.forEach((m:IMeasure)=>{
                this._measuresCell.push({
                    object: m,
                    coord: {
                        y: 0,
                        x: colCoord.x + m.index,
                    }
                })
            })
        })
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
        this.calculateMeasuresCoord(tcdManager.measuresValue)
        this.convertCoordToArray()

        // 3. entete des col
        this.calculateHeaderCols(tcdManager.measures)
    }

}