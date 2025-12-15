import * as React from 'react'
import {AnyObject} from "../../common/common";
import {Table} from "../../widgets/Table/Table";
import {ITableData} from "../../widgets/Table/TableData";
import {TypeExemple} from "./TypeExemples";
import {DataFormatter} from "../../widgets/Table/DataFormatter";
import {GenColumn, helper} from "../../common/Helper";


function createDummyData(): ITableData<TypeExemple> {

    const schema: GenColumn[] = [
        { name: "id", type: "index", label:"Id" },
        { name: "numero", type: "integer", label:"Numéro" },
        { name: "date_entree", type: "Date", label:"Date d'entrée" },
        { name: "date_sortie", type: "Date", label: "Date de sortie", ratioNull: 0.1 },
        { name: "montant", type: "float", label: "Montant total", min:-500, max:999 },
    ]
    const rows: any[] = helper.generateData(schema, 100)
    const collection: ITableData<TypeExemple> = helper.convertToDataTable(rows,schema)

    // totaux
    // collection.totals = {}
    collection.setTotals("montant", collection.data.reduce((pv: number, cv: AnyObject)=>pv + cv["montant"], 0))
    collection.setTotals("numero", collection.data.reduce((pv: number, cv: AnyObject)=>pv + cv["numero"], 0))
    collection.setTotals("id", collection.data.reduce((pv: number, cv: AnyObject)=>pv + cv["id"], 0))

    // formatter
    collection.columns[2].bodyDataFormatter = DataFormatter.shortDateFormatter
    collection.columns[3].bodyDataFormatter = DataFormatter.shortDateFormatter
    collection.columns[4].bodyDataFormatter = DataFormatter.coloredCurrencyFormatter
    collection.columns[4].footerDataFormatter = DataFormatter.currencyFormatter

    return collection
}


export const TestTable2 = () => {
    // const [collection, setCollection] = useState<TableData<TypeExemple>>()
    // if (collection.columns.length===0)
    //     return <div>In progress ...</div>

    return (
        <div>
            <Table
                dataRows={createDummyData()}
                allowEdit={false}
                allowFind={false}
                viewportHeight={400}
            />
        </div>
    )
}


//
// {cellData && rowData  && (
//     <div>
//         <br/>
//         <pre>{JSON.stringify(cellData,null,3)}</pre>
//         <pre>{JSON.stringify(rowData,null,3)}</pre>
//     </div>
// )}





// useEffect(() => {
//     const schema: GenColumn[] = [
//         { name: "id", type: "index", label:"Id" },
//         { name: "numero", type: "integer", label:"Numéro" },
//         { name: "date_entree", type: "Date", label:"Date d'entrée" },
//         { name: "date_sortie", type: "Date", label: "Date de sortie", ratioNull: 0.1 },
//         { name: "montant", type: "float", label: "Montant total", min:-500, max:999 },
//     ]
//     const rows: any[] = genHelper.generateData(schema, 100)
//     const collection: TableData<TypeExemple> = genHelper.convertToDataTable(rows,schema)
//
//     // totaux
//     collection.totals = {}
//     collection.totals["montant"] = collection.data.reduce((pv: number, cv: AnyObject)=>pv + cv["montant"], 0)
//     collection.totals["numero"] = collection.data.reduce((pv: number, cv: AnyObject)=>pv + cv["numero"], 0)
//     collection.totals["id"] = collection.data.reduce((pv: number, cv: AnyObject)=>pv + cv["id"], 0)
//
//     // formatter
//     collection.columns[4].dataFormat = DataFormatter.coloredCurrencyFormatter
//     collection.columns[2].dataFormat = DataFormatter.shortDateFormatter
//     collection.columns[3].dataFormat = DataFormatter.shortDateFormatter
//
//     // setRows([...rows])
//     setCollection(collection)
// }, [])
//


// onMouseOver={(cell:ViewportTableInfoCell)=>{
//     setItem(cell)
// }}
/*
onClick={(cell:CellData)=>{
    const data: string = JSON.stringify(cell,null,3)
    setText(data)
}}
 */
// const [cellData,setCellData] = useState<ViewportTableInfoCell>()
// const [rowData,setRowData] = useState<TableRow>()

