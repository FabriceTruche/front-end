// cellFormatter.ts

import {ICell} from "./Cell";

export interface IFormatService {
    formatValue(cell: ICell): string;
}

export class _FormatService implements IFormatService {
    private static numberFormatCache: Record<number, Intl.NumberFormat> = {};
    private static dateFormatCache: Record<string, Intl.DateTimeFormat> = {};

    /**
     * Mappe un masque type Excel vers les options Intl
     */
    private static getDateFormatByMask(mask: string): Intl.DateTimeFormat {
        if (this.dateFormatCache[mask]) return this.dateFormatCache[mask];

        const options: Intl.DateTimeFormatOptions = {};

        // --- JOURS (E ou D) ---
        if (mask.includes('EEEE')) options.weekday = 'long';
        else if (mask.includes('EEE')) options.weekday = 'short';
        else if (mask.includes('EE')) options.weekday = 'narrow';

        if (mask.includes('DD')) options.day = '2-digit';
        else if (mask.includes('D')) options.day = 'numeric';

        // --- MOIS (M) ---
        if (mask.includes('MMMM')) options.month = 'long';
        else if (mask.includes('MMM')) options.month = 'short';
        else if (mask.includes('MM')) options.month = '2-digit';
        else if (mask.includes('M')) options.month = 'numeric';

        // --- ANNÉES (Y) ---
        if (mask.includes('YYYY')) options.year = 'numeric';
        else if (mask.includes('YY')) options.year = '2-digit';

        // --- HEURES / MIN / SEC ---
        if (mask.includes('HH')) options.hour = '2-digit';
        else if (mask.includes('H')) options.hour = 'numeric';

        if (mask.includes('mm')) options.minute = '2-digit';
        else if (mask.includes('m')) options.minute = 'numeric';

        if (mask.includes('ss')) options.second = '2-digit';
        else if (mask.includes('s')) options.second = 'numeric';

        options.hour12 = false;

        this.dateFormatCache[mask] = new Intl.DateTimeFormat('fr-FR', options);
        return this.dateFormatCache[mask];
    }

    private static getNumberFormatter(precision: number): Intl.NumberFormat {
        if (!this.numberFormatCache[precision]) {
            this.numberFormatCache[precision] = new Intl.NumberFormat('fr-FR', {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
            });
        }
        return this.numberFormatCache[precision];
    }

    /**
     * Implémentation de ICellFormatter
     */
    public formatValue(cell: ICell): string {
        const { value, column } = cell;

        if (value == null) return "";
        if (!column.format) return String(value);

        switch (column.format.type) {
            case 'number':
                return _FormatService.getNumberFormatter(column.format.precision ?? 0).format(value);

            case 'currency':
                // Utilisation d'un cache pour currency (toujours 2 décimales en général)
                return _FormatService.getNumberFormatter(2).format(value) + " €";

            case 'date':
                const d = value instanceof Date ? value : new Date(value);
                if (isNaN(d.getTime())) return String(value);

                const mask = column.format.mask || "DD/MM/YYYY";
                return _FormatService.getDateFormatByMask(mask).format(d);

            case 'boolean':
                return (value === true || String(value).toLowerCase() === 'true') ? "☑" : "☐";

            case 'text':
            default:
                return String(value);
        }
    }
}

export const formatterService: IFormatService = new _FormatService();

