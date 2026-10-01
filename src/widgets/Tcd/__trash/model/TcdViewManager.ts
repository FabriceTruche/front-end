export {}

// import {IField} from "./Field";
// import {IMeasureValue} from "./MeasureValue";
// import {ITcdManager} from "./TcdManager";
// import {IMeasure} from "./Measure";
// import {ITcdColumn} from "./TcdColumn";
// import {_defaultRect, createCell, ITcdCell, Rect, TypeCell} from "./Cell";
//
// export enum TcdMode {
//     left,
//     top
// }
// export interface ITcdViewManager<T> {
//     rowsCell: ITcdCell[]
//     colsCell: ITcdCell[]
//     measuresValueCell: ITcdCell[]
//     headerRowsCell: ITcdCell[]
//     headerColsCell: ITcdCell[]
//     measuresCell: ITcdCell[]
//     totalRowsCell: ITcdCell[]
//     totalColsCell: ITcdCell[]
//     coordTcd: Rect
//     coordRows: Rect
//     coordCols: Rect
//     coordMeasures: Rect
//     coordHeaderRows: Rect
//     coordHeaderCols: Rect
//     coordHeaderMeasures: Rect
//
//     buildTcdView(tcdManager: ITcdManager<T>): void
//     // getAllCells(): ICell[]
// }
//
// export class _TcdViewManager<T> implements ITcdViewManager<T> {
//
//     private _headerRowsCell: ITcdCell[] = []
//     private _headerColsCell: ITcdCell[] = []
//     private _measuresCell: ITcdCell[] = []
//     private _rowsCell: ITcdCell[] = []
//     private _colsCell: ITcdCell[] = []
//     private _measuresValueCell: ITcdCell[] = []
//     private _totalRowsCell: ITcdCell[] = []
//     private _totalColsCell: ITcdCell[] = []
//     private _coordTcd: Rect= _defaultRect
//     private _coordRows: Rect= _defaultRect
//     private _coordCols: Rect= _defaultRect
//     private _coordMeasures: Rect= _defaultRect
//     private _coordHeaderRows: Rect= _defaultRect
//     private _coordHeaderCols: Rect= _defaultRect
//     private _coordHeaderMeasures: Rect= _defaultRect
//
//     // calcul des Coord à travers les map
//     private _rowsCellMap: Map<IField<T>,Rect> = new Map<IField<T>, Rect>()
//     private _colsCellMap: Map<IField<T>,Rect> = new Map<IField<T>, Rect>()
//     private _measuresCellMap: Map<IMeasureValue<T>, Rect> = new Map<IMeasureValue<T>, Rect>()
//
//     // tcd manager du build en cours
//     private _tcdManager: ITcdManager<T>|null = null
//
//     public get rowsCell(): ITcdCell[] { return this._rowsCell }
//     public get colsCell(): ITcdCell[] { return this._colsCell }
//     public get headerRowsCell(): ITcdCell[] { return this._headerRowsCell }
//     public get headerColsCell(): ITcdCell[] { return this._headerColsCell }
//     public get measuresCell(): ITcdCell[]  { return this._measuresCell }
//     public get measuresValueCell(): ITcdCell[] { return this._measuresValueCell }
//     public get totalRowsCell(): ITcdCell[] { return this._totalRowsCell }
//     public get totalColsCell(): ITcdCell[] { return this._totalColsCell }
//     public get coordTcd(): Rect { return this._coordTcd }
//     public get coordRows(): Rect { return this._coordRows }
//     public get coordCols(): Rect { return this._coordCols }
//     public get coordMeasures(): Rect { return this._coordMeasures }
//     public get coordHeaderRows(): Rect { return this._coordHeaderRows }
//     public get coordHeaderCols(): Rect { return this._coordHeaderCols }
//     public get coordHeaderMeasures(): Rect { return this._coordHeaderMeasures }
//
//     private get nbMeasures(): number { return this.tcd.measures.length }
//     private get tcd(): ITcdManager<T> { return this._tcdManager as ITcdManager<T> }
//
//     private reset(): void {
//         this._rowsCellMap.clear()
//         this._colsCellMap.clear()
//         this._measuresCellMap.clear()
//         this._rowsCell = []
//         this._colsCell = []
//         this._headerRowsCell = []
//         this._headerColsCell = []
//         this._measuresCell = []
//         this._measuresValueCell = []
//         this._totalRowsCell = []
//         this._totalColsCell = []
//         this._coordTcd = _defaultRect
//         this._coordRows = _defaultRect
//         this._coordCols = _defaultRect
//         this._coordMeasures = _defaultRect
//         this._coordHeaderRows = _defaultRect
//         this._coordHeaderCols = _defaultRect
//         this._coordHeaderMeasures = _defaultRect
//     }
//
//     /**
//      *
//      * @param start
//      * @param fields
//      * @param cellMap
//      * @param totalRoom
//      * @private
//      */
//     private calculateFieldsCoordinatesCascade(
//         start: Rect,
//         fields: IField<T>[],
//         cellMap: Map<IField<T>,Rect>,
//         totalRoom: number
//     ): void {
//         let spany: number = 0
//
//         fields.forEach((f: IField<T>) => {
//             // si colonne total, enlever une ligne pour le ySpan
//             // enlever le nombre de measures pour les cols
//             const adjustWithTotal: number = f.column.total ? totalRoom : 0
//             const rect: Rect = {
//                 x: start.x,
//                 y: start.y + spany,
//                 xSpan: 1,
//                 ySpan: f.deep - adjustWithTotal
//             }
//
//             cellMap.set(f,{...rect})
//             spany += f.deep
//
//             // traiter les sous-noeuds
//             const nextStart: Rect = { x: rect.x+1, y: rect.y, xSpan: 1, ySpan: 1 }
//             this.calculateFieldsCoordinatesCascade(nextStart, f.fields, cellMap, totalRoom)
//         })
//     }
//
//     /**
//      *
//      * @param rootField
//      * @param startCoord
//      * @param cellMap
//      * @param totalRoom
//      * @private
//      */
//     private calculateFieldsCoord(rootField: IField<T>, startCoord: Rect, cellMap: Map<IField<T>,Rect>, totalRoom: number): void {
//         // const startCoord: Rect = {x: 0, y: 0, width: 1, height: 1}
//         this.calculateFieldsCoordinatesCascade(startCoord, rootField.fields, cellMap, totalRoom)
//     }
//
//     /**
//      *
//      * @private
//      */
//     private calculateGrandTotalabel() {
//         // GT ROW
//         const rowRect: Rect = {
//             x: this._coordRows.x,
//             y: this._coordRows.y + this.tcd.rowTreeField.deep,
//             xSpan: this.tcd.rowAxis.length,
//             ySpan: 1
//         }
//         this._rowsCellMap.set(this.tcd.rowTreeField,{...rowRect})
//
//         // GT COL
//         const colRect: Rect = {
//             x: this._coordCols.x,
//             y: this._coordCols.y + this.tcd.colTreeField.deep,
//             xSpan: this.tcd.colAxis.length,
//             ySpan: this.nbMeasures
//         }
//         this._colsCellMap.set(this.tcd.colTreeField,{...colRect})
//     }
//
//     /**
//      *
//      * @param measures
//      * @private
//      */
//     private calculateMeasuresCoord(measures: IMeasureValue<T>[]): void {
//         measures.forEach((m: IMeasureValue<T>) => {
//             const rowCoord: Rect = this._rowsCellMap.get(m.rowField) as Rect
//             const colCoord: Rect = this._colsCellMap.get(m.colField) as Rect
//
//             let x = 0 //this._coordMeasures.x
//             let y = 0 //this._coordMeasures.y
//
//             // si total => calcul différent des Coord
//             y += rowCoord.y
//             if (m.rowField.column.total) {
//                 y += m.rowField.deep - 1
//             }
//
//             x += colCoord.x + m.measure.index
//             if (m.colField.column.total) {
//                 x += (m.colField.deep - this.nbMeasures )
//             }
//
//             this._measuresCellMap.set(m,{x,y,xSpan:1,ySpan:1})
//         })
//     }
//
//     /**
//      *
//      * @param measures
//      * @private
//      */
//     private calculateLabelTotalsCoord(measures: IMeasureValue<T>[]): void {
//         measures.forEach((m: IMeasureValue<T>) => {
//
//             // on ne traite les libellés qQU'UNE fois pour toutes les measuesValues ==> sur le premier index des measuresValues
//             if (m.measure.index>0)
//                 return
//
//             const rowCoord: Rect = this._rowsCellMap.get(m.rowField) as Rect
//             const colCoord: Rect = this._colsCellMap.get(m.colField) as Rect
//
//             const rowTotal: boolean = m.rowField.column.total
//             const colTotal: boolean = m.colField.column.total
//
//             if (rowTotal) {
//                 const rect: Rect = {
//                     x: rowCoord.x,
//                     y: rowCoord.y + m.rowField.deep - 1,
//                     xSpan: this.tcd.rowAxis.length - rowCoord.x,
//                     ySpan: 1
//                 }
//                 const cell:ITcdCell = createCell(TypeCell.labelTotalRow, rect,`TOTAL '${m.rowField.value}'`)
//                 this._totalRowsCell.push(cell)
//             }
//
//             // on ne traite ici QUE Les lables des totaux 'TOTAL ...'
//             if (colTotal) {
//                 const rect: Rect = {
//                     x: colCoord.x + m.colField.deep -  this.nbMeasures,
//                     y: colCoord.y + m.measure.index,
//                     xSpan: this.nbMeasures,
//                     ySpan: this.tcd.colAxis.length - colCoord.y
//                 }
//                 const cell:ITcdCell = createCell(TypeCell.labelTotalCol, rect,`TOTAL '${m.colField.value}'`)
//                 this._totalColsCell.push(cell)
//             }
//         })
//     }
//
//     /**
//      *
//      * @private
//      */
//     private convertCoordToArray() {
//
//         const toArray = <K extends {
//             displayValue: () => string
//         }, >(m: Map<K, Rect>, pred: (key: K) => TypeCell): ITcdCell[] => {
//             const cells: ITcdCell[] = []
//             m.forEach((v: Rect, k: K) => {
//                 const typeCell: TypeCell = pred(k)
//                 const cell: ITcdCell = createCell(typeCell, v, k.displayValue())
//                 cells.push(cell)
//             })
//             return cells
//         }
//         this._rowsCell = toArray(this._rowsCellMap, (key: IField<T>) => {
//             if (key.isRoot) return TypeCell.labelGrandTotalRow
//             return TypeCell.row
//         })
//         this._colsCell = toArray(this._colsCellMap, (key: IField<T>) => {
//             if (key.isRoot) return TypeCell.labelGrandTotalCol
//             return TypeCell.col
//         })
//         this._measuresValueCell = toArray(this._measuresCellMap,
//             (key: IMeasureValue<T>) => {
//                 if (key.rowField.isRoot && key.colField.isRoot)
//                     return TypeCell.grandTotal
//
//                 if (key.rowField.isRoot || key.colField.isRoot)
//                     return TypeCell.grandTotalMeasure
//
//                 if (key.isTotal()) return TypeCell.totalMeasure
//                 if (key.isColTotal()) return TypeCell.totalColMeasure
//                 if (key.isRowTotal()) return TypeCell.totalRowMeasure
//                 return TypeCell.measure
//             })
//     }
//
//     /**
//      * spécial transposition for col coords
//      * @private
//      */
//     private transposeCols() {
//         this._colsCellMap.forEach((v: Rect) => {
//             const t=v.x
//             // noinspection JSSuspiciousNameCombination
//             v.x=v.y
//             v.y=t
//             const t2=v.xSpan
//             v.xSpan=v.ySpan
//             v.ySpan=t2
//         })
//     }
//
//     /**
//      *
//      * @private
//      * @param tcdManager
//      * @param nbColTerminals
//      */
//     private calculateHeaderCoords(tcdManager: ITcdManager<T>, nbColTerminals: number): void {
//         // 1. row
//         tcdManager.rowAxis.forEach((axis: ITcdColumn, index: number)=>{
//             const rect: Rect = {
//                 x: this._coordHeaderRows.x + index,
//                 y: this._coordHeaderRows.y,
//                 xSpan: 1,
//                 ySpan: 1
//             }
//             const cell: ITcdCell = createCell(TypeCell.headerRow,rect,axis.label)
//             this._headerRowsCell.push(cell)
//         })
//
//         // 2. col
//         tcdManager.colAxis.forEach((axis: ITcdColumn, index: number)=>{
//             const rect: Rect = {
//                 x: this._coordHeaderCols.x,
//                 y: this._coordHeaderCols.y + index,
//                 xSpan: 1,
//                 ySpan: 1
//             }
//             const cell: ITcdCell = createCell(TypeCell.headerCol,rect,axis.label)
//             this._headerColsCell.push(cell)
//         })
//
//         // 3. measure
//         for(let i=0; i<nbColTerminals; i++)
//         {
//             tcdManager.measures.forEach((m: IMeasure)=> {
//                 const rect: Rect = {
//                     x: this._coordHeaderMeasures.x + (i*this.nbMeasures) + m.index,
//                     y: this._coordHeaderMeasures.y,
//                     xSpan: 1,
//                     ySpan: 1
//                 }
//                 const cell: ITcdCell = createCell(TypeCell.headerMeasure,rect,m.displayValue())
//                 this._measuresCell.push(cell)
//             })
//         }
//     }
//
//     /**
//      *
//      * @private
//      */
//     private calculateOrigins(tcdManager: ITcdManager<T>) {
//         // calculer les ccord à partir de start
//         // 1. headers
//         this._coordHeaderRows = {
//             x: this._coordTcd.x,
//             y: this._coordTcd.y + tcdManager.colAxis.length,
//             xSpan: 1,
//             ySpan: 1
//         }
//         this._coordHeaderCols = {
//             x: this._coordTcd.x + tcdManager.rowAxis.length - 1,
//             y: this._coordTcd.y,
//             xSpan: 1,
//             ySpan: 1
//         }
//         this._coordHeaderMeasures = {
//             x: this._coordTcd.x + tcdManager.rowAxis.length,
//             y: this._coordTcd.y + tcdManager.colAxis.length,
//             xSpan: 1,
//             ySpan: 1
//         }
//
//         // 2. data
//         this._coordRows = {
//             x: this._coordTcd.x,
//             y: this._coordTcd.y + tcdManager.colAxis.length + 1,
//             xSpan: 1,
//             ySpan: 1
//         }
//         // ATTENTION : x/y swappé ici pour le transpose des col
//         this._coordCols = {
//             x: this._coordTcd.x,
//             y: this._coordTcd.y + tcdManager.rowAxis.length,
//             xSpan: 1,
//             ySpan: 1
//         }
//         this._coordMeasures = {
//             x: this._coordTcd.x + tcdManager.rowAxis.length,
//             y: this._coordTcd.y + tcdManager.colAxis.length + 1,
//             xSpan: 1,
//             ySpan: 1
//         }
//     }
//
//     /**
//      *
//      * @param tcdManager
//      */
//     public buildTcdView(tcdManager: ITcdManager<T>): void {
//         this._tcdManager = tcdManager
//
//         this.reset()
//
//         // 0. calculate coordinates for all parts
//         this.calculateOrigins(tcdManager)
//
//         // 1. calculate fields coord
//         this.calculateFieldsCoord(tcdManager.rowTreeField, this._coordRows, this._rowsCellMap,1)
//         this.calculateFieldsCoord(tcdManager.colTreeField, this._coordCols, this._colsCellMap,this.nbMeasures)
//         this.calculateGrandTotalabel()
//         this.transposeCols()
//
//         // 2. calculate measures coord
//         this.calculateMeasuresCoord(tcdManager.measuresValue)
//         this.convertCoordToArray()
//
//         // 3 .calculate totals coord
//         this.calculateLabelTotalsCoord(tcdManager.measuresValue)
//
//         // 4. entete des col
//         this.calculateHeaderCoords(tcdManager, tcdManager.colsTerminalField.length)
//     }
//
//     /**
//      *
//      */
//     // public getAllCells(): ICell[] {
//     //
//     //     const moveRect=(cells: ICell[], r: Rect): ICell[] => {
//     //         return cells.map((c: ICell) => createCell(
//     //             c.typeCell,
//     //             {
//     //                 x: c.rect.x + r.x,
//     //                 y: c.rect.y + r.y,
//     //                 width: c.rect.width,
//     //                 height: c.rect.height
//     //             },
//     //             c.value
//     //         ))
//     //     }
//     //
//     //     const startHeaderRow: Rect = this.coordHeaderRows;
//     //     const startHeaderCol: Rect = this.coordHeaderCols;
//     //     const startHeaderMeasure: Rect = this.coordHeaderMeasures;
//     //     const startRow: Rect = this.coordRows;
//     //     const startCol: Rect = this.coordCols;
//     //     const startMeasure: Rect = this.coordMeasures;
//     //
//     //     return [
//     //         ...moveRect(this.headerRowsCell,startHeaderRow),
//     //         ...moveRect(this.headerColsCell,startHeaderCol),
//     //         ...moveRect(this.measuresCell,startHeaderMeasure),
//     //         ...moveRect(this.rowsCell,startRow),
//     //         ...moveRect(this.totalRowsCell,startRow),
//     //         ...moveRect(this.colsCell,startCol),
//     //         ...moveRect(this.totalColsCell,startCol),
//     //         ...moveRect(this.measuresValueCell,startMeasure),
//     //     ]
//     // }
// }
// export function createTcdViewManager<T>(): ITcdViewManager<T> {
//     return new _TcdViewManager<T>()
// }
