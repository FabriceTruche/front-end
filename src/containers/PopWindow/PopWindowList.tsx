import * as React from 'react'
import {ReactElement, useState} from "react"
import {PopWindow} from "./PopWindow";
import {SimpleList} from "../../ui/List/SimpleList";

// Component name : PopWindowList
// Creation date : 20/12/2024 - 11:32

/**
 * Props de PopWindowList
 */
export type PopWindowListProps = {
    title:string
    visible: boolean
    items: string[]
    activator: (show:()=>void) => ReactElement
    onMouseHover?: (item:string) => void
    onMouseLeave?: () => void
    onMouseClick?: (item:string) => void
    onDoubleClick?: (item:string) => void
    onOk?: (item:string) => void
    onCancel?: () => void
}
/**
 * Component PopWindowList
 */
export const PopWindowList = (props: PopWindowListProps) => {
    const [selectedValue, setSelectedValue] = useState("")
    const [overValue, setOverValue] = useState("")

    return (
        <PopWindow
            title={props.title}
            visible={props.visible}
            activator={(show: () => void) => (
                <div>
                    {props.activator(show)}
                </div>
            )}
            content={(hide: () => void) => (
                <SimpleList
                    items={props.items}
                    onMouseOver={(item: string) => {
                        setOverValue(item)
                        if (props.onMouseHover)
                            props.onMouseHover(item)
                    }}
                    onMouseLeave={(item: string) => {
                        setOverValue("")
                        if (props.onMouseLeave)
                            props.onMouseLeave()
                    }}
                    onClick={(item: string) => {
                        setSelectedValue(item)
                        if (props.onMouseClick)
                            props.onMouseClick(item)
                    }}
                    onDoubleClick={(item: string) => {
                        setSelectedValue(item)
                        if (props.onDoubleClick)
                            props.onDoubleClick(item)
                        if (props.onOk  )
                            props.onOk(item)
                        hide()
                    }}
                />
            )}
            onCancel={() => {
                setSelectedValue("<cancelled>")
                if (props.onCancel)
                    props.onCancel()
            }}
        />
    )
}




