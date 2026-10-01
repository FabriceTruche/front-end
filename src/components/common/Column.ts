import { CSSProperties } from 'react';
import {ColumnDataType, ColumnDefinition} from "./ColumnDefinition";
import {SelectOption} from "../../containers/Form/FormComponents";
import {FieldConfig} from "../../containers/Form/FormObject";

export interface IColumnFormat {
    type: ColumnDataType;
    precision?: number;
    mask?: string;
    list?: SelectOption[]
}

export interface IColumn {
    name: string;
    label: string;
    width: number;
    total: boolean;
    format?: IColumnFormat;
    defaultStyle?: CSSProperties;
}

export class _Column implements IColumn {
    public readonly name: string;
    public readonly label: string;
    public readonly width: number;
    public readonly total: boolean;
    public readonly format?: IColumnFormat;
    public readonly defaultStyle?: CSSProperties;
    // public readonly list?:FieldConfig

    constructor(
        name: string,
        value: any|null,
        width: number,
        options: ColumnDefinition|undefined,
        fieldConfig: FieldConfig|undefined,
    ) {
        let colOption: ColumnDefinition = {}

        // valeurs par défaut si un objet est passé
        if (value !== null) {
            switch (typeof value) {
                case "object":
                    if (value instanceof Date) {
                        colOption.dataType = "date"
                        colOption.mask = "DD/MM/YYYY"
                    } else {
                        colOption.dataType = "text"
                    }
                    break;
                case "boolean":
                    colOption.dataType = "boolean"
                    break;
                case "number":
                    colOption.dataType = "number"
                    colOption.precision = (value.toString().search(/\./) > 0) ? 2 : 0
                    break;
                case "string":
                    colOption.dataType = "text"
                    break;
                case "function":
                case "symbol":
                case "bigint":
                case "undefined":
                    throw new Error(`Type de colonne non pris en charge (${typeof value})`)
            }
        }

        // merge des valeurs par défaut calculées à partir des data avec la config
        if (options!==undefined)
            colOption = this.merge(colOption, options)



        this.name = name;
        this.label = colOption.label || name
        this.width = width;
        this.format = {type: colOption.dataType as ColumnDataType, mask: colOption.mask, precision: colOption.precision, list: fieldConfig?.options};
        this.defaultStyle = {};
        this.total = (colOption.hasTotal!==undefined) && colOption.hasTotal
    }

    /**
     * Fusionne deux objets en ignorant les propriétés 'undefined' du second.
     * @param {Object} target - L'objet de base (priorité basse)
     * @param {Object} source - L'objet à appliquer (priorité haute, sauf undefined)
     */
    private merge(target: any, source: any) {
        const cleanedSource = Object.fromEntries(
            Object.entries(source).filter(([_, value]) => value !== undefined)
        );

        return { ...target, ...cleanedSource };
    };
}

/**
 * Factory pour créer des instances de TcdColumn de manière fluide
 */
export const createColumn = (
    name: string,
    value: any|null = null,
    width: number = 100,
    options: ColumnDefinition = {},
    fieldConfig: FieldConfig = {}
): IColumn => {

    return new _Column(name, value, width, options, fieldConfig)
}

/**
 *
 * @param data
 * @param configOptions
 */
export const createColumns = <T,> (
    data: T[],
    configOptions: Record<string, ColumnDefinition>
): IColumn[] => {

    if (data.length===0)
        return []

    const object: any = data[0]

    return Object.keys(object).map((key: string) => createColumn(key,object,100,configOptions[key]))
}
