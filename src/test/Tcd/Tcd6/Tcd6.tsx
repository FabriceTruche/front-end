import React, { useState, useMemo, useRef, UIEvent } from 'react';
import RowVirtualized from './RowVirtualized';
import { ICell, IColumn, IScrollContext, IRowData } from './Tcd6Types';
import './tcd6Styles.css'; // Changement vers le nouveau fichier CSS

interface Tcd6Props {
    allCells: ICell[];
    columns: IColumn[];
    maxRows: number;
    stickyRows?: number;
    stickyCols?: number;
    hasStickyFooter?: boolean;
    hasStickyRightCol?: boolean;
}

const ROW_HEIGHT = 32; // Version compacte
const BUFFER_Y = 10;
const BUFFER_X = 2;

export const Tcd6: React.FC<Tcd6Props> = ({
                                              allCells, columns, maxRows,
                                              stickyRows = 1,
                                              stickyCols = 2,
                                              hasStickyFooter = true,
                                              hasStickyRightCol = true
                                          }) => {
    const viewPortRef = useRef<HTMLDivElement>(null);

    // Calcul des positions horizontales
    const { columnPositions, totalWidth, gridTemplate } = useMemo(() => {
        let currentLeft = 0;
        const positions: number[] = [];
        const templates: string[] = [];
        columns.forEach((col) => {
            positions.push(currentLeft);
            templates.push(`${col.width}px`);
            currentLeft += col.width;
        });
        return { columnPositions: positions, totalWidth: currentLeft, gridTemplate: templates.join(" ") };
    }, [columns]);

    // Indexation des lignes pour accès rapide
    const rowsMap = useMemo(() => {
        const map = new Map<number, ICell[]>();
        allCells.forEach((cell) => {
            const y = cell.rect.y;
            if (!map.has(y)) map.set(y, []);
            map.get(y)!.push(cell);
        });
        return map;
    }, [allCells]);

    // État de la fenêtre de visualisation (Virtualisation)
    const [viewContext, setViewContext] = useState<IScrollContext>({
        firstRow: stickyRows, lastRow: 40, firstCol: stickyCols, lastCol: 10
    });

    const handleScroll = (e: UIEvent<HTMLDivElement>): void => {
        const { scrollTop, scrollLeft, clientWidth, clientHeight } = e.currentTarget;

        let currentFirstCol = columnPositions.findIndex(pos => pos > scrollLeft - 5);
        if (scrollLeft <= 5) currentFirstCol = 0;

        const newFirstCol = Math.max(stickyCols, (currentFirstCol === -1 ? columns.length : currentFirstCol) - BUFFER_X);
        const currentFirstRow = Math.floor(scrollTop / ROW_HEIGHT);
        const newFirstRow = Math.max(stickyRows, currentFirstRow - BUFFER_Y);

        if (scrollLeft <= 10 || scrollTop <= 10 ||
            Math.abs(newFirstRow - viewContext.firstRow) > 5 ||
            Math.abs(newFirstCol - viewContext.firstCol) >= 1) {
            setViewContext({
                firstRow: newFirstRow,
                lastRow: newFirstRow + Math.ceil(clientHeight / ROW_HEIGHT) + (BUFFER_Y * 2),
                firstCol: newFirstCol,
                lastCol: newFirstCol + Math.ceil(clientWidth / 120) + (BUFFER_X * 2)
            });
        }
    };

    const rowsToRender = useMemo<IRowData[]>(() => {
        const rows: IRowData[] = [];
        // 1. Headers
        for (let y = 0; y < stickyRows; y++) {
            if (rowsMap.has(y)) rows.push({ y, cells: rowsMap.get(y)!, isHeader: true, isFooter: false });
        }
        // 2. Corps (Virtualisé)
        for (let y = viewContext.firstRow; y <= Math.min(maxRows - 2, viewContext.lastRow); y++) {
            if (rowsMap.has(y) && y >= stickyRows) {
                rows.push({ y, cells: rowsMap.get(y)!, isHeader: false, isFooter: false });
            }
        }
        // 3. Footer
        const footerY = maxRows - 1;
        if (hasStickyFooter && rowsMap.has(footerY)) {
            rows.push({ y: footerY, cells: rowsMap.get(footerY)!, isHeader: false, isFooter: true });
        }
        return rows;
    }, [viewContext, rowsMap, stickyRows, maxRows, hasStickyFooter]);

    return (
        <div className="tcd-wrapper">
            <h1 className="tcd-title">Titre du Tableau</h1>

            <div ref={viewPortRef} onScroll={handleScroll} className="tcd-viewport">
                <div style={{
                    height: maxRows * ROW_HEIGHT,
                    width: totalWidth,
                    gridTemplateColumns: gridTemplate,
                    gridAutoRows: `${ROW_HEIGHT}px`,
                    display: 'grid'
                }} className="tcd-grid-container">
                    {rowsToRender.map((rowData) => (
                        <RowVirtualized
                            key={rowData.y}
                            {...rowData}
                            relativeIndex={rowData.y}
                            totalColumns={columns.length}
                            visibleColStart={viewContext.firstCol}
                            visibleColEnd={viewContext.lastCol}
                            stickyCols={stickyCols}
                            isHeaderRow={rowData.isHeader}
                            isFooterRow={rowData.isFooter}
                            columnPositions={columnPositions}
                            isRightColSticky={hasStickyRightCol}
                            rowHeight={ROW_HEIGHT}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};