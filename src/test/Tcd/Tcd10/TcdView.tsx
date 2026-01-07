import React, { useMemo } from 'react';
import TcdViewRowVirt from './TcdViewRowVirt';
import {ITcdColumn} from './TcdColumn';
import {ITcdCell} from "./TcdCell";

interface TcdViewProps {
    cells: ITcdCell[];
    columns: ITcdColumn[];
    rowHeight: number;
    height: number;
    stickyCols: number;
    stickyRightCols: number;
    stickyRows: number; // <-- AJOUT : Nombre de lignes à figer en haut
}

export const TcdView = ({
                    cells,
                    columns,
                    rowHeight,
                    height,
                    stickyCols,
                    stickyRightCols,
                    stickyRows
}: TcdViewProps) => {

    const columnPositions = useMemo(() => {
        let currentPos = 0;
        return columns.map((col) => {
            const pos = currentPos;
            currentPos += col.width;
            return pos;
        });
    }, [columns]);

    const columnRightPositions = useMemo(() => {
        const rightPositions = new Array(columns.length).fill(0);
        let currentPos = 0;
        for (let i = columns.length - 1; i >= 0; i--) {
            rightPositions[i] = currentPos;
            currentPos += columns[i].width;
        }
        return rightPositions;
    }, [columns]);

    const rowsMap = useMemo(() => {
        const map = new Map<number, ITcdCell[]>();
        cells.forEach((cell) => {
            const y = cell.rect.y;
            if (!map.has(y)) map.set(y, []);
            map.get(y)!.push(cell);
        });
        return map;
    }, [cells]);

    const rowIndices = useMemo(() => Array.from(rowsMap.keys()).sort((a, b) => a - b), [rowsMap]);
    const maxRowIndex = rowIndices[rowIndices.length - 1];
    const totalWidth = columns.reduce((acc, col) => acc + col.width, 0);

    const stickyHeaderHeight = stickyRows * rowHeight;
    const stickyLeftWidth = columnPositions[stickyCols];

    return (
        <div className="tcd9-container" style={{ height: `${height}px`, overflow: 'auto', position: 'relative' }}>
            <div className="tcd9-grid" style={{
                display: 'grid',
                gridTemplateColumns: columns.map(c => `${c.width}px`).join(' '),
                width: `${totalWidth}px`,
                position: 'relative',
            }}>
                {rowIndices.map((y) => {
                    const rowCells = rowsMap.get(y) || [];
                    const isFooter = y === maxRowIndex;
                    const isStickyTop = y < stickyRows; // Vérifie si la ligne doit être figée

                    return (
                        <TcdViewRowVirt
                            key={y}
                            rowData={{ y, cells: rowCells, isFooter }}
                            columns={columns}
                            stickyCols={stickyCols}
                            stickyRightCols={stickyRightCols}
                            columnPositions={columnPositions}
                            columnRightPositions={columnRightPositions}
                            rowHeight={rowHeight}
                            isStickyRow={isStickyTop} // Prop transmise
                            isLastStickyRow={y === stickyRows - 1} // Pour la bordure sous le header
                        />
                    );
                })}
            </div>
        </div>
    );
};
