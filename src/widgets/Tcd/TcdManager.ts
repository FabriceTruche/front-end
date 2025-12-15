import {ITcdColumn} from "./Column";
import {IField} from "./Field";
import {factory} from "../../common/Factory";
import {IMeasure} from "./Measure";
import {IMeasureValue} from "./MeasureValue";

export type KeyOf<T> = keyof T

export interface ITcdManager<T> {
    buildTcd(rowsAxis: KeyOf<T>[], colsAxis: KeyOf<T>[], measures: IMeasure[]): void

    initialData: T[]
    columns: ITcdColumn[]
    rowAxis: KeyOf<T>[]
    colAxis: KeyOf<T>[]
    rowTreeField: IField<T>
    colTreeField: IField<T>
    rowsTerminalField: IField<T>[]
    colsTerminalField: IField<T>[]
    measures: IMeasure[]
    measuresValue: IMeasureValue<T>[]
}

export class _TcdManager<T> implements ITcdManager<T> {

    private readonly _data: T[]
    private readonly _columns: ITcdColumn[]
    private _rowsAxis: KeyOf<T>[]
    private _colsAxis: KeyOf<T>[]
    private readonly _rowTreeField: IField<T>
    private readonly _colTreeField: IField<T>
    private _rowsTerminalField: IField<T>[]
    private _colsTerminalField: IField<T>[]
    private _measures: IMeasure[]
    private _measuresValue: IMeasureValue<T>[]

    public get initialData(): T[] { return this._data }
    public get columns(): ITcdColumn[] { return this._columns}
    public get rowAxis(): KeyOf<T>[] { return this._rowsAxis }
    public get colAxis(): KeyOf<T>[] { return this._colsAxis }
    public get rowTreeField(): IField<T> { return this._rowTreeField }
    public get colTreeField(): IField<T> { return this._colTreeField }
    public get rowsTerminalField(): IField<T>[] { return this._rowsTerminalField }
    public get colsTerminalField(): IField<T>[] { return this._colsTerminalField }
    public get measures(): IMeasure[] { return this._measures }
    public get measuresValue(): IMeasureValue<T>[] { return this._measuresValue }

    constructor(data: T[], columns: ITcdColumn[]) {
        this._rowsAxis = []
        this._colsAxis = []
        this._rowsTerminalField = []
        this._colsTerminalField = []
        this._measures = []
        this._measuresValue = []
        this._data = data
        this._columns = columns
        this._rowTreeField = factory.createField("__rows_field_root__", factory.createColumn("__rows_field_root__","any"))
        this._colTreeField = factory.createField("__cols_field_root__", factory.createColumn("__cols_field_root__","any"))
    }

    /**
     *
     * @private
     */
    private reset(): void {
        this._rowTreeField.reset()
        this._colTreeField.reset()
        this._rowsAxis = []
        this._colsAxis = []
        this._rowsTerminalField = []
        this._colsTerminalField = []
        this._measures = []
        this._measuresValue = []
    }

    /**
     * sort data in place (parameter)
     * @param data
     * @param axis
     * @private
     */
    private groupBy(data: T[], axis: KeyOf<T>[]): void {
        data.sort((row1:T, row2: T):number=>{
            for(let i=0; i<axis.length; i++) {
                const field: KeyOf<T> = axis[i]
                if (row1[field]<row2[field]) return -1
                if (row1[field]>row2[field]) return 1
            }
            return 0
        })
    }

    /**
     * calcul de l'arbre des IField à partir d'un tableau des Data (T) trié selon
     * l'ordre des Keyof<T> passé en paramètre.
     * Algo :
     *  pour chacune des lignes
     *      pour chaque axis,
     *      si valeur identique => RAS
     *      si valeur différente => on crée un field => jusqu'au dernier axis
     * @private
     * @param sortedData
     * @param rootField
     * @param axis
     * @param terminals
     */
    private calculateFields(sortedData: T[], rootField: IField<T>, axis: ITcdColumn[], terminals: IField<T>[] ): void {

        let currField: IField<T> = rootField

        // on démarre sur la seconde ligne
        for(let i=0; i<sortedData.length; i++) {
            const prevDataRow: T|null = i>0 ? sortedData[i-1] : null
            const dataRow : T = sortedData[i]
            let newValue: boolean = false

            currField = rootField
            currField.addDataRow(dataRow)

            for(let k=0; k<axis.length; k++) {
                const tcdCol: ITcdColumn = axis[k]
                const ax: KeyOf<T> = tcdCol.name as KeyOf<T>

                if (newValue || (prevDataRow===null) || (prevDataRow && (prevDataRow[ax]!==dataRow[ax]))) {
                    // nouvelle valeur pour l'axe "ax"
                    const newField: IField<T> = factory.createField(dataRow[ax], tcdCol)

                    currField = currField.addField(newField)
                    newValue = true

                    // on teste le terminal uniquement sur l'ajout d'un nouveau field
                    if (k===axis.length - 1) {
                        terminals.push(currField)
                    }

                } else {
                    const nextField: IField<T> | undefined = currField.lastNestedField()

                    if (nextField===undefined)
                        throw new Error('Error interne : lastNestedField must be not null')

                    currField = nextField
                }

                currField.addDataRow(dataRow)
            }
        }
    }

