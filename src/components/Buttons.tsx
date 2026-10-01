import * as React from "react";
import "./buttons.css"
import {Children, cloneElement, ReactElement, useState} from "react";
import {ButtonProps} from "./Button";

export type ButtonContainerProps = {
    children: ReactElement|ReactElement[]
}
export const Buttons = (props:ButtonContainerProps) => {
    const [activeButton,setActiveButton]=useState(-1)

    const getClassName=(idx:number)=>{
        return "xbg-button" + ((idx===activeButton) ? " xbg-button-selected" : "")
    }

    return (
        <div className="xbg-container">
            {Children.map(props.children, (child: ReactElement, index: number) => {
                if (!React.isValidElement(child))
                    return null;

                const element = child as ReactElement<ButtonProps>
                const newProps = {
                    key: index,
                    onClick: (e: any) => {
                        if (element.props.onClick !== undefined)
                            element.props.onClick(e)
                        setActiveButton(index)
                    },
                    className: getClassName(index)
                }
                return cloneElement(element, newProps)
            })
            }

        </div>)
}
