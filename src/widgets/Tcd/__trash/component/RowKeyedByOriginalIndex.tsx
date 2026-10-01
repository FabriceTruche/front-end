import React, { memo } from 'react';

interface RowProps {
    row: any;
    columns: any[];
    relativeIndex: number;
}

export const RowKeyedByOriginalIndex = memo(({ row, columns, relativeIndex }: RowProps) => {
    // Position dans la grille locale (commence à 1 pour CSS Grid)
    const gridRowPosition = relativeIndex + 1;

    return (
        <>
            {/* COUCHE 1 : Le fond pour le Hover (occupe toute la largeur) */}
            <div
                className="row-background"
                style={{
                    gridRow: gridRowPosition,
                    gridColumn: `1 / span ${columns.length}`,
                    height: "30px",
                    zIndex: 1,
                    position: 'relative'
                }}
            />

            {/* COUCHE 2 : Les cellules de données */}
            {columns.map((column, indexCol) => (
                <div
                    key={indexCol}
                    className="cell-data"
                    style={{
                        gridColumn: indexCol + 1,
                        gridRow: gridRowPosition,
                        zIndex: 2,
                        // pointerEvents: "none" // Optionnel : permet au clic de traverser vers le fond
                        //pointerEvents: "none",
                        backgroundColor: "transparent" // S'assurer que le fond est transparent
                    }}
                >
                    {row[column.name]}
                </div>
            ))}
        </>
    );
}, (prev, next) => {
    // Optimisation : ne re-render que si l'ID ou la position change
    return prev.row.id === next.row.id && prev.relativeIndex === next.relativeIndex;
});

