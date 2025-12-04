import {DisplayedCellData, IFormatter} from "./IFormatter";
import {CSSProperties} from "react";
import {Column} from "../../common/common";

/**
 *
 */
class BaseFormatter implements IFormatter {

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
class NumberFormatter extends BaseFormatter {

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
class CurrencyFormatter extends NumberFormatter {

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
class ColoredCurrencyFormatter extends CurrencyFormatter {
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
class DateFormatter extends BaseFormatter {

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
class SpecialDateFormatter extends DateFormatter {
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
/**
*
*/
export class DataFormatter {

    public static getFormatter(c: Column): IFormatter {
        return c.dataFormat ? c.dataFormat : DataFormatter.baseFormatter
    }

    public static readonly baseFormatter: IFormatter = new BaseFormatter()
    public static readonly numberFormatter: IFormatter = new NumberFormatter()
    public static readonly currencyFormatter: IFormatter = new CurrencyFormatter()
    public static readonly shortDateFormatter: IFormatter = new DateFormatter({day: 'numeric', month: '2-digit', year: 'numeric'})
    public static readonly longDateFormatter: IFormatter = new DateFormatter({day: 'numeric', month: 'long', year: 'numeric'})
    public static readonly shortPeriodeFormatter: IFormatter = new DateFormatter({month: '2-digit', year: 'numeric'})
    public static readonly longPeriodeFormatter: IFormatter = new DateFormatter({month: 'long', year: 'numeric'})

    // ---- Test Custom
    public static readonly coloredCurrencyFormatter: IFormatter = new ColoredCurrencyFormatter()
    public static readonly specialDateFormatter: IFormatter = new SpecialDateFormatter({month: 'long', year: 'numeric'})

}

