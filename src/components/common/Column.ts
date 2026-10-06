import { CSSProperties } from 'react';
import {SelectOption} from "../Form/FormComponents";
import {FieldConfig} from "../Form/FormObject";
import {DbType, UiType} from "../../common/SharedFrontBack";

// Types pour le tri
export type SortOrder = 'ASC' | 'DESC' | null

// définition des propriétés de base d'une  colonne
export type ColumnDefinition = {
    dbType: DbType
    precision?: number
    mask?: string
    hasTotal?: boolean
    label?: string
}

// définition minimale d'une colonne
export const defaultColDef: ColumnDefinition = {
    dbType: "string"
}

export interface IColumn {
    name: string
    label: string
    dbType: DbType
    uiType: UiType
    width: number
    total: boolean
    defaultStyle?: CSSProperties
    option?: SelectOption[]
    precision?: number
    mask?: string

    initFromObject(object: any): void
}

export class _Column implements IColumn {
    public readonly name: string;
    public label: string;
    public width: number;
    public total: boolean;
    public dbType: DbType;
    public uiType: UiType;
    public precision?: number;
    public mask?: string;
    public option?: SelectOption[]
    public defaultStyle?: CSSProperties;

    constructor(
        name: string,
        width: number,
        colDef: ColumnDefinition,
        fieldConfig: FieldConfig|undefined,
    ) {
        this.name = name;
        this.label = colDef.label || name
        this.width = width;
        this.dbType = colDef.dbType
        this.uiType = fieldConfig?.uiType || 'text'
        this.precision = colDef.precision
        this.mask = colDef.mask
        this.option = fieldConfig?.options
        this.defaultStyle = {};
        this.total = (colDef.hasTotal!==undefined) && colDef.hasTotal
    }

    /**
     *
     * @param object
     */
    public initFromObject(object: any): void {

        // valeurs par défaut si un objet est passé
        if (object === undefined)
            return

        switch (typeof object) {
            case "object":
                if (object instanceof Date) {
                    this.dbType = "date"
                    this.mask = "DD/MM/YYYY"
                } else {
                    this.dbType = "string"
                }
                break;
            case "boolean":
                this.dbType = "boolean"
                break;
            case "number":
                this.dbType = "number"
                this.precision = (object.toString().search(/\./) > 0) ? 2 : 0
                break;
            case "string":
                this.dbType = "string"
                break;
            case "function":
            case "symbol":
            case "bigint":
            case "undefined":
                throw new Error(`Type de colonne non pris en charge (${typeof object})`)
        }
    }
}

/**
 * Factory pour créer des instances de TcdColumn de manière fluide
 */
export const createColumn = (
    name: string,
    width: number = 100,
    colDef: ColumnDefinition = defaultColDef,
    fieldConfig: FieldConfig = {}
): IColumn => {

    return new _Column(name, width, colDef, fieldConfig)
}

/**
 *
 * @param object
 */
export const createColumnsFromObject = <T,> (
    object: any,
): IColumn[] => {

    return Object.keys(object).map((key: string) => {
        const colDef:IColumn = createColumn(key)
        colDef.initFromObject(object[key])
        return colDef
    })
}







/**
 * Fusionne deux objets en ignorant les propriétés 'undefined' du second.
 * @param {Object} target - L'objet de base (priorité basse)
 * @param {Object} source - L'objet à appliquer (priorité haute, sauf undefined)
 */
// private merge(target: any, source: any) {
//     const cleanedSource = Object.fromEntries(
//         Object.entries(source).filter(([_, value]) => value !== undefined)
//     );
//
//     return { ...target, ...cleanedSource };
// };
