import {DbColumn, ResponseQuery} from "../common/common";
import {defaultTableData, TableData} from "../widgets/Table/TableData";

export interface IHelper {

    // general helper ...
    ifStr(cond:boolean,str:string):string
    tf(pc:number):boolean
    findItem<T,U>(items:T[],predicat:((item:T)=>boolean),returnValue:((item:T)=>U),defaultValue:U):U
    getById<T extends {id:string} >(items:T[],id:string):T|null

    // with table ...
    toCollection<T>(response:any, pred?:(c:DbColumn)=>string): TableData<T>
}

class Helper implements IHelper {


    /********************************************************************************
     * code helper
     */
    ifStr(cond: boolean, str: string): string {
        return cond ? str : ""
    }
    tf(pc:number):boolean { return (Math.random()<pc) }

    /********************************************************************************
     * UI text width calculation
     */


    // private _getWidthFromTextAndFont(text:string, font:string):number {
    //     return this._getWidthText(text,font)
    // }

    /*********************************************************************************************************
     * sql local database
     */
    public async executeQuery(sql:string): Promise<ResponseQuery> {
        return new Promise<ResponseQuery>((resolve, reject) =>
            fetch(
                'http://192.168.1.57:3001/api/query?_noPagine',
                {
                    headers: {'Accept': 'application/json'},
                    method: "POST",
                    body: sql
                }).then((response) => {
                return response.json()
            }).then((response: any) => {
                // console.log(response.result)
                if (response.error === undefined)
                    resolve(response.result)
                else
                    reject(response)
            }).catch((error: any) => {
                    reject(error)
                }
            )
        )
    }

    /***
     * find ex
     * @param items
     * @param predicat
     * @param returnValue
     * @param defaultValue
     */
    public findItem<T,U>(items:T[],predicat:((item:T)=>boolean),returnValue:((item:T)=>U),defaultValue:U):U {
        const index:number=items.findIndex((item:T)=>predicat(item))
        return  (index===-1) ? defaultValue : returnValue(items[index])
    }

    /**
     *
     * @param items
     * @param id
     */
    public getById<T extends {id:string}>(items:T[],id:string):T|null {
        const index:number=items.findIndex((item:T)=>item.id===id)
        return (index===-1)?null:items[index]
    }


    /**
     *
     * @param response
     * @param pr
     */
    public toCollection<T>(response: any, pr?:(c:DbColumn)=>string): TableData<T>  {
        const pred=(pr===undefined) ? (c:DbColumn):string=>c.name : pr

        if (response.error === undefined) {
            const inputData: TableData<T> = {
                data: response.data,
                columns: response.meta.map((c: DbColumn) => ({
                    name: c.name,
                    type: c.type,
                    sort: 0,
                    filter: "",
                    label: pred(c)
                }))
            }
            return inputData
        }
        return defaultTableData
    }

}

export const helper:IHelper = new Helper()
