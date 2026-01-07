import React, { useMemo } from 'react';
import "./tcdViewStyles.css"
import {TcdView} from "./TcdView";
import {ITcdManager} from "../TcdManager";
import {createTcdViewManager, ITcdViewManager} from "../TcdViewManager";
import {ITcdCell} from "../TcdCell";

export type TcdViewMainProps = {
    tcd: ITcdManager<any>
}

export const TcdViewMain = (props: TcdViewMainProps) => {

    // 1. Initialisation des données (100 lignes)
    const tcdv: ITcdViewManager<any> = useMemo(() => {
        const v: ITcdViewManager<any> = createTcdViewManager()
        v.buildTcdView(props.tcd)
        return v
    }, [props.tcd]);

    // 2. Objet de configuration centralisé
    const gridConfig = {
        rowHeight: 26,
        gridHeight: 600,
        stickyCols: props.tcd.rowAxis.length,        // nombre de row axes
        stickyRightCols: props.tcd.measures.length,  // nb de GT === nb de measures
        stickyRows: props.tcd.colAxis.length + 1,    // nombre de col axes + entete des measures
    };

    // all celss
    const cells: ITcdCell[] = tcdv.cells

    // console.log(cells)

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>TCD9 - Grille Haute Performance</h1>
                <p>Architecture POO & Figeage multidirectionnel</p>
            </header>

            <main className="grid-wrapper">
                <TcdView
                    cells={cells}
                    viewColumns={tcdv.viewColumns}
                    rowHeight={gridConfig.rowHeight}
                    height={gridConfig.gridHeight}
                    stickyCols={gridConfig.stickyCols}
                    stickyRightCols={gridConfig.stickyRightCols}
                    stickyRows={gridConfig.stickyRows}
                />
            </main>

            <footer className="app-footer">
                Status: Virtualisation Active | {tcdv.cells.length} cellules chargées | {props.tcd.data.length} lignes
                <br/>
                Info: {tcdv.viewColumns.length} Virtuals Columns
            </footer>
        </div>
    );
};
