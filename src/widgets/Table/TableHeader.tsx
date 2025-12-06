import {ViewportTableInfoCell} from "./Table";
import {TableDataCellInfo} from "./ITableManager";

export type TableHeaderProps = {
    tableDataCells: TableDataCellInfo|null
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
                        {c.value}
                    </div>
                )
            })}
        </div>
    )
}