    /**
     *
     * @param arr1
     * @param arr2
     * @private
     */
    private intersect<T>(arr1: T[] , arr2: T[]): T[] {
        // 1. Convertir le premier tableau en Set pour une recherche rapide O(1)
        const set1: Set<T> = new Set(arr1);

        // 2. Filtrer le deuxième tableau, en ne gardant que les éléments présents dans le Set
        // Optionnel : Retirer les doublons potentiels (si arr2 en contenait)
        // const res: T[] = [...new Set(intersectionArray)]

        return arr2.filter((element: T) => set1.has(element))
    }

    /**
     *
     * @private
     */
    private calculateMeasures() {
        // on croise les rowsTerminal avs les colsTerminals puis on intersect les dataRows
        this._rowsTerminalField.forEach((rowTerm: IField<T>) => {

            this._colsTerminalField.forEach((colTerm: IField<T>) => {
                const dataRows: T[] = this.intersect(rowTerm.dataRows, colTerm.dataRows)

                if (dataRows.length === 0) {
                    // pas de measure => on n'en crée ou pas ?!
                } else {
                    // measures à crééer
                    this._measures.forEach((measure: IMeasure) => {
                        this._measuresValue.push(factory.createMeasureValue(rowTerm,colTerm,dataRows,measure))
                    })
                }

            })

        })
    }

    /**
     *
     * @param rowsAxis
     * @param colsAxis
     * @param measures
     */
    public buildTcd(rowsAxis: KeyOf<T>[], colsAxis: KeyOf<T>[], measures: IMeasure[]): void {

        // définir les axes en ligne et en colonne
        this.reset()
        this._rowsAxis = [...rowsAxis]
        this._colsAxis = [...colsAxis]
        this._measures = [...measures]

        // initialiser les tableaux servant à calculer l'arbre des fields
        const dataForRowsAxis: T[] = [...this._data]
        const dataForColsAxis: T[] = [...this._data]

        // trier selon les axes , en ligne et en colonne
        this.groupBy(dataForRowsAxis,this._rowsAxis)
        this.groupBy(dataForColsAxis,this._colsAxis)

        // calculer l'abre des fields
        const rowsTcdColuns: ITcdColumn[] = this._columns.filter((c:ITcdColumn)=>this._rowsAxis.indexOf(c.name as KeyOf<T>)!==-1)
        const colsTcdColuns: ITcdColumn[] = this._columns.filter((c:ITcdColumn)=>this._colsAxis.indexOf(c.name as KeyOf<T>)!==-1)

        this.calculateFields(dataForRowsAxis, this._rowTreeField, rowsTcdColuns, this._rowsTerminalField)
        this.calculateFields(dataForColsAxis, this._colTreeField, colsTcdColuns, this._colsTerminalField)

        // affecter les measures
        this.calculateMeasures()
    }

}



// créer les fields sur la première ligne
// const firstRow: T = sortedData[0]
//
// axis.forEach((ax:ITcdColumn)=>{
//     currField = currField.addField(factory.createField(firstRow[ax.name as KeyOf<T>],ax))
//     currField.addDataRow(firstRow)
// })
// helper.display(this._data,false)
// helper.display(dataForRowsAxis,false)
//
// this._data.forEach((row: T) => {
//     // 1. chercher le rowField
//     const rowField: IField<T> = this.findField(row, this._rowTreeField)
//
//     // 2. chercher le colField
//     const colField: IField<T> = this.findField(row, this._colTreeField)
//
//     // 3. créer la measure et l'affecter
//     const measure: IMeasure<T> = factory.createMeasure(rowField,colField)
// })
