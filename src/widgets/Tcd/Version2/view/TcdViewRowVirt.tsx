import React, { memo } from 'react';
import {ITcdCell, TypeCell} from "../TcdCell";
import { TcdViewColumn } from "../TcdViewColumn";

interface TcdViewRowVirtProps {
    rowData: { y: number; cells: ITcdCell[]; isFooter?: boolean };
    columns: TcdViewColumn[];
    stickyCols: number;
    stickyRightCols: number;
    columnPositions: number[];
    columnRightPositions: number[];
    rowHeight: number;
    gap: number; // Reçu du parent
    isStickyRow: boolean;
    isLastStickyRow?: boolean;
    visibleXRange: { start: number; end: number };
    renderStartRow: number;
}

const TcdViewRowVirt: React.FC<TcdViewRowVirtProps> = memo(({
                                                                rowData, columns, stickyCols, stickyRightCols, columnPositions,
                                                                columnRightPositions, rowHeight, gap, isStickyRow, isLastStickyRow,
                                                                visibleXRange, renderStartRow
                                                            }) => {
    const { y, cells, isFooter } = rowData;

    return (
        <>
            {cells.map((cell: ITcdCell) => {
                const { x } = cell.rect;
                const xSpan = cell.rect.xSpan || 1;
                const ySpan = cell.rect.ySpan || 1;

                const isStickyLeft = x < stickyCols;
                const isStickyRight = x >= columns.length - stickyRightCols;
                const isStickyTop = isStickyRow;
                const isStickyBottom = isFooter === true;

                // --- VIRTUALISATION HORIZONTALE (ColSpan Aware) ---
                const lastColIdx = Math.min(x + xSpan - 1, columns.length - 1);

                if (!isStickyLeft && !isStickyRight) {
                    const cellStartPx = columnPositions[x];
                    const cellEndPx = columnPositions[lastColIdx] + columns[lastColIdx].width;

                    if (cellEndPx < visibleXRange.start || cellStartPx > visibleXRange.end) {
                        return null;
                    }
                }

                // --- VIRTUALISATION VERTICALE (RowSpan Aware) ---
                const cellEndRow = y + ySpan - 1;
                if (!isStickyTop && !isStickyBottom && cellEndRow < renderStartRow) {
                    return null;
                }

                const isSticky = isStickyTop || isStickyBottom || isStickyLeft || isStickyRight;

                let zoneClass = "";
                if ((isStickyTop || isStickyBottom) && (isStickyLeft || isStickyRight)) zoneClass = "cell-is-corner";
                else if (isStickyTop) zoneClass = "cell-is-sticky-row";
                else if (isStickyBottom) zoneClass = "cell-is-footer";
                else if (isStickyLeft) zoneClass = "cell-is-sticky-left";
                else if (isStickyRight) zoneClass = "cell-is-sticky-right";

                let zIndex = 1;
                if ((isStickyTop || isStickyBottom) && (isStickyLeft || isStickyRight)) zIndex = 50;
                else if (isStickyTop || isStickyBottom) zIndex = 40;
                else if (isStickyLeft || isStickyRight) zIndex = 30;

                // --- CALCULS DE POSITION STICKY CORRIGÉS ---
                const stickyTopPos = y * (rowHeight + gap);
                const stickyLeftPos = columnPositions[x];

                // CORRECTION : On s'ancre sur la position "Right" de la DERNIÈRE colonne du span
                // pour éviter que la cellule ne se déplace à gauche quand le xSpan change.
                const stickyRightPos = columnRightPositions[lastColIdx];

                const containerStyle: React.CSSProperties = {
                    // Utilisation de coordonnées explicites pour plus de stabilité
                    gridColumnStart: x + 1,
                    gridColumnEnd: x + 1 + xSpan,
                    gridRowStart: y + 1,
                    gridRowEnd: y + 1 + ySpan,

                    position: isSticky ? 'sticky' : 'relative',
                    left: isStickyLeft ? `${stickyLeftPos}px` : undefined,
                    right: isStickyRight ? `${stickyRightPos}px` : undefined,
                    top: isStickyTop ? `${stickyTopPos}px` : undefined,
                    bottom: isStickyBottom ? 0 : undefined,

                    zIndex: zIndex,
                    display: 'flex',
                    alignItems: 'center',
                    justifySelf: 'stretch', // Assure l'occupation de tout le span
                    contain: 'layout style paint',
                };

                // CALCUL ClassName technique (Conservation de vos modifs)
                let clsName = "cell-base"
                if (zoneClass!=="") clsName += " " + zoneClass
                if (cell.isLabel) clsName += " cell-is-header"
                if (isLastStickyRow) clsName +=  " row-last-sticky"

                // CALCUL ClassName fonctionnel (Conservation de vos modifs)
                clsName += " typecell-" + TypeCell[cell.typeCell]

                return (
                    <div key={`${x}-${y}`} className={clsName} style={containerStyle}>
                        <div className="cell-inner" style={cell.getStyle()}>
                            {cell.getFormattedValue()}
                        </div>
                    </div>
                );
            })}
        </>
    );
});

export default TcdViewRowVirt;