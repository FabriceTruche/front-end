import {TableData, ViewportTableInfoCell} from "./Table";
import {TableDataCellInfo} from "./TableManager";
import {uiHelper} from "../../helper/UIHelper";
import {CSSProperties} from "react";

export type TableFooterProps = {
    tableDataCells: TableDataCellInfo
}

export  const TableFooter = (props: TableFooterProps) => {
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
                const style = uiHelper.mergeCSSProperties(item.style, itemStyle)
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