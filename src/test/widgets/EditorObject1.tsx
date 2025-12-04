import {Editor} from "../../widgets/Editor/Editor";
import {List} from "../../ui/List/List";
import React from "react";
import {dataHelper} from "../../helper/DataHelper";
import {TextInput} from "../../ui/Text/TextInput";
import {Radio} from "../../ui/Radio/Radio";

enum TypeBien {
    Studio,
    PetitT1,
    GrandT1,
    PetitT2,
    GrandT2,
    Garage,
    Local,
}

const obj = {
    p1: "Fabrice",
    p2: "Audouard",
    choix: "css",
    p3: 123456,
    p4: new Date(2000,7,5),
    typeBien: TypeBien.Local,
    validate: false,
}

const items: any[] = dataHelper.genWordsArray(10,30).map((v: string, index: number) => ({value: index+1, label: v}))
const choices = [
        {id:"1", label:"html", value:"html" },
        {id:"2", label:"css", value:"css" },
        {id:"3", label:"js", value:"js" },
        {id:"4", label:"ts", value:"ts" },
    ]

const editInfo = {
    props: {
        p2: {items: items, multiple: true},
        p3: {label: "Ceci est un nombre"},
        p4: {label: "Une Date"},
        choix: {choices},
        typeBien: {enum:TypeBien, label: "Type de bien"}
    },
    editors: {
        p2: List,
        choix: Radio,
    }
}

export const EditorObject1 = () => {
    return (
        <div>
            <pre>
                {JSON.stringify(obj,null,3)}
            </pre>
            <Editor
                object={obj}
                props={editInfo.props}
                editors={editInfo.editors}
            />
        </div>
    )
}