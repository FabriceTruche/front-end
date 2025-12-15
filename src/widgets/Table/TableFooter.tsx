import {ViewportTableInfoCell} from "./Table";
import {CSSProperties} from "react";
import {TableDataView} from "./TableManager";
import {helper} from "../../common/Helper";

export type TableFooterProps = {
    tableDataCells: TableDataView|null
}

export  const TableFooter = (props: TableFooterProps) => {
    if (props.tableDataCells === null)
        return null

    const widths = Object.values(props.tableDataCells.widths).join(" ")

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: widths,
                gridGap: 0,
            }}
        >
            {props.tableDataCells.footer.map((item: ViewportTableInfoCell) => {
                const itemStyle: CSSProperties = {
                    gridRow: `1 / span 1`,
                    gridColumn: `${item.x} / span 1`,
                }
                const style = helper.mergeCSSProperties(item.style, itemStyle)
                return (
                    <div
                        key={item.id}
                        className="array-footer"
                        style={style}
                    >
                        {item.value}
                    </div>
                )
            })}
        </div>
    )
}