import {ReactElement, useEffect, useState} from "react";
import * as React from "react";
import "./navbar.css"
import {dataHelper} from "../../helper/DataHelper";
import {Buttons} from "../../ui/Button/Buttons";
import {Button} from "../../ui/Button/Button";

export type NavbarProps = {
    image?: string
    label?: string
    showTitle?: boolean
    children: ReactElement[]|ReactElement
}
export const Navbar = (props:NavbarProps) => {
    const [currChildren, setCurrChildren] = useState<number>(-1)
    const [key, setKey] = useState("key")

    const nameOf = (child: any) => {
        if (child.props.label !== undefined)
            return child.props.label

        if (child.props.title !== undefined)
            return child.props.title

        if (child.type !== undefined && child.type.name !== undefined)
            return child.type.name

        return "??"
    }
    const isNav = (child: any) => {
        return childName(child) === "Navbar"
    }
    const childName = (child: any) => {
        return (child.type!==undefined && child.type.name!==undefined)  ? child.type.name : "?"
    }

    return (
        <div>

            <Buttons>
                {React.Children.map(props.children, (child: ReactElement<any>, index: number) => {
                    return (
                        <Button
                            onClick={() => setCurrChildren(index)}
                            key={index}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>

                                {(child.props.image!==undefined) && (
                                    <span
                                        style={{paddingRight:6, fontSize: 24, fontWeight: "normal"}}
                                        className="material-symbols-outlined"
                                    >
                                        {child.props.image}
                                    </span>
                                )}
                                {nameOf(child)}
                                {isNav(child) && (
                                    <span
                                        style={{paddingLeft:10, fontSize: 12, fontWeight: "bold"}}
                                        className="material-symbols-outlined"
                                    >
                                        arrow_forward_ios
                                    </span>
                                )}

                            </div>

                        </Button>
                    )
                })
                }
            </Buttons>

            {(currChildren !== -1) && (
                <div
                    key={key}
                >
                    {((props.showTitle===undefined) || (props.showTitle)) && (
                        <div
                            style={{
                                fontSize: "30px",
                                textAlign: "center",
                                background: "lightgray",
                                margin: "20px 0",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setKey(dataHelper.genKey())
                            }}
                        >
                            {React.Children.map(props.children, (child: ReactElement<any>, index: number) => {
                                if (index === currChildren)
                                    return nameOf(child)
                            })
                            }
                        </div>
                    )}

                    <div>
                        {React.Children.map(props.children, (child: ReactElement<any>, index: number) => {
                            if (index === currChildren)
                                return React.cloneElement(child)
                        })
                        }
                    </div>
                </div>
            )}
        </div>
    )
}




/*import {ReactElement, useEffect, useState} from "react";
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
    label?: string
    children: ReactElement[]
}
export const Navbar = (props:NavbarProps) => {
    const [currChildren, setCurrChildren] = useState<number>(-1)
    const [buttons, setButtons] = useState<NavbarButton[]>([])
    const [key,setKey]=useState("key")

    const nameOf = (child:any)=> {
        if (child.label!==undefined)
            return child.label

        if (child.type !== undefined && child.type.name !== undefined)
            return child.type.name

        return child.type
    }

    useEffect(()=>{
        const buttons:NavbarButton[]=[]
        React.Children.forEach(props.children, (child:ReactElement<any>, index:number)=>{
            if (React.isValidElement(child)) {
                buttons.push({
                    id:dataHelper.genKey(),
                    label:nameOf(child),
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
    // useEffect(()=>{
    //     const buttons:NavbarButton[]=[]
    //     React.Children.forEach(props.children, (child:ReactElement<any>, index:number)=>{
    //         if (React.isValidElement(child)) {
    //             buttons.push({
    //                 id:dataHelper.genKey(),
    //                 label:nameOf(child),
    //                 onClick:()=>setCurrChildren(index),
    //                 children: child
    //             })
    //         }
    //     })
    //     // setCurrChildren(buttons)
    // },[])

// type NavbarButton = {
//     id: string
//     label: string
//     children: any
//     onClick: ()=>void
// }

*/