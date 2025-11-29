import {ReactElement, useEffect, useState} from "react";
import {TableDataInfo, createArrayInfo, ITableManager} from "./TableManager";
import {AnyObject, Column} from "../../common/common";
import {IViewportManager, ViewportData, ViewportInfoCellBase} from "../../containers/Viewport/ViewportDefinitions";
import {TextInput} from "../../ui/Text/TextInput"
import {Viewport} from "../../containers/Viewport/Viewport";
import "./table.css"
import {EditRow} from "./EditRow";

export type TableData = {
    data: AnyObject[]
    columns: Column[]
}
export const defaultTableData: TableData = {
    columns:[],
    data:[]
}
export type CellData = {
    rowIndex: number
    columnIndex: number
    row: any
    cellValue: any
}
export type ViewportCellArray = ViewportInfoCellBase & {
    typeCell: "data"|"header"|"row"|"col"|"find"|"checkWidth"
    rowId?: string
    colId?: string
    headerId?: string
}
export type TableProps = {
    dbCollection: TableData
    findOption?:boolean
    viewportHeight?: number
    viewportRowHeight?: number
    onMouseOver?:((cell:ViewportCellArray)=>void)
    onClickHeader?:((indexColumn:number,cell:ViewportData<ViewportCellArray>)=>void)
    onFind?:((text:string)=>void)
    onClick?:((cell:CellData, info: IViewportManager)=>void)
}
export const Table = (props: TableProps) => {
    const [arrayInfo, setArrayInfo] = useState<TableDataInfo>()
    const [editRow, setEditRow] = useState<boolean>(false)
    const [cellData, setCellData] = useState<CellData>()

    // const [key, setKey] = useState<string>(helper.genKey())

    const headerRef = <div id="header-ref-style" className="array-header" style={{visibility: "hidden", width:0, height:0}}> HEADER REF STYLE</div>

    useEffect(() => {
        const ai:ITableManager=createArrayInfo()
        const arrayInfo:TableDataInfo=ai.getArrayInfo(props.dbCollection,"header-ref-style")

        setArrayInfo(arrayInfo)
        // setKey(helper.genKey())

    }, [props.dbCollection])


    // const ai:ITableManager=createArrayInfo()
    // const arrayInfo:TableDataInfo=ai.getArrayInfo(props.dbCollection,"header-ref-style")
    // setArrayInfo(arrayInfo)
    // setKey(helper.genKey())

    const displayCell=(item:ViewportData<ViewportCellArray>): string|ReactElement|null => {
        switch (item.data.typeCell) {
            case "data":
            case "checkWidth":
            case "find":
                return item.data.value
            case "row":
            case "col":
                return null
            case "header":
                // console.log(1,item.data.x-1,props.dbCollection)
                const sortIndex=props.dbCollection.columns[item.data.x-1].sort
                // console.log(2,item.data.x-1,props.dbCollection)
                const sorted:boolean=(sortIndex!==0)
                return (
                    <span className={"array-header-option"}>
                        <span>{item.data.value}</span>
                        {sortIndex===1 && (<span className="array-header-option-sorted">&#129105;</span>)}
                        {sortIndex===2 && (<span className="array-header-option-sorted">&#129107;</span>)}
                    </span>
                )
        }
        return null
    }

    const assignHover=(itemData:ViewportCellArray,clsName:string,id:string|undefined,setHover:boolean)=>{
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

    if (arrayInfo===undefined)
        return headerRef

    return (
        <div className="array-container">
            {headerRef}
            {(!!props.findOption) && (
                <TextInput
                    name="array-find-input"
                    label="Find"
                    nullIfEmpty={false}
                    onChange={(text:string)=>{
                        if (props.onFind) props.onFind(text)
                    }}
                    onReset={()=>{
                        if (props.onFind) props.onFind("")
                    }}
                />
            )}
            <EditRow
                show={editRow}
                row={cellData && cellData.row}
                onCancel={()=>setEditRow(false)}
                onOk={()=>setEditRow(false)}
            />
            <Viewport<ViewportCellArray>
                // key={key}
                viewportHeight={props.viewportHeight ?? 1000}
                viewportRowHeight={props.viewportRowHeight ?? 22}
                rowCount={props.dbCollection.data.length}
                viewportGap={0}
                rowHeaderCount={1}
                collection={arrayInfo.collection}
                columnsWidth={arrayInfo.widths}
                onViewportCell={(item: ViewportData<ViewportCellArray>, index:number, style:any, viewportInfo: IViewportManager) => {
                    return (
                        <div
                            id={item.key}
                            className={item.data.className}
                            style={style}
                            onMouseEnter={()=> {
                                assignHover(item.data,"array-row-hover",item.data.rowId,true)
                                assignHover(item.data,"array-col-hover",item.data.colId,true)
                                assignHover(item.data,"array-header-hover",item.data.headerId,true)
                            }}
                            onMouseLeave={()=>{
                                assignHover(item.data,"array-row-hover",item.data.rowId,false)
                                assignHover(item.data,"array-col-hover",item.data.colId,false)
                                assignHover(item.data,"array-header-hover",item.data.headerId,false)
                            }}
                            onMouseOver={()=>props.onMouseOver && props.onMouseOver(item.data)}
                            onClick={()=>{
                                if (item.data.typeCell==="header") {
                                    props.onClickHeader && props.onClickHeader(item.data.x-1,item)
                                } else {
                                    const cell: CellData = {
                                        rowIndex: item.data.y - 2,
                                        columnIndex: item.data.x - 1,
                                        cellValue: item.data.value,
                                        row: props.dbCollection.data[item.data.y - 2],
                                    }
                                    props.onClick && props.onClick(cell, viewportInfo)
                                    setEditRow(true)
                                    setCellData(cell)
                                }
                            }}
                        >
                            {displayCell(item)}
                        </div>
                    )
                }}
            />
        </div>
    )
}
