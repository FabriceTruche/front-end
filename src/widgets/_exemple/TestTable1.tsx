import * as React from 'react'
import {useEffect, useState} from "react"
import {AnyObject, Column} from "../../common/common";
import {defaultTableData, Table, TableData, ViewportCellArray} from "../Table/Table";
import {ViewportData} from "../../containers/Viewport/ViewportDefinitions";
import {dataGen, GenColumn} from "../../helper/GenHelper";

export const TestTable1 = () => {
    const [rows, setRows] = useState<AnyObject[]>([])
    const [collection, setCollection] = useState<TableData>(defaultTableData)
    const [item,setItem] = useState<ViewportCellArray|undefined>()
    const [text,setText] = useState("")

    useEffect(() => {
        const schema: GenColumn[] = [
            { name: "id", type: "index" },
            { name: "numero", type: "number" },
            { name: "date_entree", type: "Date" },
            { name: "date_sortie", type: "Date", ratioNull: 0.1 },
            { name: "libelle", type: "string" },
            { name: "adresse", type: "string", ratioNull: 0.8, min: 2, max: 10 }
        ]
        const rows = dataGen.generateData(schema, 300)
        const collection: TableData | null = dataGen.convertToDataTable(rows,schema)

        setRows([...rows])
        setCollection(collection)
        console.log(collection.columns.length)
    }, [])

    const sortData=(column:string,sort:number): AnyObject[] => {
        if (sort===0)
            return [...rows]

        const res:number = (sort===1)?1:-1

        return collection.data.sort((item1:AnyObject, item2:AnyObject)=>{
            if (item1[column]===null) return -res
            if (item2[column]===null) return res

            if (item1[column]<item2[column]) return -res
            if (item1[column]>item2[column]) return res
            return 0
        })
    }

    const filterData=(text:string): AnyObject[] => {
        const result: AnyObject[] = []

        if (text==="")
            return rows

        const re = new RegExp(text,'i')

        rows.forEach((row: AnyObject) => {
            let isValid: boolean = false
            for (let i = 0; i < collection.columns.length; i++) {
                const col:string=collection.columns[i].name
                const value:any=row[col]

                if (value) {
                    const valueStr:string=value.toString()
                    // console.log(text)
                    if (re.test(valueStr)) {
                        isValid=true
                        break
                    }
                }
            }
            if (isValid) {
                result.push(row)
            }
        })

        return result
    }

    if (collection.columns.length===0)
        return null

    return (
        <div>
            <Table
                findOption={true}
                dbCollection={collection}
                viewportHeight={400}
                onMouseOver={(cell:ViewportCellArray)=>{
                    setItem(cell)
                }}
                onClickHeader={(indexHeader:number,cell:ViewportData<ViewportCellArray>)=>{
                    const newSort = (collection.columns[indexHeader].sort+1)%3
                    const newRows = sortData(collection.columns[indexHeader].name,newSort)

                    // console.log('>',indexHeader,newSort,newRows)

                    collection.columns.forEach((c:Column)=>c.sort=0)
                    collection.columns[indexHeader].sort=newSort

                    setText(`Sort of ${collection.columns[indexHeader].name} / Sort direction : ${newSort}`)
                    setCollection({
                        data: newRows,
                        columns: [...collection.columns]
                    })
                    // setKey(helper.genKey())
                }}
                onFind={(text:string)=>{
                    // console.log('>',text)
                    const newRows: AnyObject[] = filterData(text)
                    setCollection({
                        data: newRows,
                        columns: [...collection.columns]
                    })
                }}
            />
            {item && (
                <>
                    Item under cursor : {item.typeCell} / {item.value ? item.value.toString() : "null"}
                    <br/>
                    {text}
                </>
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
