import {createCell, ICell} from './Cell';
import { IColumn } from './types';

export const generateTcd9MockData = (rowCount: number) => {
    // 1. Définition des colonnes de test (Masques & Types)
    const columns: IColumn[] = [
        {name: 'ID', width: 100, format: {type: 'number', precision: 1}},
        {name: 'Jour (EEEE)', width: 130, format: {type: 'date', mask: 'EEEE DD MMM'}},
        {name: 'Date (M)', width: 90, format: {type: 'date', mask: 'D/M/YY'}},
        {name: 'Heure (HH:mm)', width: 100, format: {type: 'date', mask: 'HH:mm:ss'}},
        {name: 'Réel (3d)', width: 100, format: {type: 'number', precision: 3}},
        {name: 'Actif', width: 70, format: {type: 'boolean'}},
    ];

    // Ajout de colonnes de scroll
    for (let i = 1; i <= 15; i++) {
        columns.push({
            name: `Data_${i}`,
            width: 90,
            format: {type: 'number', precision: 2}
        });
    }

    // Colonne de droite figée
    columns.push({
        name: 'TOTAL',
        width: 110,
        format: {type: 'currency'}
    });

    const cells: ICell[] = [];
    const now = new Date();

    // --- GÉNÉRATION ---

    // Ligne 0 : Headers
    columns.forEach((col, x) => {
        cells.push(createCell(col.name, col, {x, y: 0}, true));
    });

    // Lignes de données
    for (let y = 1; y <= rowCount; y++) {
        columns.forEach((col, x) => {

            // SIMULATION DE "TROUS" (Cellules vides mais présentes dans le DOM)
            // On génère un trou de 5% de probabilité pour tester l'opacité du scroll
            const isGap = (x > 1 && x < columns.length - 1) && Math.random() < 0.05;

            let value: any = null;

            if (!isGap) {
                switch (col.format?.type) {
                    case 'date':
                        // On décale de y jours et y heures pour varier
                        const d = new Date(now);
                        d.setDate(d.getDate() + y);
                        d.setHours(d.getHours() + y, d.getMinutes() + (y * 2));
                        value = d;
                        break;
                    case 'number':
                        // Incorpore des négatifs pour le style conditionnel
                        value = (Math.random() * 2000) - 800;
                        break;
                    case 'boolean':
                        value = Math.random() > 0.5;
                        break;
                    case 'currency':
                        value = (Math.random() * 5000);
                        break;
                    default:
                        value = x === 0 ? y : `Val ${x}-${y}`;
                }
            }

            // Création systématique de la cellule (même si value est null)
            // L'objet ICell garantit que la div aura un fond blanc opaque
            cells.push(createCell(value, col, {x, y}, false));
        });
    }

    return {cells, columns};
}
