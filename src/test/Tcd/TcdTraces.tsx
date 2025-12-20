import {IField} from "../../widgets/Tcd/model/Field";
import {helper} from "../../common/Helper";
import {IMeasureValue} from "../../widgets/Tcd/model/MeasureValue";
import {ICell} from "../../widgets/Tcd/model/Cell";

/************************************************************************************************************
 *
 */
export const Block=({children}: any) => {
    return (
        <div style={{
            border: "1px solid lightgray",
            borderRadius: "3px",
            margin: "10px",
            padding: "10px",
        }}>
            {children}
        </div>
    )

}
/************************************************************************************************************
 *
 */
export type FieldTraceProps<T> = {
    field: IField<T>
    level: number
}
export const FieldTrace = <T,>(props: FieldTraceProps<T>) => {
    return (
        <div
            style={{
                paddingLeft: props.level * 25
            }}
        >
            [{props.field.column.name}][total={props.field.column.total.toString()}]{props.field.value.toString()}(nb={props.field.dataRows.length})[{props.field.dataRows.map((r:any)=>r.id).join(',')}]
            {props.field.fields.map((f: IField<T>) => {
                return (
                    <FieldTrace key={helper.genKey()} field={f} level={props.level + 1}/>
                )
            })}
        </div>
    )
}
/************************************************************************************************************
 *
 */
export type TerminalTraceProps<T> = {
    fields: IField<T>[]
    title:string
}
export const TerminalTrace = <T,>(props: TerminalTraceProps<T>) => {
    return (
        <pre>
            <div>{props.title}</div>
            <div>
                {props.fields.map((field: IField<any>) => {
                    return (
                        <div>
                            value={field.value.toString()},col={field.column.name},isTerm:{field.isTerminal().toString()},dr={field.dataRows.map((r:any)=>r.id).join(',')}
                        </div>
                    )
                })}
            </div>
        </pre>
    )
}
/************************************************************************************************************
 *
 */
export type MeasuresValueTraceProps<T> = {
    measuresValue: IMeasureValue<T>[]
}
export const MeasuresValueTrace = <T,>(props: MeasuresValueTraceProps<T>) => {
    return (
        <pre>
            <div>dr count={props.measuresValue.reduce((prev: number, mv:IMeasureValue<T>)=>prev+mv.dataRows.length,0)}</div>
            <div>
                {props.measuresValue.map((mv: IMeasureValue<T>) => {
                    return (
                        <div>
                            value={mv.value.toString()},
                            dr={mv.dataRows.map((r:any)=>r.id).join(',')},
                            row={mv.rowField.value.toString()},
                            col={mv.colField.value.toString()},
                            isRowTotal={mv.isRowTotal().toString()},
                            isColTotal={mv.isColTotal().toString()},
                            isTotal={mv.isTotal().toString()},
                        </div>
                    )
                })}
            </div>
        </pre>
    )
}
/************************************************************************************************************
 *
 */
export type CellTraceProps = {
    title: string
    cell: ICell[]
}
/************************************************************************************************************
 *
 */
export const CellTrace=(props:CellTraceProps) => {
    return (
        <pre>
            *{props.title}*
            {props.cell.map((cell:ICell, index:number) => {
                return (
                    <div key={index}>
                        {JSON.stringify(cell,null)}
                    </div>
                )
            })}
        </pre>
    )
}