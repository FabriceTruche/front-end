import {IColumn} from "./Column";

export interface ITableData<T> {
    data: T[]
    columns: IColumn[]

    getColumn(colName: keyof T): IColumn
    getTotals(colName: string): number|undefined
    setTotals(colName: string, total: number): void
}
export class _TableData<T> implements ITableData<T> {

    private readonly _columns: IColumn[];
    private readonly _data: T[];
    private readonly _totals: { [prop: string] : number | undefined }

    constructor(data: T[], columns: IColumn[]) {
        this._data = data
        this._columns = columns
        this._totals = {}
    }

    public get columns(): IColumn[] {
        return this._columns
    }

    public get data(): T[] {
        return this._data
    }

    public getTotals(colName: string): number|undefined {
        return this._totals[colName]
    }

    public setTotals(colName: string, total: number): void {
        this._totals[colName] = total
    }
    public getColumn(colName: keyof T): IColumn {
        const index = this._columns.findIndex((x:IColumn)=>x.name===colName)

        if (index===-1)
            throw new Error('column not found')

        return this._columns[index]
    }
}



// export type TableData<T> = {
//     data: T[]
//     columns: IColumn[]
//     totals?: { [property: string]: number }
// }

// export const defaultTableData: TableData<any> = {
//     columns:[],
//     data:[]
// }
