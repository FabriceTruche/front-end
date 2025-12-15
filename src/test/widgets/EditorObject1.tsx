import {AnyObject, Editor} from "../../widgets/Editor/Editor";
import {List} from "../../ui/List/List";
import React from "react";
import {Radio} from "../../ui/Radio/Radio";
import {factory} from "../../common/Factory";
import {IColumn} from "../../widgets/Table/Column";
import {helper} from "../../common/Helper";

enum TypeBien {
    Studio,
    PetitT1,
    GrandT1,
    PetitT2,
    GrandT2,
    Garage,
    Local,
}

type MyType = {
    p1: string
    p2: string
    choix: string
    p3: number
    p4?: Date
    typeBien: TypeBien
    validate: boolean
}
const obj: MyType = {
    p1: "Fabrice",
    p2: "Audouard",
    choix: "css",
    p3: 123456,
    p4: new Date(),
    typeBien: TypeBien.Local,
    validate: false,
}

const items: any[] = helper.genWordsArray(10,30).map((v: string, index: number) => ({value: index+1, label: v}))
const choices = [
        {id:"1", label:"html", value:"html" },
        {id:"2", label:"css", value:"css" },
        {id:"3", label:"js", value:"js" },
        {id:"4", label:"ts", value:"ts" },
    ]
const columns: IColumn[] = [
    factory.createColumn("p1","string","Label P1"),
    factory.createColumn("p2","string","Liste de choix",undefined,factory.createFieldEditor(List,{items: items, multiple: true})),
    factory.createColumn("choix","string","Choices ?", undefined, factory.createFieldEditor(Radio, {choices})),
    factory.createColumn("p3","number"),
    factory.createColumn("p4","date"),
    factory.createColumn("typeBien","enum","Label Enum",undefined,factory.createFieldEditor(undefined,{enum:TypeBien})),
    factory.createColumn("validate","boolean"),
]


export const EditorObject1 = () => {
    return (
        <div>
            <pre>
                {JSON.stringify(obj,null,3)}
            </pre>
            <Editor
                object={obj}
                columns={columns}
                onChange={(values: AnyObject, isValid: boolean) => {
                    console.log(values)
                }}
            />
        </div>
    )
}




// const editInfo = {
//     props: {
//         p2: {items: items, multiple: true},
//         p3: {label: "Ceci est un nombre"},
//         p4: {label: "Une Date", type:"date"},
//         choix: {choices},
//         typeBien: {enum:TypeBien, label: "Type de bien"}
//     },
//     editors: {
//         p2: List,
//         choix: Radio,
//     }
// }
