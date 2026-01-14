import {createField, IField} from "./Field";
import {IMeasure, createMeasure} from "./Measure";
import {createMeasureValue, IMeasureValue} from "./MeasureValue";
import {createTcdColumn, ITcdColumn} from "./TcdColumn";
import {TcdColumnOption, TcdConfig} from "./view/TcdConfig";
import {FuncObject} from "./functionsGroup";

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
    data: T[]

    // createMeasure(column: string, funcGroup: string): IMeasure|null
    // getColumnByName(name: string): ITcdColumn|null
    buildTcd(data: T[], config: TcdConfig): void // rowsAxis: string[], colsAxis: string[], measures: (IMeasure|null)[]): void
}

export class _TcdManager<T> implements ITcdManager<T> {
    private _data: T[]
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
    public get data(): T[] { return this._data }

    // public get totalMeasuresValue(): IMeasureValue<T>[] { return this._allMeasuresValue.filter((m:IMeasureValue<T>)=>m.isTotalMeasure()) }

    constructor(/*data: T[], columns: ITcdColumn[]*/) {
        this._rowsAxis = []
        this._colsAxis = []
        this._rowsTerminalField = []
        this._colsTerminalField = []
        this._measures = []
        this._allMeasuresValue = []
        this._data = []
        this._columns = [] // columns
        this._rowTreeField = createField("GRAND TOTAL", createTcdColumn("__rows_field_root__"), true)
        this._colTreeField = createField("GRAND TOTAL", createTcdColumn("__cols_field_root__"), true)
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
        // this._data = []
        // this;this._columns
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
                    const newField: IField<T> = createField(dataRow[ax], tcdCol)

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
                        this._allMeasuresValue.push(createMeasureValue(rowTerm,colTerm,dataRows,measure))
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
     * @param name
     */
    // public getColumnByName(name: string): ITcdColumn|null {
    //     const col = this._columns.find((c:ITcdColumn)=>c.name === name)
    //
    //     return (col===undefined) ? null : col
    // }

    /**
     * Fusionne deux objets en ignorant les propriétés 'undefined' du second.
     * @param {Object} target - L'objet de base (priorité basse)
     * @param {Object} source - L'objet à appliquer (priorité haute, sauf undefined)
     */
    private merge(target: any, source: any) {
        const cleanedSource = Object.fromEntries(
            Object.entries(source).filter(([_, value]) => value !== undefined)
        );

        return { ...target, ...cleanedSource };
    };

    /**
     *
     * @private
     */
    private createColumn(key: string, value: any, config: TcdConfig): ITcdColumn {
        let colOption: TcdColumnOption = {}

        // valeurs par défaut
        switch (typeof value) {
            case "object":
                if (value instanceof Date) {
                    colOption.typeFormat = "date"
                    colOption.mask = "DD/MM/YYYY"
                } else {
                    colOption.typeFormat = "text"
                }
                break;
            case "boolean":
                colOption.typeFormat = "boolean"
                break;
            case "number":
                colOption.typeFormat = "number"
                colOption.precision = (value.toString().search(/\./) > 0) ? 2 : 0
                break;
            case "string":
                colOption.typeFormat = "text"
                break;
            case "function":
            case "symbol":
            case "bigint":
            case "undefined":
                throw new Error(`Type de colonne non pris en charge (${typeof value})`)
        }

        // merge des valeurs par défaut calculées à partir des data avec la config
        if (config.options[key]!==undefined)
            colOption = this.merge(colOption, config.options[key])

        return createTcdColumn(key, 100, colOption)
    }

    /**
     *
     * @param config
     * @private
     */
    private createColumns(config: TcdConfig): void {
        if (this._data.length===0)
            return

        const object: any = this._data[0]

        Object.keys(object).forEach(key => {
            const column: ITcdColumn = this.createColumn(key,object[key],config)
            this._columns.push(column)
        })
    }

    /**
     *
     * @param collection
     * @param axesNames
     * @private
     */
    private assignAxes(collection: ITcdColumn[], axesNames: string[]) {
        axesNames.forEach((axisName: string) => {
            const ax: ITcdColumn|undefined = this._columns.find((c:ITcdColumn)=>c.name===axisName)

            if (ax!==undefined)
                collection.push(ax)
        })
    }

    /**
     *
     * @param column
     * @param funcGroup
     */
    // private createMeasure(column: string, funcGroup: string): IMeasure|null {
    //     const col =  this.getColumnByName(column)
    //     const fg = functionsGroup.find((f:IGroupByFunc)=>f.name===funcGroup)
    //
    //     if (col===null)
    //         return null
    //
    //     if (fg===undefined)
    //         return null
    //
    //     return createMeasure(col, fg)
    // }

    /**
     *
     * @param config
     * @private
     */
    private createMeasures(config: TcdConfig): void {
       config.measures.forEach((m:string)=>{
           const col: ITcdColumn|undefined = this._columns.find((c:ITcdColumn)=>c.name===m)

           if (col!==undefined) {
               const fn: FuncObject = config.groupByFuncs[m]
               const measure = createMeasure(col, fn)

               this._measures.push(measure)
           }
       })
    }
    /**
     *
     * @param data
     * @param config
     */
    public buildTcd(data: T[], config: TcdConfig): void { //rowsAxis: string[], colsAxis: string[], measures: (IMeasure|null)[]): void {

        // data
        this.reset()
        this._data = [...data]

        // création des colonnes à partir des data
        this.createColumns(config)

        // définition des axes en ligne et en colonne à partir de la confi
        this.assignAxes(this._rowsAxis, config.rows)
        this.assignAxes(this._colsAxis, config.columns)
        this.createMeasures(config)

        // this._rowsAxis = rowsAxis.map((fn:string)=>this.getColumnByName(fn)).filter((c:ITcdColumn|null)=>c!==null) as ITcdColumn[]
        // this._colsAxis = colsAxis.map((fn:string)=>this.getColumnByName(fn)).filter((c:ITcdColumn|null)=>c!==null) as ITcdColumn[]
        // this._measures = [...measures.filter((m:IMeasure|null)=>m!==null) as IMeasure[]]

        // vérifier que les axes terminaux n'est pas l'option "total" activée => la déctiver sinon
        this._rowsAxis[this._rowsAxis.length - 1].total=false
        this._colsAxis[this._colsAxis.length - 1].total=false

        // définir l'ordre des colonnes de measures
        this._measures.forEach((measure: IMeasure, index: number) => {measure.index=index})

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

export function createTcdManager<T>(/*data: T[], columns: ITcdColumn[]*/): ITcdManager<T> {
    return new _TcdManager(/*data,columns*/)
}



