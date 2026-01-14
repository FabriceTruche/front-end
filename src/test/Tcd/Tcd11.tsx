import {GenColumn, helper} from "../../common/Helper";
import React, {useMemo} from "react";
import {TcdViewMain} from "../../widgets/Tcd/Version2/view/TcdViewMain";
import {functionsGroup} from "../../widgets/Tcd/Version2/functionsGroup";
import {TcdConfig} from "../../widgets/Tcd/Version2/view/TcdConfig";

// GENERATE DATA
const maxRowCount = 200
const schema: GenColumn[] = [
    { name: "id", type: "index", label:"Id" },
    { name: "lot", total: false , type: "integer", label:"Lot", items: [1,2,3,4/*,7,8,9,10,11*/] },
    { name: "type_op", total: false, type: "string", label: "Opération", items:["ACHAT","REGUL","SOLDE","OD"] },
    { name: "depot", type: "integer", label: "Dépôt", items: [100, 200, 350, 450, 500, 650, 620, 680, 820, 1000, 1200, 2000] },
    { name: "facture", total: false, type: "string", label: "Fac.", items:["REG","APA","ENC","INC","AA1","AA2","AA3","ZZO"] },
    { name: "annee", total: false, type: "integer", label: "Année", items: [2020,2023, 2024, 2025] },
    { name: "code", total: true, type: "float", label:"Code", min: 99, max: 5999 },
    { name: "libelle", type: "string", label:"Libellé" },
    { name: "periode", type: "Date", label: "Période" },
    { name: "debit", type: "float", label: "Débit"/*, items:[10,20,30,40,50] */},
    { name: "credit", type: "float", label: "Crédit"/*, items:[1,2,3,4,5]*/ },
]
const data: any[] = helper.generateData(schema, maxRowCount)

// CREATION DE LA CONFIG
const config: TcdConfig = {
    allColumns: schema.map((gc: GenColumn)=>gc.name),
    rows: ["facture","annee"],
    columns: ["type_op"],
    // measures: ["debit","credit","id"],
    measures: ["id"],
    groupByFuncs:
        {
            debit: functionsGroup.sum,
            credit: functionsGroup.avg,
            id: functionsGroup.sum,
        },
    filters: [],
    filters_values: {},
    sorts: {},
    options: {
        facture: {
            hasTotal: false,
        },
        annee: {
            hasTotal: true
        }
    }
}

export const Tcd11=()=> {
    return (
        <TcdViewMain
            config={config}
            data={data}
        />
    )
}






// CREATION DU MANAGER
// const tcdManager = createTcdManager<any>()

// CREATION DES MESURES
// const count: IMeasure|null = tcdManager.createMeasure("debit","count")
// const sum: IMeasure|null = tcdManager.createMeasure("credit","sum")
// const avg: IMeasure|null = tcdManager.createMeasure("id","avg")

// CONSTRUCTION DU TCD
// tcdManager.buildTcd(
//     ["facture", "annee", "periode"],
//     ["type_op"],
//     [avg,sum,count],
// )

// CREATION DES COLONNES
// const idCol = createTcdColumn('id', 100, 'number', { precision: 1 })
// const lotCol = createTcdColumn('lot', 100, 'number', { precision: 0, total: false })
// const typeOpCol = createTcdColumn('type_op', 100, 'text', { precision: 1, total: true })
// const depotCol = createTcdColumn('depot', 100, 'number', { precision: 1 })
// const factureCol =  createTcdColumn('facture', 100, 'text', { total: true })
// const anneeCol = createTcdColumn('annee', 100, 'number', { precision: 0 })
// const codeCol = createTcdColumn('code', 100, 'text', { precision: 1 })
// const libelleCol = createTcdColumn('libelle', 100, 'text', { precision: 1 })
// const perdiodeCol = createTcdColumn('periode', 100, 'date', { precision: 1 })
// const debitCol = createTcdColumn('debit', 100, 'number', { precision: 0 })
// const creditCol = createTcdColumn('credit', 100, 'number', { precision: 0 })
// tcdManager.buildTcd(["facture","annee"],["code","type_op","depot"],[count,sum,avg])

// console.log(tcdManager.columns)
// console.log(tcdManager.data[0])

// return tcdManager
