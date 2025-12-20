import {Coord, ITcdViewManager} from "../model/TcdViewManager";
import {Cell} from "./TcdBlock";
import {CSSProperties, Fragment} from "react";
import "./tcdView.css"

type TcdPartViewProps<T extends { displayValue: ()=>string }> = {
    cells: Cell<T>[]
    startPos: Coord
    className: string
}
const TcdPartView=<T extends { displayValue: ()=>string },>(props: TcdPartViewProps<T>) => {
    const getStyle=(c:Coord): CSSProperties => {
        const xSpan = c.xSpan ?? 1
        const ySpan = c.ySpan ?? 1
        /*return {
            gridRow: `${c.y + 1 + props.startPos.y} }`,
            gridColumn: `${c.x + 1 + props.startPos.x}`,
        }*/
        return {
            gridRow: `${c.y + 1 + props.startPos.y} / span ${ySpan-0}`,
            gridColumn: `${c.x + 1 + props.startPos.x} / span ${xSpan-0}`,
        }
    }

    return (
        <Fragment>
            {props.cells.map((c: Cell<T>, index: number) => {
                return (
                    <div
                        key={index}
                        className={props.className}
                        style={getStyle(c.coord)}
                    >
                        {c.object.displayValue()}
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

    const startHeaderRow: Coord = props.tcdViewManager.posHeaderRows;
    const startHeaderCol: Coord = props.tcdViewManager.posHeaderCols;
    const startHeaderMeasure: Coord = props.tcdViewManager.posHeaderMeasures;

    const startRow: Coord = props.tcdViewManager.posRows;
    const startCol: Coord = props.tcdViewManager.posCols;
    const startMeasure: Coord = props.tcdViewManager.posMeasures;

    return (
        <pre className="tcd-container">
            <TcdPartView className="tcd-header-row" cells={props.tcdViewManager.headerRowsCell} startPos={startHeaderRow} />
            <TcdPartView className="tcd-header-col" cells={props.tcdViewManager.headerColsCell} startPos={startHeaderCol} />
            <TcdPartView className="tcd-header-measure" cells={props.tcdViewManager.measuresCell} startPos={startHeaderMeasure} />

            <TcdPartView className="tcd-row" cells={props.tcdViewManager.rowsCell} startPos={startRow} />
            <TcdPartView className="tcd-row-total" cells={props.tcdViewManager.totalRowsCell} startPos={startRow} />

            <TcdPartView className="tcd-col" cells={props.tcdViewManager.colsCell} startPos={startCol} />
            <TcdPartView className="tcd-col-total" cells={props.tcdViewManager.totalColsCell} startPos={startCol} />

            <TcdPartView className="tcd-measure" cells={props.tcdViewManager.measuresValueCell} startPos={startMeasure} />
            <TcdPartView className="tcd-measure-total" cells={props.tcdViewManager.totalMeasuresValueCell} startPos={startMeasure} />
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
