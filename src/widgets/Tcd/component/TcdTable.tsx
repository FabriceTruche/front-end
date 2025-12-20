import {ITcdManager} from "../model/TcdManager";
import {ITcdColumn} from "../model/TcdColumn";

const style = {
    border: "1px solid gray"
}
export type TcdTableProps<T> = {
    tcdManager: ITcdManager<T>
}
function displayValue (v: any): string {
    if (v === null || v === undefined) return ""
    if (v instanceof Date) return v.toDateString()
    return v.toString()
}
export const TcdTable = <T,>(props: TcdTableProps<T>) => {

    return (
        <table>
            <tbody>
            <tr style={style}>
                {props.tcdManager.columns.map((column: ITcdColumn) => {
                    return (
                        <th key={column.name}>
                            {column.name}
                        </th>
                    )
                })}
            </tr>
            {props.tcdManager.initialData.map((row: any) => {
                return (
                    <tr key={row.id}>
                        {props.tcdManager.columns.map((column: ITcdColumn) => {
                            return (
                                <td key={column.name} style={style}>
                                    {displayValue(row[column.name])}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
