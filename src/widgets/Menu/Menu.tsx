import React, {useState} from "react";
import {Buttons} from "../../ui/Button/Buttons";
import {Button} from "../../ui/Button/Button";
import {Page} from "../../containers/Page/Page";
import {helper} from "../../common/Helper";


export type MenuItem = {
    image?: string
    label?: string
    content?: MenuItem[]|any
}

export type MenuProps = {
    items: MenuItem[]
}
export const Menu=(props: MenuProps) => {
    const [currChildren, setCurrChildren] = useState<number>(-1)
    const [key, setKey] = useState("key")

    const nameOf = (m: MenuItem) => {
        if (m.label !== undefined)
            return m.label

        if (m.content.name !== undefined)
            return m.content.name

        if (m.content.type !== undefined)
            return m.content.type.name

        return "??"
    }
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }}
        >
            <Buttons>
                {props.items.map((m:MenuItem, index: number) => {
                    const isSubMenu: boolean = Array.isArray(m.content)
                    const image = (isSubMenu && m.image===undefined) ? "menu" : m.image

                    return (
                        <Button
                            onClick={() => setCurrChildren(index)}
                            key={index}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                            >

                                {(image!==undefined) && (
                                    <span
                                        style={{paddingRight:6, fontSize: 24, fontWeight: "normal"}}
                                        className="material-symbols-outlined"
                                    >
                                        {image}
                                    </span>
                                )}
                                {nameOf(m)}
                                {isSubMenu && (
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
                    <div
                        style={{
                            fontSize: "30px",
                            textAlign: "center",
                            background: "lightgray",
                            margin: "20px 0",
                            cursor: "pointer",
                            display: "none"
                        }}
                        onClick={() => {
                            setKey(helper.genKey())
                        }}
                    >
                        {props.items.map((m: MenuItem, index: number) => {
                                if (index === currChildren)
                                    return m.label
                            })
                        }
                    </div>

                    <div>
                        {props.items.map((m: MenuItem, index: number) => {
                            if (index === currChildren) {
                                if (Array.isArray(m.content)) {
                                    // sous menu
                                    const properties: MenuItem[] = m.content as MenuItem[]
                                    // console.log(">>",properties)
                                    return <Menu items={properties} key={index}></Menu>
                                } else {
                                    // composant final
                                    const Component = m.content

                                    return (
                                        <Page key={index}>
                                            {Component===undefined && (
                                                <div>To be done : {m.label}</div>
                                            )}
                                            {m.content!==undefined && (
                                                <Component />
                                            )}
                                        </Page>
                                    )
                                }
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}


