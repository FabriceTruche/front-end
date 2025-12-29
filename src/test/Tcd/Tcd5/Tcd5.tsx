import React, { useState, useMemo, useRef, UIEvent } from 'react';
import RowVirtualized from './RowVirtualized';
import { ICell, IColumn, IScrollContext, IRowData } from './Tcd5Types';
import './tcd5Styles.css';

interface Tcd5Props {
    allCells: ICell[];
    columns: IColumn[];
    maxRows: number;
    stickyRows?: number;
    stickyCols?: number;
    hasStickyFooter?: boolean;
    hasStickyRightCol?: boolean;
}

const ROW_HEIGHT = 44;
const BUFFER_Y = 10;
const BUFFER_X = 2;

export const Tcd5: React.FC<Tcd5Props> = ({
                                              allCells, columns, maxRows,
                                              stickyRows = 4,
                                              stickyCols = 3,
                                              hasStickyFooter = true,
                                              hasStickyRightCol = true
                                          }) => {
    const viewPortRef = useRef<HTMLDivElement>(null);

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

    const rowsMap = useMemo(() => {
        const map = new Map<number, ICell[]>();
        allCells.forEach((cell) => {
            const y = cell.rect.y;
            if (!map.has(y)) map.set(y, []);
            map.get(y)!.push(cell);
        });
        return map;
    }, [allCells]);

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
            Math.abs(newFirstRow - viewContext.firstRow) > 4 ||
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
        for (let y = 0; y < stickyRows; y++) {
            if (rowsMap.has(y)) rows.push({ y, cells: rowsMap.get(y)!, isHeader: true, isFooter: false });
        }
        for (let y = viewContext.firstRow; y <= Math.min(maxRows - 2, viewContext.lastRow); y++) {
            if (rowsMap.has(y) && y >= stickyRows) {
                rows.push({ y, cells: rowsMap.get(y)!, isHeader: false, isFooter: false });
            }
        }
        const footerY = maxRows - 1;
        if (hasStickyFooter && rowsMap.has(footerY)) {
            rows.push({ y: footerY, cells: rowsMap.get(footerY)!, isHeader: false, isFooter: true });
        }
        return rows;
    }, [viewContext, rowsMap, stickyRows, maxRows, hasStickyFooter]);

    return (
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
    );
};