import {GenColumn, helper} from "../../common/Helper";
import {ITcdColumn} from "../../widgets/Tcd/model/TcdColumn";
import {factory} from "../../common/Factory";
import {createTcdManager, ITcdManager} from "../../widgets/Tcd/model/TcdManager";
import {useMemo} from "react";
import {createMeasure, IMeasure} from "../../widgets/Tcd/model/Measure";
import {functionsGroup} from "../../widgets/Tcd/model/functionsGroup";
import {createTcdViewManager, ITcdViewManager} from "../../widgets/Tcd/model/TcdViewManager";
import {TcdView} from "../../widgets/Tcd/component/TcdView";
import {DataFormatter} from "../../widgets/Table/DataFormatter";

function createDummyData<T>(): [ITcdManager<T>,ITcdViewManager<T>] {
    const maxRowCount = 20
    const schema: GenColumn[] = [
        { name: "id", type: "index", label:"Id" },
        { name: "lot", total: false , type: "integer", label:"Lot", items: [1,2,3,4/*,7,8,9,10,11*/] },
        { name: "type_op", total: false, type: "string", label: "Opération", items:["ACHAT","REGUL","SOLDE","OD"] },
        { name: "depot", type: "integer", label: "Dépôt", items: [100, 200, 350, 450, 500, 650, 620, 680, 820, 1000, 1200, 2000] },
        { name: "facture", total: true, type: "string", label: "Fac.", items:["REG","APA","ENC","INC"] },
        { name: "annee", total: false, type: "integer", label: "Année", items: [2020,2023, 2024, 2025] },
        { name: "code", total: false, type: "integer", label:"Code", min: 99, max: 5999 },
        { name: "libelle", type: "string", label:"Libellé" },
        { name: "periode", type: "Date", label: "Période" },
        { name: "debit", type: "integer", label: "Débit"/*, items:[10,20,30,40,50] */},
        { name: "credit", type: "integer", label: "Crédit"/*, items:[1,2,3,4,5]*/ },
    ]
    const columns: ITcdColumn[] = helper.generateTcdColumn(schema)
    // columns[9].dataFormatter = DataFormatter.numberFormatter // sum debit
    // columns[10].dataFormatter = DataFormatter.numberFormatter // count credit
    columns[8].dataFormatter = DataFormatter.shortPeriodeFormatter

    const data: any[] = helper.generateData(schema, maxRowCount, (row:any)=>{
        // if (helper.tf())
        //     row.debit=null
        // else
        //     row.credit=null
    })
    const tcdManager = createTcdManager<any>(data, columns)
    const count1: IMeasure = createMeasure(columns[9],functionsGroup.count)
    const sum2: IMeasure = createMeasure(columns[10],functionsGroup.sum)

    tcdManager.buildTcd(["facture","annee"],["type_op"],[count1])

    const tcdViewManager = createTcdViewManager<any>()
    tcdViewManager.buildTcdView(tcdManager)

    return [tcdManager,tcdViewManager]
}

export const Tcd3=()=> {
    const [tcd,tcdv] = useMemo<[ITcdManager<any>,ITcdViewManager<any>]>(() => {
        return createDummyData()
    }, [])

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
        }}>
            {/*<TcdTable tcdManager={tcd} />*/}
            {/*<Block>*/}

            {/*    <FieldTrace field={tcd.rowTreeField} level={0} />*/}
            {/*</Block>*/}
            {/*<Block>*/}
            {/*    <FieldTrace field={tcd.colTreeField} level={0} />*/}
            {/*</Block>*/}
            {/*<Block>*/}
            {/*    <TerminalTrace fields={tcd.rowsTerminalField} title="*ROW TERMINALS*"/>*/}
            {/*    <TerminalTrace fields={tcd.colsTerminalField} title="*COLS TERMINALS*"/>*/}
            {/*</Block>*/}
            {/*<Block>*/}
            {/*    <MeasuresValueTrace measuresValue={tcd.measuresValue} />*/}
            {/*</Block>*/}

            <TcdView tcdViewManager={tcdv}/>

            {/*<Block>*/}
            {/*    <CellTrace cell={tcdv.rowsCell} title="ROWS_CELL"/>*/}
            {/*    <CellTrace cell={tcdv.colsCell} title="COLS_CELL"/>*/}
            {/*</Block>*/}
        </div>
    )
}

