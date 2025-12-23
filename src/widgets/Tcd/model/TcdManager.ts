import {ITcdColumn} from "./TcdColumn";
import {IField} from "./Field";
import {factory} from "../../../common/Factory";
import {IMeasure} from "./Measure";
import {IMeasureValue} from "./MeasureValue";

export type KeyOf<T> = keyof T

export interface ITcdManager<T> {
    initialData: T[]
    columns: ITcdColumn[]
    rowAxis: ITcdColumn[]
    colAxis: ITcdColumn[]
    rowTreeField: IField<T>
    colTreeField: IField<T>
    rowsTerminalField: IField<T>[]
    colsTerminalField: IField<T>[]
    measures: IMeasure[]
    measuresValue: IMeasureValue<T>[]

    buildTcd(rowsAxis: string[], colsAxis: string[], measures: IMeasure[]): void
}

export class _TcdManager<T> implements ITcdManager<T> {

    private readonly _data: T[]
    private readonly _columns: ITcdColumn[]
    private _rowsAxis: ITcdColumn[]
    private _colsAxis: ITcdColumn[]
    private readonly _rowTreeField: IField<T>
    private readonly _colTreeField: IField<T>
    private _rowsTerminalField: IField<T>[]
    private _colsTerminalField: IField<T>[]
    private _measures: IMeasure[]
    private _allMeasuresValue: IMeasureValue<T>[]

    public get initialData(): T[] { return this._data }
    public get columns(): ITcdColumn[] { return this._columns}
    public get rowAxis(): ITcdColumn[] { return this._rowsAxis }
    public get colAxis(): ITcdColumn[] { return this._colsAxis }
    public get rowTreeField(): IField<T> { return this._rowTreeField }
    public get colTreeField(): IField<T> { return this._colTreeField }
    public get rowsTerminalField(): IField<T>[] { return this._rowsTerminalField }
    public get colsTerminalField(): IField<T>[] { return this._colsTerminalField }
    public get measures(): IMeasure[] { return this._measures }
    public get measuresValue(): IMeasureValue<T>[] { return this._allMeasuresValue } // .filter((m:IMeasureValue<T>)=>!m.isTotalMeasure()) }
    // public get totalMeasuresValue(): IMeasureValue<T>[] { return this._allMeasuresValue.filter((m:IMeasureValue<T>)=>m.isTotalMeasure()) }

    constructor(data: T[], columns: ITcdColumn[]) {
        this._rowsAxis = []
        this._colsAxis = []
        this._rowsTerminalField = []
        this._colsTerminalField = []
        this._measures = []
        this._allMeasuresValue = []
        this._data = data
        this._columns = columns
        this._rowTreeField = factory.createField("GRAND TOTAL", factory.createTcdColumn("__rows_field_root__","any"), true)
        this._colTreeField = factory.createField("GRAND TOTAL", factory.createTcdColumn("__cols_field_root__","any"), true)
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
        this._allMeasuresValue = []
    }

    /**
     * sort data in place (parameter)
     * @param data
     * @param axis
     * @private
     */
    private groupBy(data: T[], axis: ITcdColumn[]): void {
        data.sort((row1:T, row2: T):number=>{
            for(let i=0; i<axis.length; i++) {
                const field: KeyOf<T> = axis[i].name as KeyOf<T>
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

        // ajouter la racine pour le grand total
        terminals.push(rootField)

        // on démarre sur la seconde ligne
        for (let i = 0; i < sortedData.length; i++) {
            const prevDataRow: T | null = i > 0 ? sortedData[i - 1] : null
            const dataRow: T = sortedData[i]
            let newValue: boolean = false

            currField = rootField
            currField.addDataRow(dataRow)

            for (let k = 0; k < axis.length; k++) {
                const tcdCol: ITcdColumn = axis[k]
                const ax: KeyOf<T> = tcdCol.name as KeyOf<T>

                if (newValue || (prevDataRow === null) || (prevDataRow && (prevDataRow[ax] !== dataRow[ax]))) {
                    // nouvelle valeur pour l'axe "ax"
                    const newField: IField<T> = factory.createField(dataRow[ax], tcdCol)

                    currField = currField.addField(newField)
                    newValue = true

                    // on teste le terminal uniquement sur l'ajout d'un nouveau field
                    // est terminal si dernier des axes OU si l'axe possède un total
                    if ((k === axis.length - 1) || axis[k].total) {
                        terminals.push(currField)
                    }

                } else {
                    const nextField: IField<T> | undefined = currField.lastNestedField()

                    if (nextField === undefined)
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

                if (dataRows.length>0) {
                    // measures à créer
                    this._measures.forEach((measure: IMeasure) => {
                        this._allMeasuresValue.push(factory.createMeasureValue(rowTerm,colTerm,dataRows,measure))
                    })
                }

            })

        })
    }

    /**
     *
     * @private
     * @param field
     * @param lenTerminal
     */
    private calculateDeep(field: IField<T>, lenTerminal: number): void {
        if (field.isTerminal()) {

            field.deep = lenTerminal

        } else {

            let sum = 0

            field.fields.forEach((field: IField<T>) => {
                this.calculateDeep(field, lenTerminal)
                sum += field.deep
            })

            field.deep = sum

            // totaux => si la ITcdColumn possède un total => ajouter le lenTerminal sur le noeud pour son total
            // pas de totaux sur un terminal de IField
            if (field.column.total)
                field.deep += lenTerminal
        }

    }

    /**
     *
     * @param rowsAxis
     * @param colsAxis
     * @param measures
     */
    public buildTcd(rowsAxis: string[], colsAxis: string[], measures: IMeasure[]): void {

        const findColumn=(colName:string): ITcdColumn=>this._columns.find((c:ITcdColumn)=>c.name===colName) as ITcdColumn

        // définir les axes en ligne et en colonne
        this.reset()
        this._rowsAxis = rowsAxis.map((fn:string)=>findColumn(fn))
        this._colsAxis = colsAxis.map((fn:string)=>findColumn(fn))
        this._measures = [...measures]

        // vérifier que les axes terminaux n'est pas l'option "total" activée => la déctiver sinon
        this._rowsAxis[this._rowsAxis.length - 1].total=false
        this._colsAxis[this._colsAxis.length - 1].total=false

        // définir l'ordre des colonnes de measures
        measures.forEach((measure: IMeasure, index: number) => {measure.index=index})

        // initialiser les tableaux servant à calculer l'arbre des fields
        const dataForRowsAxis: T[] = [...this._data]
        const dataForColsAxis: T[] = [...this._data]

        // trier selon les axes , en ligne et en colonne
        this.groupBy(dataForRowsAxis,this._rowsAxis)
        this.groupBy(dataForColsAxis,this._colsAxis)

        // calculer l'abre des fields
        this.calculateFields(dataForRowsAxis, this._rowTreeField, this._rowsAxis, this._rowsTerminalField)
        this.calculateFields(dataForColsAxis, this._colTreeField, this._colsAxis, this._colsTerminalField)

        // calculer la profondeur des fields
        this.calculateDeep(this._rowTreeField, 1)
        this.calculateDeep(this._colTreeField, this._measures.length)

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
// const rowsTcdColuns: ITcdColumn[] = this._rowsAxis.map((fn:KeyOf<T>)=>this._columns.find((c:ITcdColumn)=>c.name===fn) as ITcdColumn)
// const colsTcdColuns: ITcdColumn[] = this._colsAxis.map((fn:KeyOf<T>)=>this._columns.find((c:ITcdColumn)=>c.name===fn) as ITcdColumn)
