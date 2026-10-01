import * as React from 'react'
import {useState} from "react"
import "./simple-list.css"

// Component name : MyList
// Creation date : 26/11/2024 - 11:23

/**
 * Props de MyList
 */
export type SimpleListProps = {
    items: string[]
    onClick?: (item:string, index:number)=>void
    onDoubleClick?: (item:string, index:number)=>void
    onMouseOver?: (item:string, index:number)=>void
    onMouseLeave?: (item:string, index:number)=>void
}
/**
 * Component MyList
 */
export const SimpleList = (props: SimpleListProps) => {
    const [value, setValue] = useState("Initial value")

    return (
        <div className="simple-list">
            {props.items.map((item:string,index:number)=>{
                return (
                    <div
                        key={index}
                        className="simple-list-item"
                        onDoubleClick={()=>props.onDoubleClick && props.onDoubleClick(item,index)}
                        onClick={()=>props.onClick && props.onClick(item,index)}
                        onMouseOver={()=>props.onMouseOver && props.onMouseOver(item,index)}
                        onMouseLeave={()=>props.onMouseLeave && props.onMouseLeave(item,index)}
                    >
                        {item}
                    </div>
                )
            })}
        </div>
    )
}
