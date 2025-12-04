import * as React from 'react'
import {ReactElement, useState} from "react"
import {SimpleList} from "../../ui/List/SimpleList";
import {Popup} from "../../containers/Popup/Popup";

// Component name : PopupList
// Creation date : 20/12/2024 - 11:32

/**
 * Props de PopupList
 */
export type PopupListProps = {
    title:string
    visible: boolean
    items: string[]
    // activator: (show:()=>void) => ReactElement
    onMouseHover?: (item:string) => void
    onMouseLeave?: () => void
    onMouseClick?: (item:string) => void
    onDoubleClick?: (item:string) => void
    onOk?: (item:string) => void
    onCancel?: () => void
}
/**
 * Component PopupList
 */
export const PopupList = (props: PopupListProps) => {
    const [selectedValue, setSelectedValue] = useState("")
    const [overValue, setOverValue] = useState("")

    return (
        <Popup
            title={props.title}
            visible={props.visible}
            onCancel={() => {
                setSelectedValue("<cancelled>")
                if (props.onCancel)
                    props.onCancel()
            }}
        >
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
                    }}
                />
        </Popup>
    )
}




