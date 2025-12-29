import React, { useMemo } from 'react';
import { generateMockData } from './mockData';
import {Tcd6} from "./Tcd6";

export const Tcd6App: React.FC = () => {
    // Génération de 10 000 lignes et 50 colonnes
    const mock = useMemo(() => generateMockData(100, 20), []);

    return (
        <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>

            <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <Tcd6
                    allCells={mock.allCells}
                    columns={mock.columns}
                    maxRows={mock.maxRows}
                    stickyRows={4}       // Header sur 2 lignes figées
                    stickyCols={3}       // ID figé à gauche
                    hasStickyFooter={true}   // Ligne de total figée en bas
                    hasStickyRightCol={true} // Colonne total figée à droite
                />
            </div>

            <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                Affichage de {mock.maxRows.toLocaleString()} lignes virtualisées (2D Scrolling).
            </p>
        </div>
    );
};

