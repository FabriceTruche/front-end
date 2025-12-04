import "./Popup.css"
import React, {ReactElement, useEffect, useState} from "react";

const defaultButton = (show: () => void) => (
    <button onClick={() => show()}>Open</button>
)

export type PopWindowProps = {
    title: string
    activator?: (f:()=>void)=>ReactElement
    content?: (f:()=>void)=>ReactElement
    visible?: boolean
    onOk?: ()=>void
    onCancel?: ()=>void
}
export const Popup_V0 = (props: PopWindowProps) => {
    const [visible,setVisible] = useState((props.visible!==undefined) && props.visible)
    const act = props.activator || defaultButton

    const showPopWindow=():void=>{
        setVisible(true)
    }
    const hidePopWindow=():void=>{
        setVisible(false)
    }
    const accept=(f?:()=>void):void=>{
        if (f) f()
        setVisible(false)
    }

    return (
        <div
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                event.stopPropagation()
                // accept(event,props.onCancel)
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>)=>{
                // console.log(event.key)
                if (event.key==="Escape")
                    accept(props.onCancel)
            }}
        >
            {act(showPopWindow)}
            {visible && (
                <div id="modal" className="open">
                    <div className="mask"
                         onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                             // event.stopPropagation()
                             accept(props.onCancel)
                         }}
                    >
                    </div>
                    <div className="container">
                        <div className="content">
                            {/* <div className="icon material-symbols-outlined">
                                    close
                            </div> */}
                            <div className="title">
                                {props.title}
                            </div>
                            <div className="message">
                                {props.content && props.content(hidePopWindow)}
                            </div>
                        </div>
                        {(props.onOk!==undefined) || (props.onCancel!==undefined) && (
                            <div>
                                <div className="separator" />
                                <div className="buttons" >
                                    <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => accept(props.onOk)}>Ok</button>
                                    <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => accept(props.onCancel)}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

