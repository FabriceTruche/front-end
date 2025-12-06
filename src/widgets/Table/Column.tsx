import {IFormatter} from "./IFormatter";
import {JSX} from "react";

export type Column = {
    name: string
    type: string
    sort: number
    label: string
    dataFormat?: IFormatter
    editor?: JSX.Element
}
