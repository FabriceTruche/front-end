import {AnyObject, Column} from "../common/common";
import {TableData} from "../widgets/Table/Table";
import {CSSProperties} from "react";

export interface IUIHelper {
    // UI text width calculation
    getCssStyleById(prop:string,elementId:string):string
    getCssStyle(prop:string,element:Element):string
    getWidthFromText(text:string, element:Element):number
    getMaxWidthFromArray(text:string[], element:Element):number
    getMaxWidthFromArrayById(text:string[], elementId:string):number
    getMaxWidthFromCollectionById(collection:TableData, elementId:string, extension?:number):AnyObject

    mergeClassName(cls1: string|undefined, cls2: string|undefined): string|undefined
    mergeCSSProperties(style1: CSSProperties|undefined, style2: CSSProperties|undefined): CSSProperties|undefined
}


class UIHelper implements IUIHelper {
    private static canvas: HTMLCanvasElement = document.createElement("canvas")
    private static context: CanvasRenderingContext2D|null = UIHelper.canvas.getContext("2d")

    private _getWidthText(text:string, font:string):number {
        if (UIHelper.context===null)
            return 0

        UIHelper.context.font = font;
        const metrics = UIHelper.context.measureText(text);

        return metrics.width;
    }
    private _getCanvasFont(el:Element = document.body) {
        const fontWeight = this.getCssStyle('font-weight',el) || 'normal';
        const fontSize = this.getCssStyle('font-size',el) || '16px';
        const fontFamily = this.getCssStyle('font-family',el) || 'Times New Roman';

        return `${fontWeight} ${fontSize} ${fontFamily}`;
    }

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

    /**
     *
     * @param cls1
     * @param cls2
     */
    mergeClassName(cls1: string|undefined, cls2: string|undefined): string|undefined {
        if (cls1===undefined)
            return cls2

        if (cls2===undefined)
            return cls1

        return cls1 + " " + cls2
    }
    mergeCSSProperties(style1: CSSProperties|undefined, style2: CSSProperties|undefined): CSSProperties|undefined {
        return {...style1,...style2}
    }
}

export const uiHelper: IUIHelper = new UIHelper()
