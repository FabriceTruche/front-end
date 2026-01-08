import React, { useMemo, useState } from 'react';
import "./tcdViewStyles.css"
import { TcdView } from "./TcdView";
import { ITcdManager } from "../TcdManager";
import { createTcdViewManager, ITcdViewManager } from "../TcdViewManager";
import { ITcdCell } from "../TcdCell";
import { TcdConfPanel, ITcdConfigState } from "./TcdConfPanel";

export type TcdViewMainProps = {
    tcd: ITcdManager<any>
}

export const TcdViewMain = (props: TcdViewMainProps) => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    // 1. Initialisation des données (useMemo conserve la performance)
    const tcdv: ITcdViewManager<any> = useMemo(() => {
        const v: ITcdViewManager<any> = createTcdViewManager()
        v.buildTcdView(props.tcd)
        return v
    }, [props.tcd]);

    // 2. Objet de configuration centralisé
    const gridConfig = {
        rowHeight: 26,
        gridHeight: 600,
        stickyCols: props.tcd.rowAxis.length,
        stickyRightCols: props.tcd.measures.length,
        stickyRows: props.tcd.colAxis.length + 1,
    };

    const cells: ITcdCell[] = tcdv.cells;

    return (
        <div className="app-container">
            <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
                <div>
                    <h1>TCD9 - Grille Haute Performance</h1>
                    <p>Architecture POO & Figeage multidirectionnel</p>
                </div>
                <button className="btn-apply-elegant" onClick={() => setIsConfigOpen(true)}>
                    ⚙️ Configurer
                </button>
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

            {/* LA POPUP MODALE */}
            {isConfigOpen && (
                <div className="tcd-modal-overlay">
                    <div className="tcd-modal-content">
                        <TcdConfPanel
                            allColumns={props.tcd.columns || []}
                            tcdData={props.tcd.data || []}
                            onCancel={() => setIsConfigOpen(false)}
                            onApply={(config: ITcdConfigState) => {
                                console.log("Config Appliquée", config);
                                setIsConfigOpen(false);
                                // Note: Ici, vous devrez probablement appeler une méthode
                                // de props.tcd pour appliquer rows/cols/measures/filters
                            }}
                        />
                    </div>
                </div>
            )}

            <footer className="app-footer">
                Status: Virtualisation Active | {tcdv.cells.length} cellules chargées | {props.tcd.data.length} lignes
                <br/>
                Info: {tcdv.viewColumns.length} Virtuals Columns
            </footer>
        </div>
    );
};