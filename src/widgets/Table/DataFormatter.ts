
import {
    _BaseFormatter,
    _ColoredCurrencyFormatter,
    _CurrencyFormatter,
    _DateFormatter,
    IFormatter,
    _NumberFormatter, _SpecialDateFormatter
} from "./IFormatter";

export class DataFormatter {

    public static readonly baseFormatter: IFormatter = new _BaseFormatter()
    public static readonly numberFormatter: IFormatter = new _NumberFormatter()
    public static readonly currencyFormatter: IFormatter = new _CurrencyFormatter()
    public static readonly shortDateFormatter: IFormatter = new _DateFormatter({day: 'numeric', month: '2-digit', year: 'numeric'})
    public static readonly longDateFormatter: IFormatter = new _DateFormatter({day: 'numeric', month: 'long', year: 'numeric'})
    public static readonly shortPeriodeFormatter: IFormatter = new _DateFormatter({month: '2-digit', year: 'numeric'})
    public static readonly longPeriodeFormatter: IFormatter = new _DateFormatter({month: 'long', year: 'numeric'})

    // ---- Test Custom
    public static readonly coloredCurrencyFormatter: IFormatter = new _ColoredCurrencyFormatter()
    public static readonly specialDateFormatter: IFormatter = new _SpecialDateFormatter({month: 'long', year: 'numeric'})

}



// public static getFormatter(c: Column): IFormatter {
//     return c.dataFormat ? c.dataFormat : DataFormatter.baseFormatter
// }

