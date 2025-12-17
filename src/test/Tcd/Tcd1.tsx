import {GenColumn, helper} from "../../common/Helper";
import {ITcdColumn} from "../../widgets/Tcd/TcdColumn";
import {factory} from "../../common/Factory";
import {ITcdManager} from "../../widgets/Tcd/TcdManager";
import {JSX, useMemo} from "react";
import {IField} from "../../widgets/Tcd/Field";
import {IMeasure} from "../../widgets/Tcd/Measure";
import {functionsGroup} from "../../widgets/Tcd/functionsGroup";
import {IMeasureValue} from "../../widgets/Tcd/MeasureValue";
import {Coord, ITcdViewManager, TcdMode} from "../../widgets/Tcd/TcdViewManager";
import {Cell, TcdBlock} from "../../widgets/Tcd/TcdBlock";
import {DataFormatter} from "../../widgets/Table/DataFormatter";

function createDummyData<T>(): [ITcdManager<T>, ITcdViewManager<T>] {

    const maxRowCount = 10
    const schema: GenColumn[] = [
        { name: "id", type: "index", label:"Id" },
        { name: "lot", type: "integer", label:"Numéro", items: [1,2,3,4]/*,5,6,7,8,9,10,11]*/ },
        { name: "type_op", type: "string", label: "Type opération", items:["ACHAT","REGUL","SOLDE","OD"] },
        { name: "depot", type: "integer", label: "Dépôt", items: [100, 200, 350, 450, 500, 650, 620, 680, 820] },
        { name: "facture", type: "boolean", label: "Facturation" },
        { name: "annee", type: "integer", label: "Année", items: [2023, 2024, 2025] },
        { name: "date_ope", type: "Date", label:"Date opératoin" },
        { name: "libelle", type: "string", label:"Libellé", ratioNull: 0.5 },
        { name: "periode", type: "Date", label: "Période" },
        { name: "debit", type: "float", label: "Débit", min:0, max:1000 },
        { name: "credit", type: "float", label: "Crédit", min:0, max:5000 },
    ]
    const columns: ITcdColumn[] = helper.generateTcdColumn(schema)
    // columns[9].dataFormatter = DataFormatter.currencyFormatter // sum debit
    // columns[10].dataFormatter = DataFormatter.numberFormatter // count credit

    const data: any[] = helper.generateData(schema, maxRowCount, (row:any)=>{
        if (helper.tf())
            row.debit=null
        else
            row.credit=null
    })
    const tcdManager = factory.createTcdManager<any>(data, columns)
    const sumDebit: IMeasure = factory.createMeasure(columns[9],functionsGroup.sum)
    const sumCredit: IMeasure = factory.createMeasure(columns[10],functionsGroup.sum)

    tcdManager.buildTcd(["annee","lot","type_op"],["depot"],[sumDebit,sumCredit])

    const tcdViewManager = factory.createTcdViewManager<any>()
    tcdViewManager.buildTcdView(tcdManager)

    return [tcdManager,tcdViewManager]
}

