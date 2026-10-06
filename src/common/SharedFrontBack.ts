
export type DbType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'date'

export type UiType =
    | 'checkbox'
    | 'datalist'
    | 'date'
    | 'datetime'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'select'
    | 'tel'
    | 'text'
    | 'textarea'
    | 'time'
    | 'url'

export type DbIntrinsicType =
    | 'DECIMAL'
    | 'TINY'
    | 'SHORT'
    | 'LONG'
    | 'FLOAT'
    | 'DOUBLE'
    | 'NULL'
    | 'TIMESTAMP'
    | 'LONGLONG'
    | 'INT24'
    | 'DATE'
    | 'TIME'
    | 'DATETIME'
    | 'YEAR'
    | 'NEWDATE'
    | 'VARCHAR'
    | 'BIT'
    | 'JSON'
    | 'NEWDECIMAL'
    | 'ENUM'
    | 'SET'
    | 'TINY_BLOB'
    | 'MEDIUM_BLOB'
    | 'LONG_BLOB'
    | 'BLOB'
    | 'VAR_STRING'
    | 'STRING'
    | 'GEOMETRY'
    | 'UNKNOWN';

export interface MetaDataItem {
    uiType: UiType;
    dbType: DbType;
    dbIntrinsicType: DbIntrinsicType;
    dbIntrinsicTypeId: number;
    isNullable: boolean;
    isPrimaryKey: boolean;
    isAutoIncrement: boolean;
    isUnique: boolean;
    isReal: boolean;
    isForeignKey: boolean;
    isEnum: boolean;
    isCurrency: boolean
    foreignTable?: string;
    enumValues?: string[];
    maxLength?: number;
    decimals?: number;
}
export type MetaData = Record<string, MetaDataItem>
