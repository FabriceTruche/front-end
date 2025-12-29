import React, { memo, useMemo } from 'react';
import { ICell } from './Tcd5Types';

interface RowVirtualizedProps {
    cells: ICell[];
    relativeIndex: number;
    totalColumns: number;
    visibleColStart: number;
    visibleColEnd: number;
    stickyCols: number;
    isHeaderRow: boolean;
    isFooterRow: boolean;
    columnPositions: number[];
    isRightColSticky: boolean;
    rowHeight: number;
}

const RowVirtualized: React.FC<RowVirtualizedProps> = memo(({
                                                                cells, relativeIndex, totalColumns, visibleColStart, visibleColEnd,
                                                                stickyCols, isHeaderRow, isFooterRow, columnPositions, isRightColSticky, rowHeight
                                                            }) => {
    const gridRowPosition = relativeIndex + 1;

    const visibleCells = useMemo(() => {
        return cells.filter((cell) => {
            const x = cell.rect.x;
            return (
                x < stickyCols ||
                (isRightColSticky && x === totalColumns - 1) ||
                (x >= visibleColStart && x <= visibleColEnd)
            );
        });
    }, [cells, stickyCols, visibleColStart, visibleColEnd, isRightColSticky, totalColumns]);

    return (
        <>
            {visibleCells.map((cell, idx) => {
                const x = cell.rect.x;
                const isStickyLeft = x < stickyCols;
                const isStickyRight = isRightColSticky && x === totalColumns - 1;
                const isStickyY = isHeaderRow || isFooterRow;
                const isCorner = isStickyY && (isStickyLeft || isStickyRight);

                const classList = ['cell-base'];
                if (isStickyLeft || isStickyRight) classList.push('cell-sticky-x');
                if (isStickyY) classList.push('cell-sticky-y');
                if (isHeaderRow) classList.push('cell-header');
                if (isFooterRow) classList.push('cell-footer');
                if (isCorner) classList.push('cell-sticky-corner');
                if (isStickyLeft && x === stickyCols - 1) classList.push('cell-sticky-left-last');
                if (isStickyRight) classList.push('cell-sticky-right');

                return (
                    <div
                        key={`${x}-${idx}`}
                        className={classList.join(' ')}
                        style={{
                            gridColumn: x + 1,
                            gridRow: gridRowPosition,
                            left: isStickyLeft ? columnPositions[x] : undefined,
                            right: isStickyRight ? 0 : undefined,
                            top: isHeaderRow ? (relativeIndex * rowHeight) : undefined,
                            bottom: isFooterRow ? 0 : undefined,
                        }}
                    >
                        <div className="cell-inner" style={{ textAlign: cell.style?.textAlign as any }}>
                            {cell.value}
                        </div>
                    </div>
                );
            })}
        </>
    );
});

export default RowVirtualized;