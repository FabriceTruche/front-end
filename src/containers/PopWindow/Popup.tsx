import "./PopWindow.css"
import React from "react";

export type PopupProps = {
    title: string
    visible: boolean
    onOk?: ()=>void
    onCancel?: ()=>void
    children: any
}
export const Popup = (props: PopupProps) => {
    return (
        <div
            // onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            //     event.stopPropagation()
            //     props.onCancel && props.onCancel()
            // }}
            onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>)=>{
                // console.log(event.key)
                if (event.key==="Escape")
                    props.onCancel && props.onCancel()
            }}
        >
            {props.visible && (
                <div id="modal" className="open">
                    <div className="mask"
                         onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                             // event.stopPropagation()
                             props.onCancel && props.onCancel()
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
                                {props.children}
                            </div>
                        </div>
                        <div className="separator" />
                        <div className="buttons" >
                            {props.onOk && <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.onOk && props.onOk()}>Ok</button>}
                            {props.onCancel && <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.onCancel && props.onCancel()}>Cancel</button>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
