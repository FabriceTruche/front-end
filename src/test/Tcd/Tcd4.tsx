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
import {RowKeyedByOriginalIndex} from "../../widgets/Tcd/component/RowKeyedByOriginalIndex";
//import TcdRow from "../../widgets/Tcd/component/TcdRow";

const maxRowCount = 5000
const height = 150
const schema: GenColumn[] = [
    { name: "id", type: "index", label:"Id" },
    { name: "libelle", type: "string", label: "Libellé" },
]
const data = helper.generateData(schema, maxRowCount)
const columns: ITcdColumn[] = helper.generateTcdColumn(schema)
type ScrollContext = {
    firstVisibleRow: number
    lastVisibleRow: number
    topHeight: number
}
// Configuration
const ROW_HEIGHT = 30;
const VIEWPORT_HEIGHT = 400;
const COLUMN_WIDTH = 180; // Largeur minimale pour voir les données
const BUFFER_SIZE = 10;

export const Tcd4 = () => {
    const viewPortRef = useRef<HTMLDivElement>(null);

    const [scrollContext, setScrollContext] = useState({
        firstVisibleRow: 0,
        lastVisibleRow: Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + BUFFER_SIZE,
    });

    const handleScroll = () => {
        if (!viewPortRef.current) return;

        const scrollTop = viewPortRef.current.scrollTop;
        const currentFirstRow = Math.floor(scrollTop / ROW_HEIGHT);
        const newBufferStart = Math.max(0, currentFirstRow - BUFFER_SIZE);

        // Mise à jour si on a bougé de plus de 5 lignes pour la stabilité
        if (Math.abs(newBufferStart - scrollContext.firstVisibleRow) > 5) {
            const newBufferEnd = newBufferStart + Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + (BUFFER_SIZE * 2);
            setScrollContext({
                firstVisibleRow: newBufferStart,
                lastVisibleRow: newBufferEnd
            });
        }
    };

    const visibleData = useMemo(() => {
        return data.slice(scrollContext.firstVisibleRow, scrollContext.lastVisibleRow);
    }, [scrollContext.firstVisibleRow, scrollContext.lastVisibleRow, data]);

    // Calcul de la largeur totale pour le scroll horizontal
    const totalWidth = columns.length * COLUMN_WIDTH;

    return (
        <div className="tcd-wrapper" style={{ width: '100%', maxWidth: '1000px', margin: '20px auto' }}>

            <div
                ref={viewPortRef}
                onScroll={handleScroll}
                style={{
                    height: VIEWPORT_HEIGHT,
                    overflow: "auto", // Gère scroll vertical ET horizontal
                    position: "relative",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#fff"
                }}
            >
                {/* SIZER : Définit la zone de scroll totale (hauteur et largeur) */}
                <div style={{
                    height: data.length * ROW_HEIGHT,
                    width: totalWidth,
                    position: 'relative'
                }}>

                    {/* GRID CONTAINER : Flotte grâce au transform */}
                    <div style={{
                        display: "grid",
                        // On force chaque colonne à faire au moins COLUMN_WIDTH
                        gridTemplateColumns: `repeat(${columns.length}, ${COLUMN_WIDTH}px)`,
                        gridAutoRows: `${ROW_HEIGHT}px`,
                        width: totalWidth,
                        transform: `translateY(${scrollContext.firstVisibleRow * ROW_HEIGHT}px)`,
                    }}>
                        {visibleData.map((row:any, index:number) => (
                            <RowKeyedByOriginalIndex
                                key={row.id}
                                row={row}
                                columns={columns}
                                relativeIndex={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .row-background {
                    background-color: white;
                    border-bottom: 1px solid #eee;
                }

                .row-background:hover {
                    background-color: #f5faff !important;
                }

                .cell-data {
                    display: flex;
                    align-items: center;
                    padding: 0 12px;
                    font-size: 13px;
                    border-bottom: 1px solid #eee;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #333;
                }
                .cell-data:hover {
                    background-color: gray !important;
                }
            `}</style>
        </div>
    );
};
// <div style={{
//     // height: "200px",
//     // border: "1px solid red",
//     // overflowY: "auto",
// }}>
/*
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
 */