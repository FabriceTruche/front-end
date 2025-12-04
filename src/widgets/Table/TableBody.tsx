import {GridCellData, TableData, ViewportTableInfoCell} from "./Table";
import {CSSProperties, ReactElement} from "react";
import {Column} from "../../common/common";
import {DataFormatter} from "./Formatter";
import {DisplayedCellData} from "./IFormatter";
import {uiHelper} from "../../helper/UIHelper";

export type TableItemProps = {
    item: ViewportTableInfoCell
    index: number
    style: any
    // viewportInfo: IViewportManager
    dataRows: TableData
    allowEdit?:boolean
    onMouseOver?:((cell:ViewportTableInfoCell)=>void)
    onClickHeader?:((indexColumn:number,cell:ViewportTableInfoCell)=>void)
    onClick?:((cell:GridCellData/*, info: IViewportManager*/)=>void)
}

export const TableBody= (props: TableItemProps)=> {

    const assignHover=(itemData:ViewportTableInfoCell, clsName:string, id:string|undefined, setHover:boolean)=>{
        if (id!==undefined) {
            const elt = document.getElementById(id)

            if (elt !== null) {
                if (setHover)
                    elt.classList.add(clsName)
                else
                    elt.classList.remove(clsName)
            }
        }
    }

    const item: ViewportTableInfoCell = props.item

    const cell: GridCellData = {
        rowIndex: item.y - 1,
        columnIndex: item.x - 1,
        cellValue: item.value,
        row: props.dataRows.data[item.y - 1],
        // columns: props.dataRows.columns
    }

    const style = uiHelper.mergeCSSProperties(item.style, props.style)

    return (
        <div
            id={item.id}
            className={item.className}
            style={style}
            onMouseEnter={()=> {
                assignHover(item,"array-row-hover",item.rowId,true)
                assignHover(item,"array-col-hover",item.colId,true)
                // assignHover(item,"array-header-hover",item.headerId,true)
            }}
            onMouseLeave={()=>{
                assignHover(item,"array-row-hover",item.rowId,false)
                assignHover(item,"array-col-hover",item.colId,false)
                // assignHover(item,"array-header-hover",item.headerId,false)
            }}
            onMouseOver={()=> {
                if (props.onMouseOver)
                    props.onMouseOver(item)
            }}
            onClick={()=>{
                if (props.onClick)
                    props.onClick(cell)
            }}
        >
            {item.value}
        </div>
    )
}






// if (item.typeCell==="header") {
//     props.onClickHeader && props.onClickHeader(item.x-1,item)
// } else {
//     if (props.onClick)
//         props.onClick(cell)
//
// if (!!props.allowEdit)
//     setEditRow(true)
//
// setCellData(cell)
// }


// case "header":
//     // console.log(1,item.data.x-1,props.dbCollection)
//     const sortIndex=props.dataRows.columns[item.x-1].sort
//     // console.log(2,item.data.x-1,props.dbCollection)
//     const sorted:boolean=(sortIndex!==0)
//     return (
//         <span className={"array-header-option"}>
//             <span>{item.value}</span>
//             {sortIndex===1 && (<span className="array-header-option-sorted">&#129105;</span>)}
//             {sortIndex===2 && (<span className="array-header-option-sorted">&#129107;</span>)}
//         </span>
//     )
// const displayCell=(item:ViewportCellArray): any|null => {
//     if (item.typeCell==="data")
//         return item.value
//
//     return null
// }
//
