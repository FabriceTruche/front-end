import {ViewportTableInfoCell} from "./Table";
import {SortType, TableDataView} from "./TableManager";
import {Img} from "../../ui/Icon/Image";

export type TableHeaderProps = {
    tableDataCells: TableDataView|null
    sortedColIndex: [number, SortType]
    onClick:(colIndex:number)=>void
}

export  const TableHeader = (props: TableHeaderProps) => {
    if (props.tableDataCells === null)
        return null

    const widths = Object.values(props.tableDataCells.widths).join(" ")

    return (
        <div
            style={{
                // height: viewportInfo.viewportContentHeight + "px",
                display: "grid",
                // gridAutoRows: viewportInfo.viewportRowHeight + "px",
                gridTemplateColumns: widths,
                gridGap: 0,
            }}
        >
            {props.tableDataCells.header.map((c:ViewportTableInfoCell)=>{
                const colAscSorted = () => props.sortedColIndex[0]===(c.x-1) && (props.sortedColIndex[1]===SortType.asc)
                const colDescSorted = () => props.sortedColIndex[0]===(c.x-1) && (props.sortedColIndex[1]===SortType.desc)
                return (
                        <div
                            key={c.id}
                            className="array-header"
                            style={{
                                gridRow: `1 / span 1`,
                                gridColumn: `${c.x} / span 1`,
                            }}
                            onClick={()=>{
                                props.onClick(c.x-1)
                            }}
                        >
                            <span className="array-header-label"
                            >
                                {c.value}
                            </span>
                            {colAscSorted() && (<Img>keyboard_arrow_down</Img>)}
                            {colDescSorted() && (<Img>keyboard_arrow_up</Img>)}
                        </div>
                )
            })}
        </div>
    )
}