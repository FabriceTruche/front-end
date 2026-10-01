export const ColumnDataTypeArray = ['text','number','currency','date','boolean'] as const
export type ColumnDataType = typeof ColumnDataTypeArray[number]

export const InputTypeArray = [
    'text','tel','textarea','url','email','password',
    'range','number',
    'currency','int','real',
    'date','month','time','week','year',
    'boolean',
    'list','choices',
] as const

export type InputType = typeof InputTypeArray[number]

/** Types pour le tri */
export type SortOrder = 'ASC' | 'DESC' | null

export type ColumnDefinition = {
    dataType?: ColumnDataType
    precision?: number
    mask?: string
    hasTotal?: boolean
    label?: string
}

