import {ViewportTableInfoCell} from "./Table";
import {helper} from "../../common/Helper";


export type TableBodyProps = {
    item: ViewportTableInfoCell
    index: number
    style: any
    // viewportInfo: IViewportManager
    // dataRows: TableData<T>
    allowEdit?:boolean
    onMouseOver?:((cell:ViewportTableInfoCell)=>void)
    onClickHeader?:((indexColumn:number,cell:ViewportTableInfoCell)=>void)
    onRowClick?:((cell:ViewportTableInfoCell/*, info: IViewportManager*/)=>void)
}

export const TableBody = (props: TableBodyProps)=> {

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

    // const cell: CellDataSelection = {
    //     rowIndex: item.y - 1,
    //     colIndex: item.x - 1,
    //     value: item.value,
    //     row: props.dataRows.data[item.y - 1],
    //     // columns: props.dataRows.columns
    // }

    const style = helper.mergeCSSProperties(item.style, props.style)

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
                if (props.onRowClick)
                    props.onRowClick(item)
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
