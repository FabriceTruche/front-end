import {AnyObject, Column, DbColumn, ResponseQuery} from "../common/common";
import {TableData} from "../widgets/Table/Table";

export interface IHelper {

    // general helper ...
    ifStr(cond:boolean,str:string):string
    tf(pc:number):boolean
    findItem<T,U>(items:T[],predicat:((item:T)=>boolean),returnValue:((item:T)=>U),defaultValue:U):U
    getById<T extends {id:string} >(items:T[],id:string):T|null

    // with table ...
    toCollection(response:any, pred?:(c:DbColumn)=>string): TableData|null
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
    private static canvas: HTMLCanvasElement = document.createElement("canvas")
    private static context: CanvasRenderingContext2D|null = Helper.canvas.getContext("2d")

    getWidthFromText(text:string, element:Element):number {
        return this._getWidthText(text,this._getCanvasFont(element))
    }
    getMaxWidthFromArray(textArr:string[], element:Element):number{
        const font:string=this._getCanvasFont(element)
        return textArr.reduce<number>((prevValue:number,text:string)=>Math.max(prevValue,this._getWidthText(text,font)),0)
    }
    getMaxWidthFromArrayById(textArr:string[], elementId:string):number{
        const element:Element|null=document.getElementById(elementId)
        if (element===null)
            return -1
        const font:string=this._getCanvasFont(element)
        return textArr.reduce<number>((prevValue:number,text:string)=>Math.max(prevValue,this._getWidthText(text,font)),0)
    }
    getMaxWidthFromCollectionById(collection:TableData, elementId:string, extension?:number):AnyObject {
        const element:Element|null=document.getElementById(elementId)
        let res:AnyObject={}

        if (element) {
            const font: string = this._getCanvasFont(element)

            collection.columns.forEach((c: Column) => {
                let arr: string[] = collection.data.map((row: AnyObject) => row[c.name])
                arr.push(c.label)
                res[c.name] = Math.ceil(this.getMaxWidthFromArray(arr, element) + (extension===undefined?0:extension)) + "px"
            })
        }

        return res
    }
    getCssStyle(prop:string,element:Element):string {
        return window.getComputedStyle(element, null).getPropertyValue(prop);
    }
    getCssStyleById(prop:string,elementId:string):string {
        const elt:Element|null=document.getElementById(elementId)
        if (elt)
            return window.getComputedStyle(elt, null).getPropertyValue(prop);
        return ""
    }


    // private _getWidthFromTextAndFont(text:string, font:string):number {
    //     return this._getWidthText(text,font)
    // }
    private _getWidthText(text:string, font:string):number {
        if (Helper.context===null)
            return 0

        Helper.context.font = font;
        const metrics = Helper.context.measureText(text);

        return metrics.width;
    }
    private _getCanvasFont(el:Element = document.body) {
        const fontWeight = this.getCssStyle('font-weight',el) || 'normal';
        const fontSize = this.getCssStyle('font-size',el) || '16px';
        const fontFamily = this.getCssStyle('font-family',el) || 'Times New Roman';

        return `${fontWeight} ${fontSize} ${fontFamily}`;
    }

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
    public toCollection(response: any, pr?:(c:DbColumn)=>string): TableData | null {
        const pred=(pr===undefined) ? (c:DbColumn):string=>c.name : pr

        if (response.error === undefined) {
            const inputData: TableData = {
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
        return null
    }

}

export const helper:IHelper = new Helper()
