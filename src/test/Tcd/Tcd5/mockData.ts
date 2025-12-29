import { ICell, IColumn } from './Tcd5Types';

export const generateMockData = (rowCount: number, colCount: number) => {
    const columns: IColumn[] = [];
    const allCells: ICell[] = [];

    for (let x: number = 0; x < colCount; x++) {
        let width = 130;
        let label = `Donnée ${x}`;
        if (x === 0) { width = 60; label = "ID"; }
        else if (x === 1) { width = 180; label = "Client"; }
        else if (x === 2) { width = 110; label = "Statut"; }
        else if (x === colCount - 1) { width = 120; label = "TOTAL"; }
        else {
            const cycle = [110, 160, 90, 210];
            width = cycle[x % cycle.length];
        }
        columns.push({ name: `col_${x}`, label, width });
    }

    for (let y: number = 0; y < rowCount; y++) {
        let rowSum: number = 0;
        const isHeader = y === 0;
        const isFooter = y === rowCount - 1;

        for (let x: number = 0; x < colCount; x++) {
            let value: string;
            if (isHeader) value = columns[x].label;
            else if (x === colCount - 1) value = rowSum.toLocaleString() + " €";
            else if (x === 0) value = isFooter ? "Σ" : `${y}`;
            else {
                const val = Math.floor(Math.random() * 100);
                if (!isFooter) rowSum += val;
                value = isFooter ? "---" : val.toString();
            }

            allCells.push({
                value,
                rect: { x, y, w: 1, h: 1 },
                // On ne passe plus de couleurs ici, le CSS s'en occupe via les classes
                style: {
                    textAlign: (x === 0 || isHeader) ? 'left' : 'right'
                }
            });
        }
    }
    return { columns, allCells, maxRows: rowCount };
};