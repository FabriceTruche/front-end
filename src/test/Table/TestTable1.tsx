import * as React from 'react'
import {useMemo, useState} from "react"
import {Table, ViewportTableInfoCell} from "../../widgets/Table/Table";
import {ITableData} from "../../widgets/Table/TableData";
import {TypeExemple} from "./TypeExemples";
import {GenColumn, helper} from "../../common/Helper";


function createDummyData(): ITableData<TypeExemple> {
    const schema: GenColumn[] = [
        {name: "id", type: "index"},
        {name: "numero", type: "integer"},
        {name: "date_entree", type: "Date"},
        {name: "date_sortie", type: "Date", ratioNull: 0.1},
        {name: "libelle", type: "string"},
        {name: "adresse", type: "string", ratioNull: 0.8, min: 2, max: 10}
    ]
    const rows = helper.generateData(schema, 300)
    const collection: ITableData<TypeExemple> = helper.convertToDataTable(rows, schema)

    // collection.getColumn("adresse").editor = {
    //     jsx: Textarea,
    //     properties: { rows: 5}
    // }
    // collection.getColumn("date_sortie").editor = {
    //     properties: { type: "date" }
    // }
    // const editors = {
    //     editors: {
    //         adresse: Textarea,
    //     },
    //     properties: {
    //         adresse: {
    //             rows: 5
    //         },
    //         date_sortie: {
    //             type: "date"
    //         }
    //     }
    // }

    return collection
}

export const TestTable1 = () => {
    const [cellData, setCellData] = useState<ViewportTableInfoCell>()
    const collection:ITableData<TypeExemple> = useMemo(()=>createDummyData(),[])

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Table
                allowEdit={false}
                allowFind={true}
                dataRows={collection}
                viewportHeight={400}
                onClick={(cell:ViewportTableInfoCell)=>{
                    setCellData(cell)
                }}
            />
            {cellData && (
                <pre>
                    {JSON.stringify(cellData, null, 3)}
                </pre>
            )}

        </div>
    )
}












// const [lot, setLot] = useState<DbCollection>({meta: [], data: []})
// useEffect(() => {
//     // const sql = 'select id,nom,patternReleve,LoyerPrincipal,TaxeFonciere from majestim.contrat'
//     const sql = 'select * from majestim.lot'
//
//     fetch('http://192.168.0.57:3001/api/query?_noPagine', {
//         // fetch('http://maj.freeboxos.fr:33001/api/query?_noPagine', {
//         headers: {'Accept': 'application/json'},
//         method: "POST",
//         body: sql
//     }).then((response) => response.json()).then((response: any) => {
//         // console.log(response.result)
//         if (response.error === undefined) {
//             setLot(response.result)
//         }})
// }, [])


// const sortData = (column: string, sort: number): TypeExemple[] => {
//     if (sort === 0)
//         return [...rows]
//
//     const res: number = (sort === 1) ? 1 : -1
//
//     return collection.data.sort((item1: AnyObject, item2: AnyObject) => {
//         if (item1[column] === null) return -res
//         if (item2[column] === null) return res
//
//         if (item1[column] < item2[column]) return -res
//         if (item1[column] > item2[column]) return res
//         return 0
//     })
// }
//
// const filterData = (text: string): TypeExemple[] => {
//     const result: TypeExemple[] = []
//
//     if (text === "")
//         return rows
//
//     const re = new RegExp(text, 'i')
//
//     rows.forEach((row: TypeExemple) => {
//         let isValid: boolean = false
//         for (let i = 0; i < collection.columns.length; i++) {
//             const col: keyof TypeExemple = collection.columns[i].name as keyof TypeExemple
//             const value: any = row[col]
//
//             if (value) {
//                 const valueStr: string = value.toString()
//                 // console.log(text)
//                 if (re.test(valueStr)) {
//                     isValid = true
//                     break
//                 }
//             }
//         }
//         if (isValid) {
//             result.push(row)
//         }
//     })
//
//     return result
// }

/* {cellData && (
                <div>
                    <Editor
                        key={cellData.id}
                        object={cellData.value}
                        editors={editors.editors}
                        properties={editors.properties}
                    />
                </div>
            )}
            */


// const [rows, setRows] = useState<TypeExemple[]>([])
// const [collection, setCollection] = useState<TableData<TypeExemple>>(defaultTableData)
// const [item, setItem] = useState<ViewportTableInfoCell | undefined>()
// const [text, setText] = useState("")
// const [editors, setEditors] = useState<EditorConf>({})

// useEffect(() => {
// setRows([...rows])
// setCollection(collection)
// }, [])
// if (collection.columns.length === 0)
//     return null

// console.log(collection)
// console.log(editors)
// onMouseOver={(cell: ViewportTableInfoCell) => {
//     setItem(cell)
// }}
// onClickHeader={(indexHeader: number, cell: ViewportTableInfoCell) => {
//     const newSort = (collection.columns[indexHeader].sort + 1) % 3
//     const newRows = sortData(collection.columns[indexHeader].name, newSort)
//
//     // console.log('>',indexHeader,newSort,newRows)
//
//     collection.columns.forEach((c: Column) => c.sort = 0)
//     collection.columns[indexHeader].sort = newSort
//
//     setText(`Sort of ${collection.columns[indexHeader].name} / Sort direction : ${newSort}`)
//     setCollection({
//         data: newRows,
//         columns: [...collection.columns]
//     })
//     // setKey(helper.genKey())
// }}
// onFind={(text: string) => {
//     // console.log('>',text)
//     const newRows: TypeExemple[] = filterData(text)
//     setCollection({
//         data: newRows,
//         columns: [...collection.columns]
//     })
// }}
// onClick={(cell: CellDataSelection) => {
//     setCellData(cell)
// }}
// {/*{item && (*/}
// {/*    <div>*/}
// {/*        Item under cursor : {item.typeCell} / {item.value ? item.value.toString() : "null"}*/}
// {/*        <br/>*/}
// {/*        {text}*/}
// {/*    </div>*/}
// {/*)}*/}
