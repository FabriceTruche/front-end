import {GenColumn, helper} from "../../common/Helper";
import {ITcdColumn} from "../../widgets/Tcd/model/TcdColumn";
import {factory} from "../../common/Factory";
import {createTcdManager, ITcdManager} from "../../widgets/Tcd/model/TcdManager";
import {useMemo} from "react";
import {createMeasure, IMeasure} from "../../widgets/Tcd/model/Measure";
import {functionsGroup} from "../../widgets/Tcd/model/functionsGroup";
import {createTcdViewManager, ITcdViewManager,} from "../../widgets/Tcd/model/TcdViewManager";
import {TcdTable} from "../../widgets/Tcd/component/TcdTable";
import {ITcdCell} from "../../widgets/Tcd/model/Cell";
import {Block} from "./TcdTraces";

function createDummyData<T>(): [ITcdManager<T>, ITcdViewManager<T>] {

    const maxRowCount = 100
    const schema: GenColumn[] = [
        { name: "id", type: "index", label:"Id" },
        { name: "lot", total: true, type: "integer", label:"Numéro", items: [1,2,3,4] /*,7,8,9,10,11]*/ },
        { name: "type_op", type: "string", label: "Type opération", items:["ACHAT","REGUL","SOLDE","OD"] },
        { name: "depot", type: "integer", label: "Dépôt", items: [100, 200, 350, 450, 500, 650, 620, 680, 820, 1000, 1200, 2000] },
        { name: "facture", type: "boolean", label: "Facturation" },
        { name: "annee", total: true, type: "integer", label: "Année", items: [2023, 2024, 2025] },
        { name: "date_ope", type: "Date", label:"Date opératoin" },
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
    const tcdManager = createTcdManager<any>(data, columns)
    const sum: IMeasure = createMeasure(columns[9],functionsGroup.sum)
    const count: IMeasure = createMeasure(columns[10],functionsGroup.count)

    tcdManager.buildTcd(["annee","lot","depot"],["credit"],[sum,count])

    const tcdViewManager = createTcdViewManager<any>()
    tcdViewManager.buildTcdView(tcdManager)

    return [tcdManager,tcdViewManager]
}

export const Tcd1=()=> {
    const [tcd,tcdView] = useMemo<[ITcdManager<any>,ITcdViewManager<any>]>(() => {
        return createDummyData()
    }, [])

    // const tcdView = useMemo<ITcdViewManager<any>>(() => {
    //     return factory.createTcdViewManager()
    // }, [])
    // const bodyRowsCells: Cell[] = tcdView.calculateFieldsCoordinates(tcdManager.rowTreeField, TcdMode.top)
    // const bodyColsCells: Cell[] = tcdView.calculateFieldsCoordinates(tcdManager.colTreeField, TcdMode.top)
    // console.log(bodyRowsCells)

    return (
        <pre>
            {/*<Block>*/}
            {/*    <TcdTable tcdManager={tcdManager} />*/}
            {/*</Block>*/}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
            }}>


                {/*<Block>*/}
                {/*    *ROWS AXIS**/}
                {/*    {tcd.rowAxis.map((c:ITcdColumn)=>(*/}
                {/*        <div>{c.name}</div>*/}
                {/*    ))}*/}
                {/*    <br />*/}
                {/*    *COLS AXIS**/}
                {/*    {tcd.colAxis.map((c:ITcdColumn)=>(*/}
                {/*        <div>{c.name}</div>*/}
                {/*    ))}*/}
                {/*</Block>*/}

               {/*<Block>*/}
               {/*     <FieldView field={tcd.rowTreeField} level={0} />*/}
               {/* </Block>*/}

               {/* <Block>*/}
               {/*     <FieldView field={tcd.colTreeField} level={0} />*/}
               {/* </Block>*/}

               {/* <Block>*/}
               {/*     **ROWS***/}
               {/*     {tcdView.rowsCell.map((cell:Cell<IField<any>>)=>{*/}
               {/*         return (*/}
               {/*             <div>*/}
               {/*                 [{cell.coord.y};{cell.coord.x}]={cell.object.value.toString()};*/}
               {/*             </div>*/}
               {/*         )*/}
               {/*     })}*/}
               {/* </Block>*/}
               {/* <Block>*/}
               {/*     **COLS***/}
               {/*     {tcdView.colsCell.map((cell:Cell<IField<any>>)=>{*/}
               {/*         return (*/}
               {/*             <div>*/}
               {/*                 [{cell.coord.y};{cell.coord.x}]={cell.object.value.toString()};*/}
               {/*             </div>*/}
               {/*         )*/}
               {/*     })}*/}
               {/* </Block>*/}

                {/*<Block>*/}
                {/*    **MEASURES***/}
                {/*    {tcdView.measuresValueCell.map((cell:Cell<IMeasureValue<any>>)=>{*/}
                {/*        return (*/}
                {/*            <div>*/}
                {/*                [{cell.coord.y};{cell.coord.x}]={cell.object.value.toString()};*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    })}*/}
                {/*</Block>*/}

                {/*<Block>*/}
                {/*    <TcdBlock*/}
                {/*        origin={{x:0,y:0}}*/}
                {/*        mode={TcdMode.top}*/}
                {/*        header={tcd.rowAxis.map((c:ITcdColumn)=>c.name)} body={tcdView.rowsCell}*/}
                {/*        totals={tcdView.totalRowsCell}*/}

                {/*    />*/}
                {/*</Block>*/}
                {/*<Block>*/}
                {/*    <TcdBlock*/}
                {/*        origin={{x:0,y:0}}*/}
                {/*        mode={TcdMode.left}*/}
                {/*        header={tcd.colAxis.map((c:ITcdColumn)=>c.name)} body={tcdView.colsCell}*/}
                {/*        totals={[]}*/}
                {/*    />*/}
                {/*</Block>*/}
                {/*<Block>*/}
                {/*    <TcdBlock*/}
                {/*        origin={{x:0,y:0}}*/}
                {/*        mode={TcdMode.top}*/}
                {/*        header={tcdView.measuresCell.map((c:Cell<IMeasure>)=>`${c.object.funcGroup.name}(${c.object.column.name})`)}*/}
                {/*        body={tcdView.measuresValueCell}*/}
                {/*        totals={[]}*/}
                {/*    />*/}
                {/*</Block>*/}
                <Block>
                    *TOTAL*
                    {tcdView.totalRowsCell.map((t:ITcdCell)=>{
                        return (
                            <div>
                                [y={t.rect.y},x={t.rect.x}] - {t.value}
                            </div>
                        )
                    })}
                </Block>

                  <Block>
                    <TcdTable tcdManager={tcd} />
                </Block>

            </div>
        </pre>
    )
}



/*

                <Block>
                    <Terminals fields={tcdManager.rowsTerminalField} title="ROW TERMINALS:"/>
                </Block>

                <Block>
                    <Terminals fields={tcdManager.colsTerminalField} title="COL TERMINALS:"/>
                </Block>

                <Block>
                    <MeasuresValue measuresValue={tcdManager.measuresValue} />
                </Block>

 */