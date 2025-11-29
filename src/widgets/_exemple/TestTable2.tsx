import * as React from 'react'
import {useEffect, useState} from "react"
import {AnyObject, Column} from "../../common/common";
import {CellData, defaultTableData, Table, TableData, ViewportCellArray} from "../Table/Table";
import {dataGen, GenColumn} from "../../helper/GenHelper";
import {IViewportManager} from "../../containers/Viewport/ViewportDefinitions";

export const TestTable2 = () => {
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
        ]
        const rows = dataGen.generateData(schema, 100)
        const collection: TableData | null = dataGen.convertToDataTable(rows,schema)

        setRows([...rows])
        setCollection(collection)
        console.log(collection.columns.length)
    }, [])

    if (collection.columns.length===0)
        return null

    return (
        <div>
            <Table
                dbCollection={collection}
                viewportHeight={400}
                onMouseOver={(cell:ViewportCellArray)=>{
                    setItem(cell)
                }}
                onClick={(cell:CellData, info: IViewportManager)=>{
                    // const obj: any = {...cell}
                    // obj["firstVisible"]=info.firstVisibleRow()
                    // obj["collection"]=[cell.row[cell.rowIndex]]
                    const data: string = JSON.stringify(cell,null,3)
                    setText(data)
                }}
            />
            {item && (
                <div>
                    Json object for selected item ({item.typeCell} / {item.value && item.value.toString()}
                    <br/>
                    <pre>{text}</pre>
                </div>
            )}
        </div>
    )
}

