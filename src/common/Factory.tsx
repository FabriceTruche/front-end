import {FC} from "react";
import {IFormatter} from "../widgets/Table/IFormatter";
import {_FieldEditor, IFieldEditor} from "../widgets/Table/IFieldEditor";
import {_Column, IColumn} from "../widgets/Table/Column";
import {_TableData, ITableData} from "../widgets/Table/TableData";
import {_TableManager, ITableManager} from "../widgets/Table/TableManager";
import {_Tcd, ITcdColumn} from "../widgets/Tcd/Column";
import {_Field, IField} from "../widgets/Tcd/Field";
import {_TcdManager, ITcdManager} from "../widgets/Tcd/TcdManager";
import {_MeasureValue, IMeasureValue} from "../widgets/Tcd/MeasureValue";
import {FuncType} from "../widgets/Tcd/functionsGroup";
import {_Measure, IMeasure} from "../widgets/Tcd/Measure";

export interface IFactory {

    // table
    createColumn(name: string, type: string, label?: string, dataFormat?: IFormatter | undefined, editor?: IFieldEditor | undefined): IColumn
    createTableData<T>(data?: T[], columns?: IColumn[]): ITableData<T>
    createFieldEditor(jsx?: FC<any> | undefined, properties?: any | undefined): IFieldEditor
    createTableManager<T>(data: ITableData<T>, elementId: string): ITableManager<T>

    // tcd
    createTcdColumn(name: string, type: string, label?: string): ITcdColumn
    createMeasure(column: ITcdColumn, funcGroup: FuncType): IMeasure
    createMeasureValue<T>(rowField: IField<T>, colField: IField<T>, dataRows: T[], measure: IMeasure): IMeasureValue<T>
    createField<T>(value: any, column: ITcdColumn): IField<T>
    createTcdManager<T>(data: T[], columns: ITcdColumn[]): ITcdManager<T>
}

class _Factory implements IFactory {

    public createColumn(name: string, type: string, label:string="", dataFormat:IFormatter|undefined=undefined, editor:IFieldEditor|undefined=undefined): IColumn {
        return new _Column(name,type,label,dataFormat,editor)
    }

    public createTableData<T>(data: T[]=[], columns: IColumn[]=[]): ITableData<T> {
        return new _TableData(data,columns)
    }

    public createTableManager<T>(data: ITableData<T>, elementId: string):ITableManager<T> {
        return new _TableManager<T>(data, elementId)
    }

    public createFieldEditor(jsx: FC<any> | undefined = undefined, properties: any | undefined = undefined): IFieldEditor {
        return new _FieldEditor(jsx, properties)
    }

    public createTcdColumn(name: string, type: string, label:string="") {
        return new _Tcd(name,type,label)
    }

    public createMeasure(column: ITcdColumn, funcGroup: FuncType): IMeasure {
        return new _Measure(column, funcGroup)
    }

    public createMeasureValue<T>(rowField: IField<T>, colField: IField<T>, dataRows: T[], measure: IMeasure): IMeasureValue<T> {
        return new _MeasureValue<T>(rowField, colField, dataRows, measure)
    }

    public createField<T>(value: any, column: ITcdColumn): IField<T> {
        return new _Field(value, column)
    }

    public createTcdManager<T>(data: T[], columns: ITcdColumn[]): ITcdManager<T> {
        return new _TcdManager(data,columns)
    }
}

export const factory: IFactory = new _Factory()
