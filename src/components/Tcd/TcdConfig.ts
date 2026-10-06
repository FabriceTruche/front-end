import {FuncObject} from "./functionsGroup";
import {ColumnDefinition, SortOrder} from "../common/Column";

/** État de configuration complet */
export type TcdConfig = {
    allColumns: string[]
    rows: string[]
    columns: string[]
    measures: string[]
    filters: string[]
    filters_values: Record<string, string[]>
    sorts: Record<string, SortOrder>
    groupByFuncs: Record<string, FuncObject>
    options: Record<string, ColumnDefinition>
}
