export {}

// import React, {useEffect, useMemo, useRef, useState} from 'react';
// import GridRowVirtual from './GridRowVirtual';
// import {ICell} from "./Cell";
//
// interface GridViewProps {
//     cells: ICell[];
//     columnsWidth: number[]
//     rowHeight: number;
//     height: number;
//     stickyCols: number;
//     stickyRightCols: number;
//     stickyRows: number;
//     gap?: number;
//     onClick?: (cell: ICell)=>void
// }
// export const GridView = ({
//                             cells,
//                             columnsWidth,
//                             rowHeight,
//                             height,
//                             stickyCols,
//                             stickyRightCols,
//                             stickyRows,
//                             gap = 0,
//                             onClick = undefined
//                         }: GridViewProps) => {
//
//     const containerRef = useRef<HTMLDivElement>(null);
//     const [containerWidth, setContainerWidth] = useState(0);
//
//     useEffect(() => {
//         if (!containerRef.current) return;
//
//         const observer = new ResizeObserver((entries) => {
//             // On accède directement au premier élément s'il existe
//             const entry = entries[0];
//             if (entry) {
//                 setContainerWidth(entry.contentRect.width);
//             }
//         });
//
//         observer.observe(containerRef.current);
//         return () => observer.disconnect();
//     }, []);
//
//
//
//     // --- 1. Pré-calculs des positions incluant le GAP ---
//     const columnPositions = useMemo(() => {
//         let currentPos = 0;
//         return columnsWidth.map((colWidth: number) => {
//             const pos = currentPos;
//             currentPos += colWidth + gap;
//             return pos;
//         });
//     }, [columnsWidth, gap]);
//
//     const columnRightPositions = useMemo(() => {
//         const rightPositions = new Array(columnsWidth.length).fill(0);
//         let currentPos = 0;
//         for (let i = columnsWidth.length - 1; i >= 0; i--) {
//             rightPositions[i] = currentPos;
//             currentPos += columnsWidth[i] + gap;
//         }
//         return rightPositions;
//     }, [columnsWidth, gap]);
//
//     const totalWidth = useMemo(() => {
//         if (columnsWidth.length === 0) return 0;
//         return columnsWidth.reduce((acc:number, colWidth:number) => acc + colWidth, 0) + (columnsWidth.length - 1) * gap;
//     }, [columnsWidth, gap]);
//
//     const rowsData = useMemo(() => {
//         const map = new Map<number, ICell[]>();
//         let maxY = 0;
//
//         console.log(new Date(),300)
//
//         cells.forEach((cell) => {
//             const y = cell.rect.y;
//             if (y > maxY) maxY = y;
//             if (!map.has(y)) map.set(y, []);
//             map.get(y)!.push(cell);
//         });
//
//         console.log(new Date(),301)
//
//         return { map, maxY };
//     }, [cells]);
//
//     const totalHeight = (rowsData.maxY + 1) * rowHeight + (rowsData.maxY * gap);
//
//     // --- 2. État du Scroll (Anti-jitter) ---
//     const [scrollState, setScrollState] = useState({ scrollTop: 0, scrollLeft: 0 });
//
//     const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//         const target = e.currentTarget;
//         setScrollState({
//             scrollTop: target.scrollTop,
//             scrollLeft: target.scrollLeft
//         });
//     };
//
//     // --- 3. Virtualisation (Windowing) ---
//     const BUFFER_ROWS = 5;
//     const startRowIndex = Math.floor(scrollState.scrollTop / (rowHeight + gap));
//     const renderStartRow = Math.max(0, startRowIndex - BUFFER_ROWS);
//     const renderEndRow = Math.min(rowsData.maxY, startRowIndex + Math.ceil(height / (rowHeight + gap)) + BUFFER_ROWS);
//
//     const rowIndicesToRender = useMemo(() => {
//         const indices = new Set<number>();
//         // Headers
//         for (let i = 0; i < stickyRows; i++) if (rowsData.map.has(i)) indices.add(i);
//
//         // Corps avec recherche arrière pour les RowSpans
//         const lookback = 50;
//         const scanStart = Math.max(0, renderStartRow - lookback);
//         for (let i = scanStart; i <= renderEndRow; i++) {
//             const rowCells = rowsData.map.get(i);
//             if (!rowCells) continue;
//             const hasVisibleContent = i >= renderStartRow || rowCells.some(c => i + (c.rect.ySpan || 1) - 1 >= renderStartRow);
//             if (hasVisibleContent && i >= stickyRows) indices.add(i);
//         }
//         // Footer
//         if (rowsData.map.has(rowsData.maxY)) indices.add(rowsData.maxY);
//
//         return Array.from(indices).sort((a, b) => a - b);
//     }, [renderStartRow, renderEndRow, stickyRows, rowsData]);
//
//     const startBlockStickyCols = stickyCols-1
//     const startBlockStickRows = stickyRows-1
//
//     // console.log("-->",rowIndicesToRender.length)
//     return (
//         <div
//             ref={containerRef} // On attache la ref ici
//
//             className="tcd9-container"
//             onScroll={handleScroll}
//             style={{
//                 height: `${height}px`,
//                 overflow: 'auto',
//                 position: 'relative',
//                 overflowAnchor: 'none', // Important pour le tremblement
//                 contain: 'strict'
//             }}
//         >
//             <div className="tcd9-grid" style={{
//                 display: 'grid',
//                 gridTemplateColumns: columnsWidth.map((colWidth: number) => `${colWidth}px`).join(' '),
//                 gridAutoRows: `${rowHeight}px`,
//                 gap: `${gap}px`,
//                 height: `${totalHeight}px`,
//                 width: `${totalWidth}px`,
//                 position: 'relative',
//             }}>
//                 {startBlockStickRows>0 && startBlockStickyCols>0 && (
//                     <div className="cell-base cell-is-corner" style={{
//                         gridArea: `1 / 1 / span ${startBlockStickRows} / span ${startBlockStickyCols}`,
//                         position: 'sticky',
//                         top: 0,
//                         left: 0,
//                         zIndex: 50,
//                     }} ></div>
//                 )}
//
//                 {rowIndicesToRender.map((y) => (
//                     <GridRowVirtual
//                         key={y}
//                         rowData={{ y, cells: rowsData.map.get(y) || [], isFooter: y === rowsData.maxY }}
//                         columnsWidth={columnsWidth}
//                         stickyCols={stickyCols}
//                         stickyRightCols={stickyRightCols}
//                         columnPositions={columnPositions}
//                         columnRightPositions={columnRightPositions}
//                         rowHeight={rowHeight}
//                         gap={gap}
//                         isStickyRow={y < stickyRows}
//                         isLastStickyRow={y === stickyRows - 1}
//                         visibleXRange={{
//                             start: scrollState.scrollLeft - 100,
//                             end: scrollState.scrollLeft + containerWidth + 100
//                         }}
//                         renderStartRow={renderStartRow}
//                         onClick={(cell:ICell)=>onClick && onClick(cell)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };
//
//
//
// /*
//     // --- 1. CALCULS AUTOMATIQUES DES LARGEURS DE COLONNES (BASÉ SUR LE CONTENU) ---
//     // const columnsWidth = useMemo(() => {
//     //     // Étape A : Trouver l'index maximal de colonne X utilisé
//     //     let maxX = 0;
//     //     cells.forEach(cell => {
//     //         if (cell.rect.x > maxX) maxX = cell.rect.x;
//     //     });
//     //
//     //     // Étape B : Instancier un tableau indexé par x (taille maxX + 1) avec une largeur minimale par défaut (60px)
//     //     const computedWidths = new Array(maxX + 1).fill(20);
//     //
//     //     // Police à ajuster selon le style appliqué à vos éléments graphiques (ex: .cell-inner)
//     //     const gridFont = "12px -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, sans-serif"
//     //     const PADDING_SECURE = 26; // Espacement de sécurité global (marge gauche + droite)
//     //
//     //     // Étape C : Parcourir toutes les cellules pour déterminer la largeur maximale requise par colonne X
//     //     const getContext = (font: string = "12px sans-serif"):CanvasRenderingContext2D|null => {
//     //         const canvas: HTMLCanvasElement = document.createElement('canvas');
//     //         let context: CanvasRenderingContext2D | null = canvas.getContext('2d');
//     //
//     //         if (context)
//     //             context.font = font;
//     //
//     //         return context
//     //     };
//     //     const context = getContext(gridFont)
//     //
//     //     const measureTextWidth = (text: string): number => {
//     //         if (context === null)
//     //             return 100;
//     //
//     //         return context.measureText(text).width;
//     //     };
//     //
//     //     cells.forEach((cell) => {
//     //         const x = cell.rect.x;
//     //         const formattedText = cell.getFormattedValue() || "";
//     //         const textWidth = measureTextWidth(formattedText);
//     //         const totalWidthNeeded = Math.ceil(textWidth + PADDING_SECURE);
//     //
//     //         if (totalWidthNeeded > computedWidths[x]) {
//     //             computedWidths[x] = totalWidthNeeded;
//     //         }
//     //     });
//     //
//     //     return computedWidths;
//     // }, [cells]);
//
//  */