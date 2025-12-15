import {IFormatter} from "./IFormatter";
import {JSX} from "react";

export type ColumnView = {
    headerFormatter?: IFormatter
    bodyFormatter?: IFormatter
    footerFormatter?: IFormatter
    editor?: JSX.Element
}
