import {GenColumn, helper} from "../../common/Helper";
import {ITcdColumn} from "../../widgets/Tcd/model/TcdColumn";
import {factory} from "../../common/Factory";
import {ITcdManager} from "../../widgets/Tcd/model/TcdManager";
import {useMemo} from "react";
import {IMeasure} from "../../widgets/Tcd/model/Measure";
import {functionsGroup} from "../../widgets/Tcd/model/functionsGroup";
import {ITcdViewManager, TcdMode, DisplayValue} from "../../widgets/Tcd/model/TcdViewManager";
import {TcdView} from "../../widgets/Tcd/component/TcdView";
import {TcdTable} from "../../widgets/Tcd/component/TcdTable";

function createDummyData<T>(): [ITcdManager<T>,ITcdViewManager<T>] {
    const maxRowCount = 100
    const schema: GenColumn[] = [
        { name: "id", type: "index", label:"Id" },
        { name: "lot", total: false , type: "integer", label:"Lot", items: [1,2,3,4,7,8,9,10,11] },
        { name: "type_op", type: "string", label: "Opération", items:["ACHAT","REGUL","SOLDE","OD"] },
        { name: "depot", type: "integer", label: "Dépôt", items: [100, 200, 350, 450, 500, 650, 620, 680, 820, 1000, 1200, 2000] },
        { name: "facture", total: true, type: "string", label: "Facturation", items:["REG","APA","ENC","INC"] },
        { name: "annee", total: false, type: "integer", label: "Année", items: [2020,2023, 2024, 2025] },
        { name: "code", total: true, type: "Date", label:"Code", items:["001","002"] },
        { name: "libelle", type: "string", label:"Libellé" },
        { name: "periode", type: "Date", label: "Période" },
        { name: "debit", type: "integer", label: "Débit"/*, items:[10,20,30,40,50] */},
        { name: "credit", type: "integer", label: "Crédit", items:[1,2,3,4,5] },
    ]
    const columns: ITcdColumn[] = helper.generateTcdColumn(schema)
    // columns[9].dataFormatter = DataFormatter.currencyFormatter // sum debit
    // columns[10].dataFormatter = DataFormatter.numberFormatter // count credit

    const data: any[] = helper.generateData(schema, maxRowCount, (row:any)=>{
        // if (helper.tf())
        //     row.debit=null
        // else
        //     row.credit=null
    })
    const tcdManager = factory.createTcdManager<any>(data, columns)
    const sum1: IMeasure = factory.createMeasure(columns[9],functionsGroup.sum)
    const sum2: IMeasure = factory.createMeasure(columns[10],functionsGroup.sum)

    tcdManager.buildTcd(["facture","annee"],["code","lot"],[sum1,sum2])

    const tcdViewManager = factory.createTcdViewManager<any>()
    tcdViewManager.buildTcdView(tcdManager)

    return [tcdManager,tcdViewManager]
}

export const Tcd3=()=> {
    const [tcd,tcdv] = useMemo<[ITcdManager<any>,ITcdViewManager<any>]>(() => {
        return createDummyData()
    }, [])

    return (
        <div>
            {/*<TcdTable tcdManager={tcd} />*/}
            <TcdView tcdViewManager={tcdv} />
        </div>
    )
}

