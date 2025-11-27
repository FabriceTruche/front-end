export type AnyObject = {
    [property:string]: any
}
export type DbColumn = {
    db: string
    schema: string
    name: string
    table: string
    orgName: string
    orgTable: string
    type: string
}
export type Column = {
    name: string
    type: string
    sort: number
    filter: string
    label: string
}
export type ResponseQuery = {
    data: any[]
    meta: any[]
    error?: any
}
export type DataResult = {
    data:any[]
    sql:string
}
