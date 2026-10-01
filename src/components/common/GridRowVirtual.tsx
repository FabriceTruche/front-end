import React, { memo } from 'react';
import { ICell, TypeCell } from "./Cell";

interface GridRowVirtualProps {
    y: number;
    rowCells: ICell[];
    isFooter?: boolean;
    columnsWidth: number[];
    stickyCols: number;
    stickyRightCols: number;
    columnPositions: number[];
    columnRightPositions: number[];
    rowHeight: number;
    gap: number;
    isStickyRow: boolean;
    isLastStickyRow?: boolean;
    visibleXRange: { start: number; end: number };
    renderStartRow: number;
    canDeleteRow?: boolean;
    onClick?: (cell: ICell) => void
    onDeleteButtonClick?: (y: number) => void
}

const GridRowVirtual: React.FC<GridRowVirtualProps> = memo(({
                                                                y, rowCells, isFooter, columnsWidth, stickyCols, stickyRightCols, columnPositions,
                                                                columnRightPositions, rowHeight, gap, isStickyRow, isLastStickyRow,
                                                                visibleXRange, renderStartRow, onClick, canDeleteRow, onDeleteButtonClick
                                                            }) => {

    return (
        <>
            {rowCells.map((cell: ICell) => {
                const { x } = cell.rect;
                const xSpan = cell.rect.xSpan || 1;
                const ySpan = cell.rect.ySpan || 1;

                const isStickyLeft = x < stickyCols;
                const isStickyRight = x >= columnsWidth.length - stickyRightCols;
                const isStickyTop = isStickyRow;
                const isStickyBottom = isFooter === true;

                // --- VIRTUALISATION HORIZONTALE ---
                const lastColIdx = Math.min(x + xSpan - 1, columnsWidth.length - 1);

                if (!isStickyLeft && !isStickyRight) {
                    const cellStartPx = columnPositions[x];
                    const cellEndPx = columnPositions[lastColIdx] + columnsWidth[lastColIdx];

                    if (cellEndPx < visibleXRange.start || cellStartPx > visibleXRange.end) {
                        return null;
                    }
                }

                // --- VIRTUALISATION VERTICALE ---
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

                const stickyTopPos = y * (rowHeight + gap);
                const stickyLeftPos = columnPositions[x];
                const stickyRightPos = columnRightPositions[lastColIdx];

                // CALCUL ClassName technique
                let clsName = "cell-base";
                if (zoneClass !== "") clsName += " " + zoneClass;
                if (cell.isLabel) clsName += " cell-is-header";
                if (isLastStickyRow) clsName += " row-last-sticky";
                clsName += " typecell-" + TypeCell[cell.typeCell];

                // if (cell.column.name.toLowerCase()==="id")
                //     clsName += " typecell-idcol"

                return (
                    <div
                        key={`${x}-${y}`}
                        className={clsName}
                        style={{
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
                            justifySelf: 'stretch',
                            contain: 'layout style paint',
                        }}
                        onClick={() => onClick && onClick(cell)}
                    >
                        <div className="cell-inner" style={cell.getStyle()}>
                            {cell.getFormattedValue()}
                        </div>
                    </div>
                );
            })}

            {!isStickyRow && !isLastStickyRow && !!canDeleteRow && (
                <div
                    style={{
                            gridColumnStart:  columnsWidth.length + 1,
                            gridColumnEnd: columnsWidth.length + 2,
                            gridRowStart: y + 1,
                            gridRowEnd: y + 1 + 1,
                            position: 'sticky',
                            // left: isStickyLeft ? `${stickyLeftPos}px` : undefined,
                            // right: isStickyRight ? `${stickyRightPos}px` : undefined,
                            // top: isStickyTop ? `${stickyTopPos}px` : undefined,
                            // bottom: isStickyBottom ? 0 : undefined,
                            // zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifySelf: 'stretch',
                            contain: 'layout style paint',
                        }}
                >
                    <button
                    onClick={()=>{
                        if (onDeleteButtonClick)
                            onDeleteButtonClick(y)
                    }}
                    >🗑️</button>
                </div>
            )}
        </>
    );
});

export default GridRowVirtual;