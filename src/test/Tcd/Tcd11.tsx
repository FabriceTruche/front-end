import {GenColumn, helper} from "../../common/Helper";
import React, {useMemo} from "react";
import {TcdViewMain} from "../../widgets/Tcd/Version2/view/TcdViewMain";
import {createTcdManager, ITcdManager} from "../../widgets/Tcd/Version2/TcdManager";
import {ITcdColumn} from "../../widgets/Tcd/Version2/TcdColumn";
import {createMeasure, IMeasure} from "../../widgets/Tcd/Version2/Measure";
import {functionsGroup} from "../../widgets/Tcd/Version2/functionsGroup";
import {createTcdColumn} from "./Tcd10/TcdColumn";

function createDummyData<T>(): ITcdManager<T> {
    const maxRowCount = 200
    const schema: GenColumn[] = [
        { name: "id", type: "index", label:"Id" },
        { name: "lot", total: false , type: "integer", label:"Lot", items: [1,2,3,4/*,7,8,9,10,11*/] },
        { name: "type_op", total: false, type: "string", label: "Opération", items:["ACHAT","REGUL","SOLDE","OD"] },
        { name: "depot", type: "integer", label: "Dépôt", items: [100, 200, 350, 450, 500, 650, 620, 680, 820, 1000, 1200, 2000] },
        { name: "facture", total: false, type: "string", label: "Fac.", items:["REG","APA","ENC","INC","AA1","AA2","AA3","ZZO"] },
        { name: "annee", total: false, type: "integer", label: "Année", items: [2020,2023, 2024, 2025] },
        { name: "code", total: true, type: "integer", label:"Code", min: 99, max: 5999 },
        { name: "libelle", type: "string", label:"Libellé" },
        { name: "periode", type: "Date", label: "Période" },
        { name: "debit", type: "integer", label: "Débit"/*, items:[10,20,30,40,50] */},
        { name: "credit", type: "integer", label: "Crédit"/*, items:[1,2,3,4,5]*/ },
    ]
    const columns: ITcdColumn[] = [
        createTcdColumn('id', 100, 'number', { precision: 1 }),
        createTcdColumn('lot', 100, 'number', { precision: 0, total: false }),
        createTcdColumn('type_op', 100, 'text', { precision: 1, total: true }),
        createTcdColumn('depot', 100, 'number', { precision: 1 }),
        createTcdColumn('facture', 100, 'text', { total: true }),
        createTcdColumn('annee', 100, 'number', { precision: 0 }),
        createTcdColumn('code', 100, 'text', { precision: 1 }),
        createTcdColumn('libelle', 100, 'text', { precision: 1 }),
        createTcdColumn('periode', 100, 'date', { precision: 1 }),
        createTcdColumn('debit', 100, 'number', { precision: 0 }),
        createTcdColumn('credit', 100, 'number', { precision: 0 }),
    ]
    const data: any[] = helper.generateData(schema, maxRowCount)
    const tcdManager = createTcdManager<any>(data, columns)
    const count: IMeasure = createMeasure(columns[9],functionsGroup.count)
    const sum: IMeasure = createMeasure(columns[10],functionsGroup.sum)
    const avg: IMeasure = createMeasure(columns[0],functionsGroup.avg)

    // tcdManager.buildTcd(["facture","annee"],["code","type_op","depot"],[count,sum,avg])
    tcdManager.buildTcd(["facture","annee"],["type_op"],[avg])

    return tcdManager
}

export const Tcd11=()=> {
    const tcd: ITcdManager<any> = useMemo<ITcdManager<any>>(() => {
        return createDummyData()
    }, [])

    return (
        <TcdViewMain
            tcd={tcd}
        />
    )
}