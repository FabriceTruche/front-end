import {CSSProperties} from "react";
import {Column} from "./Column";

export type DisplayedCellData = {
    style?: CSSProperties
    className?: string
    value: string
}
export interface IFormatter {
    format(v: any): DisplayedCellData
    formatNumber(v: number): DisplayedCellData
    formatString(v: string): DisplayedCellData
    formatDate(v: Date): DisplayedCellData
    formatBoolean(v: boolean): DisplayedCellData
    formatObject(v: object): DisplayedCellData
}

/**
 * Décline les différentes implémentations des Formatter
 */
export class _BaseFormatter implements IFormatter {

    protected getDataCell<T extends {toString: ()=>string}>(value: T, style?: CSSProperties, className?: string): DisplayedCellData {
        return {
            value: value ? value.toString() : "",
            style: style,
            className: className
        }
    }

    public format(v: any): DisplayedCellData {
        if (typeof v === "string")
            return this.formatString(v)

        if (typeof v === "boolean")
            return this.formatBoolean(v)

        if (typeof v === "number")
            return this.formatNumber(v)

        if (v instanceof Date)
            return this.formatDate(v)

        if (typeof v === "object")
            return this.formatObject(v)

        return {
            value: v
        }
    }

    public formatBoolean(v: boolean): DisplayedCellData {
        return this.getDataCell(v)
    }

    public formatDate(v: Date): DisplayedCellData {
        return this.getDataCell(v.toLocaleString(), {justifyContent: "center"})
    }

    public formatNumber(v: number): DisplayedCellData {
        return this.getDataCell(v, {justifyContent: "end"})
    }

    public formatObject(v: object): DisplayedCellData {
        return this.getDataCell(v)
    }

    public formatString(v: string): DisplayedCellData {
        return this.getDataCell(v)
    }
}
/**
 *
 */
export class _NumberFormatter extends _BaseFormatter {

    protected readonly _nbDecimal: number

    constructor(nbDecimal: number=2) {
        super()
        this._nbDecimal = nbDecimal
    }

    public formatNumber(v: number): DisplayedCellData {
        return this.getDataCell(v.toFixed(this._nbDecimal))
    }
}

/**
 *
 */
export class _CurrencyFormatter extends _NumberFormatter {

    protected _formatEuro: Intl.NumberFormat

    constructor(nbDecimal: number=2) {
        super(nbDecimal)
        this._formatEuro = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: this._nbDecimal,
            maximumFractionDigits: this._nbDecimal,
        });
    }

    public formatNumber(v: number): DisplayedCellData {
        return this.getDataCell(this._formatEuro.format(v), {
            justifyContent: "end",
        })
    }
}
/**
*
*/
export class _ColoredCurrencyFormatter extends _CurrencyFormatter {
    public formatNumber(v: number): DisplayedCellData {
        const style: CSSProperties = {
            color:  (v>0) ? "green" : "red",
            justifyContent: "end",
            fontWeight: (v>0) ? "normal" : "bold",
        }

        return this.getDataCell(this._formatEuro.format(v), style)
    }
}
/**
 *
 */
export class _DateFormatter extends _BaseFormatter {

    // {
    //     weekday: 'long',   // jour de la semaine en toutes lettres
    //     year: 'numeric',   // année en chiffres
    //     month: 'long',     // mois en toutes lettres
    //     day: 'numeric',    // jour du mois en chiffres
    //     hour: '2-digit',   // heure sur 2 chiffres
    //     minute: '2-digit', // minute sur 2 chiffres
    // };
    protected readonly _dateOptions: Intl.DateTimeFormatOptions

    constructor(options: Intl.DateTimeFormatOptions) {
        super()
        this._dateOptions = {...options}
    }

    public formatDate(v: Date): DisplayedCellData {
        return this.getDataCell(v.toLocaleString('fr-FR',this._dateOptions), {justifyContent: "end"})
    }
}
/**
* Exemple de custom de style
*/
export class _SpecialDateFormatter extends _DateFormatter {
    public formatDate(v: Date): DisplayedCellData {

        const year = v.getFullYear()
        let color: string = "black"

        if (year < 2025) color="violet"
        if (year < 2020) color="blue"
        if (year < 2017) color="green"

        return this.getDataCell(
            v.toLocaleString('fr-FR', this._dateOptions),
            {   color: color,
                justifyContent: "center",
                fontWeight: "bold"
            }
        )
    }
}
