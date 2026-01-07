import React, { useMemo } from 'react';
import Tcd9 from './Tcd9';
import { generateTcd9MockData } from './Tcd9Mock';
import "./Tcd9Styles.css"

const Tcd9App: React.FC = () => {
    // 1. Initialisation des données (100 lignes)
    const { cells, columns } = useMemo(() => generateTcd9MockData(100), []);

    // 2. Objet de configuration centralisé
    const gridConfig = {
        rowHeight: 26,
        gridHeight: 600,
        stickyCols: 4,        // Colonnes ID et Libellé figées à gauche
        stickyRightCols: 1,   // Colonne TOTAL figée à droite
        stickyRows: 4,        // 2 premières lignes figées en haut (Header + 1ère ligne data)
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>TCD9 - Grille Haute Performance</h1>
                <p>Architecture POO & Figeage multidirectionnel</p>
            </header>

            <main className="grid-wrapper">
                <Tcd9
                    cells={cells}
                    columns={columns}
                    rowHeight={gridConfig.rowHeight}
                    height={gridConfig.gridHeight}
                    stickyCols={gridConfig.stickyCols}
                    stickyRightCols={gridConfig.stickyRightCols}
                    stickyRows={gridConfig.stickyRows}
                />
            </main>

            <footer className="app-footer">
                Status: Virtualisation Active | {cells.length} cellules chargées
            </footer>
        </div>
    );
};

export default Tcd9App;