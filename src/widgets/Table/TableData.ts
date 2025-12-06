import {AnyObject} from "../../common/common";
import {Column} from "./Column";

export type TableData<T> = {
    data: T[]
    columns: Column[]
    totals?: { [property: string]: number }
}
export const defaultTableData: TableData<any> = {
    columns:[],
    data:[]
}
