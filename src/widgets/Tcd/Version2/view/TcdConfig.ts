import {ColumnFormat} from "../TcdColumn"
import {FuncObject} from "../functionsGroup";

/** Types pour le tri */
export type TcdSortOrder = 'ASC' | 'DESC' | null

export type TcdColumnOption = {
    typeFormat?: ColumnFormat
    precision?: number
    mask?: string
    hasTotal?: boolean
    label?: string
}
/** État de configuration complet */
export type TcdConfig = {
    allColumns: string[]
    rows: string[]
    columns: string[]
    measures: string[]
    filters: string[]
    filters_values: Record<string, string[]>
    sorts: Record<string, TcdSortOrder>
    groupByFuncs: Record<string, FuncObject>
    options: Record<string, TcdColumnOption>
}
