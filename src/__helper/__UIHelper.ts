export {}

// import {AnyObject} from "../common/common";
// import {CSSProperties} from "react";
// import {ITableData} from "../widgets/Table/TableData";
// import {IColumn} from "../widgets/Table/Column";
//
// export interface IUIHelper {
//     // UI text width calculation
//     getCssStyleById(prop:string,elementId:string):string
//     getCssStyle(prop:string,element:Element):string
//     getWidthFromText(text:string, element:Element):number
//     getMaxWidthFromArray(text:string[], element:Element):number
//     getMaxWidthFromArrayById(text:string[], elementId:string):number
//     getMaxWidthFromCollectionById(collection:ITableData<{[strProp: string]: string}>, elementId:string, extension?:number): {[strProp: string]: number}
//     mergeClassName(cls1: string|undefined, cls2: string|undefined): string|undefined
//     mergeCSSProperties(style1: CSSProperties|undefined, style2: CSSProperties|undefined): CSSProperties|undefined
// }
//
//
// class UIHelper implements IUIHelper {
//     private _getWidthText(text:string, font:string):number {
//         if (UIHelper.context===null)
//             return 0
//
//         UIHelper.context.font = font;
//         const metrics = UIHelper.context.measureText(text);
//
//         return metrics.width;
//     }
//     private _getCanvasFont(el:Element = document.body) {
//         const fontWeight = this.getCssStyle('font-weight',el) || 'normal';
//         const fontSize = this.getCssStyle('font-size',el) || '16px';
//         const fontFamily = this.getCssStyle('font-family',el) || 'Times New Roman';
//
//         return `${fontWeight} ${fontSize} ${fontFamily}`;
//     }
//
//     getWidthFromText(text:string, element:Element):number {
//         return this._getWidthText(text,this._getCanvasFont(element))
//     }
//     getMaxWidthFromArray(textArr:string[], element:Element):number{
//         const font:string=this._getCanvasFont(element)
//         return textArr.reduce<number>((prevValue:number,text:string)=>Math.max(prevValue,this._getWidthText(text,font)),0)
//     }
//     getMaxWidthFromArrayById(textArr:string[], elementId:string):number{
//         const element:Element|null=document.getElementById(elementId)
//         if (element===null)
//             return -1
//         const font:string=this._getCanvasFont(element)
//         return textArr.reduce<number>((prevValue:number,text:string)=>Math.max(prevValue,this._getWidthText(text,font)),0)
//     }
//     getMaxWidthFromCollectionById(collection:ITableData<{[strProp: string]: string}>, elementId:string, extension?:number):{[strProp: string]: number} {
//         const element:Element|null=document.getElementById(elementId)
//         let res:AnyObject={}
//
//         if (element) {
//             const font: string = this._getCanvasFont(element)
//
//             collection.columns.forEach((c: IColumn) => {
//                 let tableDataStr: string[] = collection.data.map((row: {[strProp: string]: string}) => row[c.name].toString() )
//                 tableDataStr.push(c.label)
//                 res[c.name] = Math.ceil(this.getMaxWidthFromArray(tableDataStr, element) + (extension===undefined?0:extension)) + "px"
//             })
//         }
//
//         return res
//     }
//     getCssStyle(prop:string,element:Element):string {
//         return window.getComputedStyle(element, null).getPropertyValue(prop);
//     }
//     getCssStyleById(prop:string,elementId:string):string {
//         const elt:Element|null=document.getElementById(elementId)
//         if (elt)
//             return window.getComputedStyle(elt, null).getPropertyValue(prop);
//         return ""
//     }
//
//     /**
//      *
//      * @param cls1
//      * @param cls2
//      */
//     mergeClassName(cls1: string|undefined, cls2: string|undefined): string|undefined {
//         if (cls1===undefined)
//             return cls2
//
//         if (cls2===undefined)
//             return cls1
//
//         return cls1 + " " + cls2
//     }
//     mergeCSSProperties(style1: CSSProperties|undefined, style2: CSSProperties|undefined): CSSProperties|undefined {
//         return {...style1,...style2}
//     }
// }
//
// export const uiHelper: IUIHelper = new UIHelper()
