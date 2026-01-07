import {createCell, ITcdCell} from './TcdCell';
import {createTcdColumn, ITcdColumn} from './TcdColumn';

export const generateMock = (rowCount: number) => {

    // 1. Définition des colonnes de test (Masques & Types)
    const columns: ITcdColumn[] = [
        createTcdColumn('ID', 100, 'number', { precision: 1 }),
        createTcdColumn('Jour (EEEE)', 130, 'date', { mask: 'EEEE DD MMM' }),
        createTcdColumn('Date (M)', 90, 'date', { mask: 'D/M/YY' }),
        createTcdColumn('Heure (HH:mm)', 100, 'date', { mask: 'HH:mm:ss' }),
        createTcdColumn('Réel (3d)', 100, 'number', { precision: 3 }),
        createTcdColumn('Actif', 70, 'boolean')
    ];

    // Ajout de colonnes de scroll
    for (let i = 1; i <= 15; i++) {
        columns.push(createTcdColumn(`Data_${i}`,90, 'number',{ precision : 2}))
    }

    // Colonne de droite figée
    columns.push(createTcdColumn('TOTAL',100,'currency', { precision : 4 }));

    const cells: ITcdCell[] = [];
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
