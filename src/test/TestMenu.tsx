import {Menu, MenuItem} from "../../widgets/Menu/Menu";
import React from "react";

export const myMenu: MenuItem[] = [
    { image: "ecg", label: "label1" },
    { image: "quiz", label: "label2"},
    { image: "menu", label: "label3", content: [
            { image: "home", label: "label31"},
            { image: "login", label: "label32"},
        ] },
    { image: "bolt", label: "label4"},
]

const testMenu=()=><Menu items={myMenu}/>

export default testMenu;
