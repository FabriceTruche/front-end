import {GenColumn, helper} from "../../common/Helper";
import {ITcdColumn} from "../../widgets/Tcd/model/TcdColumn";
import {factory} from "../../common/Factory";
import {ITcdManager} from "../../widgets/Tcd/model/TcdManager";
import React, {Fragment, useLayoutEffect, useMemo, useRef, useState} from "react";
import {IMeasure} from "../../widgets/Tcd/model/Measure";
import {functionsGroup} from "../../widgets/Tcd/model/functionsGroup";
import {ITcdViewManager} from "../../widgets/Tcd/model/TcdViewManager";
import {TcdView} from "../../widgets/Tcd/component/TcdView";
import {DataFormatter} from "../../widgets/Table/DataFormatter";
import {TcdTable} from "../../widgets/Tcd/component/TcdTable";
import {VirtualView} from "../../containers/Viewport/VirtualView";

function createDummyData<T>(): [ITcdManager<T>,ITcdViewManager<T>] {
    const maxRowCount = 5000
    const schema: GenColumn[] = [
        { name: "id", type: "index", label:"Id" },
        { name: "lot", total: false , type: "integer", label:"Lot", items: [1,2,3,4/*,7,8,9,10,11*/] },
        { name: "type_op", type: "string", label: "Opération", items:["ACHAT","REGUL","SOLDE","OD"] },
        { name: "depot", type: "integer", label: "Dépôt", items: [100, 200, 350, 450, 500, 650, 620, 680, 820, 1000, 1200, 2000] },
        { name: "facture", total: false, type: "string", label: "Fac.", items:["REG","APA","ENC","INC"] },
        { name: "annee", total: false, type: "integer", label: "Année", items: [2020,2023, 2024, 2025] },
        { name: "code", total: true, type: "integer", label:"Code", min: 99, max: 5999 },
        { name: "libelle", type: "string", label:"Libellé" },
        { name: "periode", type: "Date", label: "Période" },
        { name: "debit", type: "integer", label: "Débit"/*, items:[10,20,30,40,50] */},
        { name: "credit", type: "integer", label: "Crédit"/*, items:[1,2,3,4,5]*/ },
    ]
    const columns: ITcdColumn[] = helper.generateTcdColumn(schema)
    // columns[9].dataFormatter = DataFormatter.numberFormatter // sum debit
    // columns[10].dataFormatter = DataFormatter.numberFormatter // count credit
    columns[8].dataFormatter = DataFormatter.shortPeriodeFormatter

    const data: any[] = helper.generateData(schema, maxRowCount)
    const tcdManager = factory.createTcdManager<any>(data, columns)
    const count1: IMeasure = factory.createMeasure(columns[9],functionsGroup.count)
    const sum2: IMeasure = factory.createMeasure(columns[10],functionsGroup.sum)

    tcdManager.buildTcd(["facture","annee","type_op","code"],["lot"],[sum2,count1])

    const tcdViewManager = factory.createTcdViewManager<any>()
    tcdViewManager.buildTcdView(tcdManager)

    return [tcdManager,tcdViewManager]
}

export const Tcd4=()=> {
    const [tcd, tcdv] = useMemo<[ITcdManager<any>, ITcdViewManager<any>]>(() => {
        return createDummyData()
    }, [])
    // const [firstVisible,setFirstVisible] = useState(0)
    // const [lastVisible,setLastVisible] = useState(0)
    // const [rowHeight, setRowHeight] = useState(0)
    // const firstTr = useRef<HTMLTableRowElement>(null)

    // useLayoutEffect(() => {
    //     if (firstTr.current) {
    //         const tr = firstTr.current;
    //         const table = tr.closest('table');
    //         if (table) {
    //             const style = window.getComputedStyle(table);
    //             // On récupère l'espacement vertical (le 2ème paramètre de border-spacing)
    //             const spacing = parseInt(style.borderSpacing,10)
    //             console.log("tr.offsetHeight=",tr.offsetHeight, "spacing=",spacing);
    //             setRowHeight(tr.offsetHeight + spacing);
    //         }
    //     }
    // }, []);

    const rowHeight = 22

    const style = {
        // border: "1px solid gray",
        // width: '40px',
        // height: rowHeight
    }
    const displayValue = (v: any): string => {
        if (v === null || v === undefined) return ""
        if (v instanceof Date) return v.toDateString()
        return v.toString()
    }

    return (
        <div>
            <table>
                <tbody
                    style={{}}
                >
                <tr style={style}>
                    {tcd.columns.map((column: ITcdColumn) => {
                        return (
                            <th
                                key={column.name}
                                style={style}
                            >
                                {column.name}
                            </th>
                        )
                    })}
                </tr>
                </tbody>
            </table>
            <pre>
                {/*firstVisible={firstVisible} nbVisible={lastVisible} trHeight={rowHeight}*/}
            </pre>
            <VirtualView
                virtualViewHeight={200}
                nbRows={tcd.initialData.length}
                onUpdateView={(topHeight: number) => {

                    const nbHiddenRows = Math.trunc(topHeight / (2+rowHeight))
                    const firstVisible = nbHiddenRows + 1
                    const lastVisible = Math.trunc((topHeight + 200) / rowHeight) + 1

                    // console.log("topHeight=", topHeight, "nbHiddenRows=", nbHiddenRows, "firstVisible=", firstVisible, "lastVisible=",lastVisible)
                    console.log("firstVisible=", firstVisible, "lastVisible=",lastVisible)

                    // console.log(rowHeight)

                    return (
                        <div
                            style={{
                                height: tcd.initialData.length*(2+rowHeight),
                            }}
                        >
                        <table
                            style={{
                                borderSpacing: 2,
                                // height: tcd.initialData.length*rowHeight,
                            }}
                        >
                            <tbody>
                            {(nbHiddenRows>0) && (
                                <tr
                                    style={{
                                        height: nbHiddenRows * rowHeight,
                                        visibility: "hidden",
                                    }}
                                />
                            )}

                            {tcd.initialData.map((row: any, index: number) => {

                                if (row.id>=firstVisible && row.id<=lastVisible) {
                                    return (
                                        <tr key={index}
                                            // ref={index===0 ? firstTr : null}
                                            style={{
                                                height: rowHeight
                                            }}
                                        >
                                            {tcd.columns.map((column: ITcdColumn) => {
                                                return (
                                                    <td key={column.name} style={style}>
                                                        {displayValue(row[column.name])}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                }
                                return null
                            })}
                            </tbody>

                        </table>
                        </div>
                    )
                }}
            />
        </div>
    )
}

// <div style={{
//     // height: "200px",
//     // border: "1px solid red",
//     // overflowY: "auto",
// }}>
