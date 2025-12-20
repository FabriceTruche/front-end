import {ITcdViewManager} from "../model/TcdViewManager";
import {CSSProperties, Fragment} from "react";
import "./tcdView.css"
import {ICell, Rect, TypeCell} from "../model/Cell";


function getTheme(): Map<TypeCell,string> {
    const theme = new Map<TypeCell,string>()

    theme.set(TypeCell.headerRow, "tcd-header-row")
    theme.set(TypeCell.headerCol, "tcd-header-col")
    theme.set(TypeCell.headerMeasure, "tcd-header-measure")
    theme.set(TypeCell.row, "tcd-row")
    theme.set(TypeCell.col, "tcd-col")
    theme.set(TypeCell.labelTotalRow, "tcd-label-row-total")
    theme.set(TypeCell.labelTotalCol, "tcd-label-col-total")
    theme.set(TypeCell.measure, "tcd-measure")
    theme.set(TypeCell.totalRowMeasure, "tcd-total-row-measure")
    theme.set(TypeCell.totalColMeasure, "tcd-total-col-measure")
    theme.set(TypeCell.totalMeasure, "tcd-total-measure")
    theme.set(TypeCell.grandTotal, "tcd-gt")
    theme.set(TypeCell.grandTotalMeasure, "tcd-gt-measure")
    theme.set(TypeCell.labelGrandTotalRow, "tcd-gt-label-row")
    theme.set(TypeCell.labelGrandTotalCol, "tcd-gt-label-col")
    return theme
}

type TcdPartViewProps/*<T extends { displayValue: ()=>string }>*/ = {
    cells: ICell[] // Cell<T>[]
    startPos: Rect
    theme: Map<TypeCell,string>
}
const TcdPartView=(props: TcdPartViewProps) => {
    const getStyle=(c:Rect): CSSProperties => {
        // return {
        //     gridRow: `${c.y + 1 + props.startPos.y} / span ${c.height}`,
        //     gridColumn: `${c.x + 1 + props.startPos.x} / span ${c.width}`,
        // }
        return {
            gridRow: `${c.y + 1 + props.startPos.y} `,
            gridColumn: `${c.x + 1 + props.startPos.x} `,
        }
    }

    return (
        <Fragment>
            {props.cells.map((c: ICell, index: number) => {
                return (
                    <div
                        key={index}
                        className={props.theme.get(c.typeCell)}
                        style={getStyle(c.rect)}
                    >
                        {c.value}
                    </div>
                )
            })}
        </Fragment>
    )
}
export type TcdViewProps<TRow> = {
    tcdViewManager: ITcdViewManager<TRow>
}
export const TcdView=<T  extends { displayValue: ()=>string }>(props: TcdViewProps<T>) => {

    const startHeaderRow: Rect = props.tcdViewManager.coordHeaderRows;
    const startHeaderCol: Rect = props.tcdViewManager.coordHeaderCols;
    const startHeaderMeasure: Rect = props.tcdViewManager.coordHeaderMeasures;

    const startRow: Rect = props.tcdViewManager.coordRows;
    const startCol: Rect = props.tcdViewManager.coordCols;
    const startMeasure: Rect = props.tcdViewManager.coordMeasures;

    const theme: Map<TypeCell,string> = getTheme()

    return (
        <pre className="tcd-container">
            <TcdPartView theme={theme} cells={props.tcdViewManager.headerRowsCell} startPos={startHeaderRow} />
            <TcdPartView theme={theme} cells={props.tcdViewManager.headerColsCell} startPos={startHeaderCol} />
            <TcdPartView theme={theme} cells={props.tcdViewManager.measuresCell} startPos={startHeaderMeasure} />

            <TcdPartView theme={theme} cells={props.tcdViewManager.rowsCell} startPos={startRow} />
            <TcdPartView theme={theme} cells={props.tcdViewManager.totalRowsCell} startPos={startRow} />

            <TcdPartView theme={theme} cells={props.tcdViewManager.colsCell} startPos={startCol} />
            <TcdPartView theme={theme} cells={props.tcdViewManager.totalColsCell} startPos={startCol} />

            <TcdPartView theme={theme} cells={props.tcdViewManager.measuresValueCell} startPos={startMeasure} />
            {/*<TcdPartView theme={theme}="tcd-measure-total" cells={props.tcdViewManager.totalMeasuresValueCell} startPos={startMeasure} />*/}
        </pre>
    )
}




// <TcdHeaderRowView cells={props.tcdViewManager.headerRowsCell} startPos={startHeaderRow} />
// <TcdHeaderColView cells={props.tcdViewManager.headerColsCell} startPos={startHeaderCol} />
// <TcdHeaderMeasureView cells={props.tcdViewManager.measuresCell} startPos={startHeaderMeasure} />
//
// <TcdRowView cells={props.tcdViewManager.rowsCell} startPos={startRow} />
// <TcdColView cells={props.tcdViewManager.colsCell} startPos={startCol} />
// <TcdMeasureView cells={props.tcdViewManager.measuresValueCell} startPos={startMeasure} />
