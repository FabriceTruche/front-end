import React, { memo, useMemo } from 'react';

const RowVirtualized = memo(({
                                 cells, relativeIndex, totalColumns, visibleColStart, visibleColEnd,
                                 stickyCols, isHeaderRow, isFooterRow, columnPositions, isRightColSticky, rowHeight
                             }: any) => {

    const visibleCells = cells.filter((cell: any) => {
        const x = cell.rect.x;
        return (x < stickyCols || (isRightColSticky && x === totalColumns - 1) || (x >= visibleColStart && x <= visibleColEnd));
    });

    return (
        <>
            {visibleCells.map((cell: any, idx: number) => {
                const x = cell.rect.x;
                const isStickyLeft = x < stickyCols;
                const isStickyRight = isRightColSticky && x === totalColumns - 1;
                const isStickyY = isHeaderRow || isFooterRow;

                // Classes CSS
                let className = "cell-base";
                if (isHeaderRow) className += " cell-header";
                if (isFooterRow) className += " cell-footer";
                if (isStickyLeft || isStickyRight) className += " cell-sticky-x";
                if (isStickyY) className += " cell-sticky-y";
                if (isStickyY && (isStickyLeft || isStickyRight)) className += " cell-sticky-corner";
                if (isStickyLeft && x === stickyCols - 1) className += " cell-sticky-left-last";

                return (
                    <div
                        key={`${x}-${idx}`}
                        className={className}
                        style={{
                            gridColumn: x + 1,
                            gridRow: relativeIndex + 1,
                            left: isStickyLeft ? columnPositions[x] : undefined,
                            right: isStickyRight ? 0 : undefined,
                            top: isHeaderRow ? (relativeIndex * rowHeight) : undefined,
                            bottom: isFooterRow ? 0 : undefined,
                            zIndex: (isStickyY && (isStickyLeft || isStickyRight)) ? 30 : (isStickyY || isStickyLeft || isStickyRight ? 10 : 1)
                        }}
                    >
                        <div className="cell-inner" style={{ textAlign: cell.style?.textAlign }}>
                            {cell.value}
                        </div>
                    </div>
                );
            })}
        </>
    );
});

export default RowVirtualized;