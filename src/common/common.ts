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
export type ResponseQuery = {
    data: any[]
    meta: any[]
    error?: any
}
export function ifNull(ifExpIsNull: any, thenExp: any): any {
    if (!!ifExpIsNull)
        return thenExp
    return ifExpIsNull
}