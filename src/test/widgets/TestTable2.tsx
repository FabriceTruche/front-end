import * as React from 'react'
import {useEffect, useState} from "react"
import {AnyObject} from "../../common/common";
import {genHelper, GenColumn} from "../../helper/GenHelper";
import {Table, ViewportTableInfoCell} from "../../widgets/Table/Table";
import {defaultTableData, TableData} from "../../widgets/Table/TableData";
import {TypeExemple} from "./ExemplesType";
import {DataFormatter} from "../../widgets/Table/DataFormatter";


export const TestTable2 = () => {
    const [rows, setRows] = useState<TypeExemple[]>([])
    const [collection, setCollection] = useState<TableData<TypeExemple>>(defaultTableData)
    const [item,setItem] = useState<ViewportTableInfoCell|undefined>()
    const [text,setText] = useState("")

    useEffect(() => {
        const schema: GenColumn[] = [
            { name: "id", type: "index", label:"Id" },
            { name: "numero", type: "integer", label:"Numéro" },
            { name: "date_entree", type: "Date", label:"Date d'entrée" },
            { name: "date_sortie", type: "Date", label: "Date de sortie", ratioNull: 0.1 },
            { name: "montant", type: "float", label: "Montant total", min:-500, max:999 },
        ]
        const rows: any[] = genHelper.generateData(schema, 100)
        const collection: TableData<TypeExemple> = genHelper.convertToDataTable(rows,schema)

        // totaux
        collection.totals = {}
        collection.totals["montant"] = collection.data.reduce((pv: number, cv: AnyObject)=>pv + cv["montant"], 0)
        collection.totals["numero"] = collection.data.reduce((pv: number, cv: AnyObject)=>pv + cv["numero"], 0)
        collection.totals["id"] = collection.data.reduce((pv: number, cv: AnyObject)=>pv + cv["id"], 0)

        // formatter
        collection.columns[4].dataFormat = DataFormatter.coloredCurrencyFormatter
        collection.columns[2].dataFormat = DataFormatter.shortDateFormatter
        collection.columns[3].dataFormat = DataFormatter.shortDateFormatter

        setRows([...rows])
        setCollection(collection)
    }, [])

    if (collection.columns.length===0)
        return <div>In progress ...</div>

    return (
        <div>
            <Table
                dataRows={collection}
                allowEdit={true}
                allowFind={false}
                viewportHeight={400}
                // onMouseOver={(cell:ViewportTableInfoCell)=>{
                //     setItem(cell)
                // }}
                /*
                onClick={(cell:CellData)=>{
                    const data: string = JSON.stringify(cell,null,3)
                    setText(data)
                }}
                 */
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