export const Tcd1=()=> {
    const [tcd,tcdView] = useMemo<[ITcdManager<any>,ITcdViewManager<any>]>(() => {
        return createDummyData()
    }, [])

    // const tcdView = useMemo<ITcdViewManager<any>>(() => {
    //     return factory.createTcdViewManager()
    // }, [])
    // const bodyRowsCells: Cell[] = tcdView.calculateFieldsCoordinates(tcdManager.rowTreeField, TcdMode.top)
    // const bodyColsCells: Cell[] = tcdView.calculateFieldsCoordinates(tcdManager.colTreeField, TcdMode.top)
    // console.log(bodyRowsCells)

    return (
        <pre>
            {/*<Block>*/}
            {/*    <TcdTable tcdManager={tcdManager} />*/}
            {/*</Block>*/}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
            }}>
                <Block>
                    <TcdTable tcdManager={tcd} />
                </Block>
               {/*<Block>*/}
               {/*     <FieldView field={tcd.rowTreeField} level={0} />*/}
               {/* </Block>*/}

               {/* <Block>*/}
               {/*     <FieldView field={tcd.colTreeField} level={0} />*/}
               {/* </Block>*/}
               {/* <Block>*/}
               {/*     **ROWS***/}
               {/*     {tcdView.rowsCell.map((cell:Cell<IField<any>>)=>{*/}
               {/*         return (*/}
               {/*             <div>*/}
               {/*                 [{cell.coord.y};{cell.coord.x}]={cell.object.value.toString()};*/}
               {/*             </div>*/}
               {/*         )*/}
               {/*     })}*/}
               {/* </Block>*/}
               {/* <Block>*/}
               {/*     **COLS***/}
               {/*     {tcdView.colsCell.map((cell:Cell<IField<any>>)=>{*/}
               {/*         return (*/}
               {/*             <div>*/}
               {/*                 [{cell.coord.y};{cell.coord.x}]={cell.object.value.toString()};*/}
               {/*             </div>*/}
               {/*         )*/}
               {/*     })}*/}
               {/* </Block>*/}

               {/* <Block>*/}
               {/*     **MEASURES***/}
               {/*     {tcdView.measuresCell.map((cell:Cell<IMeasureValue<any>>)=>{*/}
               {/*         return (*/}
               {/*             <div>*/}
               {/*                 [{cell.coord.y};{cell.coord.x}]={cell.object.value.toString()};*/}
               {/*             </div>*/}
               {/*         )*/}
               {/*     })}*/}
               {/* </Block>*/}

                <Block>
                    <TcdBlock origin={{x:0,y:0}} mode={TcdMode.top} header={tcd.rowAxis as string[]} body={tcdView.rowsCell} />
                </Block>
                <Block>
                    <TcdBlock origin={{x:0,y:0}} mode={TcdMode.left} header={tcd.colAxis as string[]} body={tcdView.colsCell} />
                </Block>
                <Block>
                    <TcdBlock
                        origin={{x:0,y:0}}
                        mode={TcdMode.top}
                        header={tcdView.measuresCell.map((c:Cell<IMeasure>)=>`${c.object.funcGroup.name}(${c.object.column.name})`)}
                        body={tcdView.measuresValueCell}
                    />
                </Block>

            </div>
        </pre>
    )
}

const Block=({children}: any) => {
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
type FieldViewProps<T> = {
    field: IField<T>
    level: number
}
const FieldView = <T,>(props: FieldViewProps<T>) => {
    return (
        <div
            style={{
                paddingLeft: props.level * 25
            }}
        >
            {props.field.value.toString()}(nb={props.field.dataRows.length})[{props.field.dataRows.map((r:any)=>r.id).join(',')}]
            {props.field.fields.map((f: IField<T>) => {
                return (
                    <FieldView key={helper.genKey()} field={f} level={props.level + 1}/>
                )
            })}
        </div>
    )
}
type TerminalsProps<T> = {
    fields: IField<T>[]
    title:string
}
const Terminals = <T,>(props: TerminalsProps<T>) => {
    return (
        <div>
            <div>{props.title}</div>
            <div>
                {props.fields.map((field: IField<any>) => {
                    return (
                        <div>{field.value.toString()}({field.column.name}):{field.dataRows.map((r:any)=>r.id).join(',')}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const style = {
    border: "1px solid gray"
}
type TcdTableProps<T> = {
    tcdManager: ITcdManager<T>
}
function displayValue (v: any): string {
    if (v === null || v === undefined) return ""
    if (v instanceof Date) return v.toDateString()
    return v.toString()
}
const TcdTable = <T,>(props: TcdTableProps<T>) => {
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

type MeasuresValueProps<T> = {
    measuresValue: IMeasureValue<T>[]
}
const MeasuresValue = <T,>(props: MeasuresValueProps<T>) => {
    return (
        <div>
            <div>measureValuesCount={props.measuresValue.reduce((prev: number, mv:IMeasureValue<T>)=>prev+mv.dataRows.length,0)}</div>
            <div>
                {props.measuresValue.map((mv: IMeasureValue<T>) => {
                    return (
                        <div>
                            {mv.value.toString()} - [{mv.dataRows.map((r:any)=>r.id).join(',')}] - ({mv.rowField.value.toString()}:{mv.colField.value.toString()})
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


/*

                <Block>
                    <Terminals fields={tcdManager.rowsTerminalField} title="ROW TERMINALS:"/>
                </Block>

                <Block>
                    <Terminals fields={tcdManager.colsTerminalField} title="COL TERMINALS:"/>
                </Block>

                <Block>
                    <MeasuresValue measuresValue={tcdManager.measuresValue} />
                </Block>

 */