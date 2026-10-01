import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import GridRowVirtual from './GridRowVirtual';
import { ICell } from "./Cell";

interface GridViewProps {
    cells: ICell[];
    columnsWidth: number[]
    rowHeight: number;
    height: number;
    stickyCols: number;
    stickyRightCols: number;
    stickyRows: number;
    stickyFooterRows: number;
    gap?: number;
    canDeleteRow?: boolean;
    onClick?: (cell: ICell) => void
    onDeleteButtonClick?: (y: number) => void
}

export const GridView = ({
                             cells,
                             columnsWidth,
                             rowHeight,
                             height,
                             stickyCols,
                             stickyRightCols,
                             stickyRows,
                             stickyFooterRows,
                             onDeleteButtonClick,
                             gap = 0,
                             onClick = undefined,
                             canDeleteRow = false,
                         }: GridViewProps) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // --- 1. Gestion du Resize ---
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // --- 2. Pré-calculs des positions (Mémoïsés) ---
    const columnPositions = useMemo(() => {
        let currentPos = 0;
        return columnsWidth.map((colWidth: number) => {
            const pos = currentPos;
            currentPos += colWidth + gap;
            return pos;
        });
    }, [columnsWidth, gap]);

    const columnRightPositions = useMemo(() => {
        const rightPositions = new Array(columnsWidth.length).fill(0);
        let currentPos = 0;
        for (let i = columnsWidth.length - 1; i >= 0; i--) {
            rightPositions[i] = currentPos;
            currentPos += columnsWidth[i] + gap;
        }
        return rightPositions;
    }, [columnsWidth, gap]);

    const totalWidth = useMemo(() => {
        if (columnsWidth.length === 0) return 0;
        return columnsWidth.reduce((acc: number, colWidth: number) => acc + colWidth, 0) + (columnsWidth.length - 1) * gap;
    }, [columnsWidth, gap]);

    // OPTIMISATION : Transformation linéaire O(N) préservée mais isolée
    const rowsData = useMemo(() => {
        const map = new Map<number, ICell[]>();
        let maxY = 0;

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const y = cell.rect.y;
            if (y > maxY) maxY = y;

            let row = map.get(y);
            if (!row) {
                row = [];
                map.set(y, row);
            }
            row.push(cell);
        }

        return { map, maxY };
    }, [cells]);

    const totalHeight = (rowsData.maxY + 1) * rowHeight + (rowsData.maxY * gap);

    // --- 3. État du Scroll ---
    const [scrollState, setScrollState] = useState({ scrollTop: 0, scrollLeft: 0 });

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        setScrollState({
            scrollTop: target.scrollTop,
            scrollLeft: target.scrollLeft
        });
    };

    // --- 4. Virtualisation (Windowing) ---
    const BUFFER_ROWS = 5;
    const startRowIndex = Math.floor(scrollState.scrollTop / (rowHeight + gap));
    const renderStartRow = Math.max(0, startRowIndex - BUFFER_ROWS);
    const renderEndRow = Math.min(rowsData.maxY, startRowIndex + Math.ceil(height / (rowHeight + gap)) + BUFFER_ROWS);

    // OPTIMISATION : Allègement drastique des scans arrière imbriqués
    const rowIndicesToRender = useMemo(() => {
        const indices: number[] = [];

        // Headers fixes
        for (let i = 0; i < stickyRows; i++) {
            if (rowsData.map.has(i)) indices.push(i);
        }

        // Corps virtuel avec scan restreint
        const lookback = 30; // Réduit pour limiter l'impact de l'analyse arrière des rowSpans
        const scanStart = Math.max(stickyRows, renderStartRow - lookback);

        for (let i = scanStart; i <= renderEndRow; i++) {
            const rowCells = rowsData.map.get(i);
            if (!rowCells) continue;

            if (i >= renderStartRow) {
                indices.push(i);
            } else {
                // Scan arrière ciblé uniquement sur les cellules qui débordent horizontalement/verticalement
                const hasVisibleSpan = rowCells.some(c => i + (c.rect.ySpan || 1) - 1 >= renderStartRow);
                if (hasVisibleSpan) indices.push(i);
            }
        }

        // Footer fixe
        if (rowsData.maxY >= 0 && rowsData.map.has(rowsData.maxY) && !indices.includes(rowsData.maxY)) {
            indices.push(rowsData.maxY);
        }

        return indices; // Naturellement trié par la structure des boucles
    }, [renderStartRow, renderEndRow, stickyRows, rowsData]);

    // OPTIMISATION : Callback mémoïsé pour garder une référence de fonction stable
    const handleCellClick = useCallback((cell: ICell) => {
        if (onClick) onClick(cell);
    }, [onClick]);

    const startBlockStickyCols = stickyCols - 1;
    const startBlockStickRows = stickyRows - 1;

    // OPTIMISATION : Extraction du style de la grille pour éviter les re-créations d'objets
    const gridStyle = useMemo(() => ({
        display: 'grid',
        gridTemplateColumns: columnsWidth.map((colWidth: number) => `${colWidth}px`).join(' '),
        gridAutoRows: `${rowHeight}px`,
        gap: `${gap}px`,
        height: `${totalHeight}px`,
        width: `${totalWidth}px`,
        position: 'relative' as const,
    }), [columnsWidth, rowHeight, gap, totalHeight, totalWidth]);

    return (
        <div
            ref={containerRef}
            className="tcd9-container"
            onScroll={handleScroll}
            style={{
                height: `${height}px`,
                overflow: 'auto',
                position: 'relative',
                overflowAnchor: 'none',
                contain: 'strict'
            }}
        >
            <div className="tcd9-grid" style={gridStyle}>
                {startBlockStickRows > 0 && startBlockStickyCols > 0 && (
                    <div className="cell-base cell-is-corner" style={{
                        gridArea: `1 / 1 / span ${startBlockStickRows} / span ${startBlockStickyCols}`,
                        position: 'sticky',
                        top: 0,
                        left: 0,
                        zIndex: 50,
                    }} />
                )}

                {rowIndicesToRender.map((y) => (
                    <GridRowVirtual
                        key={y}
                        y={y}                                 // ✅ Primitif stable
                        rowCells={rowsData.map.get(y) || []}   // ✅ Référence stable issue de la Map
                        // isFooter={y === rowsData.maxY}
                        isFooter={(rowsData.maxY-y)<stickyFooterRows}
                        columnsWidth={columnsWidth}
                        stickyCols={stickyCols}
                        stickyRightCols={stickyRightCols}
                        columnPositions={columnPositions}
                        columnRightPositions={columnRightPositions}
                        rowHeight={rowHeight}
                        gap={gap}
                        isStickyRow={y < stickyRows}
                        isLastStickyRow={y === stickyRows - 1}
                        visibleXRange={{
                            start: scrollState.scrollLeft - 100,
                            end: scrollState.scrollLeft + containerWidth + 100
                        }}
                        renderStartRow={renderStartRow}
                        canDeleteRow={canDeleteRow}
                        onClick={handleCellClick}             // ✅ Référence de fonction mémorisée
                        onDeleteButtonClick={onDeleteButtonClick}
                    />
                ))}
            </div>
        </div>
    );
};