import {AnyObject} from "../common/common";
import {TableData} from "../widgets/Table/Table";

export interface IUIHelper {
    // UI text width calculation
    getCssStyleById(prop:string,elementId:string):string
    getCssStyle(prop:string,element:Element):string
    getWidthFromText(text:string, element:Element):number
    getMaxWidthFromArray(text:string[], element:Element):number
    getMaxWidthFromArrayById(text:string[], elementId:string):number
    getMaxWidthFromCollectionById(collection:TableData, elementId:string, extension?:number):AnyObject
}


class UIHelper implements IUIHelper {
    getCssStyle(prop: string, element: Element): string {
        throw new Error("Not implemented")
    }

    getCssStyleById(prop: string, elementId: string): string {
        throw new Error("Not implemented")
    }

    getMaxWidthFromArray(text: string[], element: Element): number {
        throw new Error("Not implemented")
    }

    getMaxWidthFromArrayById(text: string[], elementId: string): number {
        throw new Error("Not implemented")
    }

    getMaxWidthFromCollectionById(collection: TableData, elementId: string, extension?: number): AnyObject {
        throw new Error("Not implemented")
    }

    getWidthFromText(text: string, element: Element): number {
        throw new Error("Not implemented")
    }
}

export const uiHelper: IUIHelper = new UIHelper()
