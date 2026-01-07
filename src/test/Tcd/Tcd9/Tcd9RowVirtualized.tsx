import React, { memo } from 'react';
import { IColumn } from './types';
import {ICell} from "./Cell";

interface ITcd9RowProps {
    rowData: {
        y: number;
        cells: ICell[];
        isFooter?: boolean;
    };
    columns: IColumn[];
    stickyCols: number;
    stickyRightCols: number;
    columnPositions: number[];
    columnRightPositions: number[];
    rowHeight: number;
    isStickyRow: boolean; // Reçu du parent Tcd9 (pour les lignes du haut)
    isLastStickyRow?: boolean; // Pour la bordure de séparation sous le header
}

const Tcd9RowVirtualized: React.FC<ITcd9RowProps> = memo(({
                                                              rowData,
                                                              columns,
                                                              stickyCols,
                                                              stickyRightCols,
                                                              columnPositions,
                                                              columnRightPositions,
                                                              rowHeight,
                                                              isStickyRow,
                                                              isLastStickyRow
                                                          }) => {
    const { y, cells, isFooter } = rowData;

    return (
        <>
            {cells.map((cell) => {
                const { x } = cell.rect;

                // --- 1. Logique Géométrique de Figeage ---
                const isStickyLeft = x < stickyCols;
                const isStickyRight = x >= columns.length - stickyRightCols;
                const isStickyTop = isStickyRow;
                const isStickyBottom = isFooter === true;

                const isSticky = isStickyTop || isStickyBottom || isStickyLeft || isStickyRight;

                // --- 2. Attribution des Classes de Zones (CSS élégant) ---
                let zoneClass = "";
                if ((isStickyTop || isStickyBottom) && (isStickyLeft || isStickyRight)) {
                    zoneClass = "cell-is-corner";
                } else if (isStickyTop) {
                    zoneClass = "cell-is-sticky-row";
                } else if (isStickyBottom) {
                    zoneClass = "cell-is-footer";
                } else if (isStickyLeft) {
                    zoneClass = "cell-is-sticky-left";
                } else if (isStickyRight) {
                    zoneClass = "cell-is-sticky-right";
                }

                // --- 3. Gestion de l'empilement (Z-Index) ---
                let zIndex = 1;
                if ((isStickyTop || isStickyBottom) && (isStickyLeft || isStickyRight)) zIndex = 50;
                else if (isStickyTop || isStickyBottom) zIndex = 40;
                else if (isStickyLeft || isStickyRight) zIndex = 30;

                // --- 4. Calcul des styles de positionnement ---
                const containerStyle: React.CSSProperties = {
                    gridColumn: `${x + 1}`,
                    gridRow: `${y + 1}`,
                    position: isSticky ? 'sticky' : 'relative',

                    // On utilise Math.round pour éviter les scintillements de bordure (sub-pixel rendering)
                    left: isStickyLeft ? `${columnPositions[x]}px` : undefined,
                    right: isStickyRight ? `${columnRightPositions[x]}px` : undefined,
                    top: isStickyTop ? `${Math.round(y * rowHeight)}px` : undefined,
                    bottom: isStickyBottom ? 0 : undefined,

                    zIndex: zIndex,
                    height: `${rowHeight}px`,
                    display: 'flex',
                    alignItems: 'center',
                };

                return (
                    <div
                        key={`${x}-${y}`}
                        className={`cell-base ${zoneClass} 
                            ${cell.isHeader ? 'cell-is-header' : ''} 
                            ${isLastStickyRow ? 'row-last-sticky' : ''}`}
                        style={containerStyle}
                    >
                        {/* Le contenu de la cellule utilise les méthodes POO de ICell
                           - getStyle() : gère l'alignement et les couleurs métier (ex: rouge si négatif)
                           - getFormattedValue() : gère le formatage (ex: currency, date)
                        */}
                        <div className="cell-inner" style={cell.getStyle()}>
                            {cell.getFormattedValue()}
                        </div>
                    </div>
                );
            })}
        </>
    );
});

export default Tcd9RowVirtualized;
