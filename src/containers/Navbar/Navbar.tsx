import {ReactElement, useEffect, useState} from "react";
import * as React from "react";
import "./navbar.css"
import {dataHelper} from "../../helper/DataHelper";
import {Buttons} from "../../ui/Button/Buttons";
import {Button} from "../../ui/Button/Button";

type NavbarButton = {
    id: string
    label: string
    children: any
    onClick: ()=>void
}
export type NavbarProps = {
    children: ReactElement[]
}
export const Navbar = (props:NavbarProps) => {
    const [currChildren, setCurrChildren] = useState<number>(-1)
    const [buttons, setButtons] = useState<NavbarButton[]>([])
    const [key,setKey]=useState("key")

    useEffect(()=>{
        const buttons:NavbarButton[]=[]
        React.Children.forEach(props.children, (child:ReactElement<any>, index:number)=>{
            if (React.isValidElement(child)) {
                buttons.push({
                    id:dataHelper.genKey(),
                    label:child.type.toString(),
                    onClick:()=>setCurrChildren(index),
                    children: child
                })
            }
        })
        setButtons(buttons)
    },[])

    return (
        <div>
            <Buttons>
                {buttons.map((bi:NavbarButton)=>(
                    <Button key={bi.id} {...bi}>{bi.label}</Button>
                ))}
            </Buttons>
            {(currChildren!==-1) && (
                <div
                    key={key}
                >
                    <div
                        style={{
                            fontSize:"30px",
                            textAlign:"center",
                            background:"lightgray",
                            margin:"20px 0",
                            cursor:"pointer",
                        }}
                        onClick={()=>{
                            setKey(dataHelper.genKey())
                        }}
                    >
                        {buttons[currChildren].label}
                    </div>
                    <div>
                        {buttons[currChildren].children}
                    </div>
                </div>
            )}
        </div>
    )
}

