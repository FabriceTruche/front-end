import { useState } from "react"
import {AnyObject} from "../../common/common";
import {Textarea} from "../../ui/Text/Textarea";
import {Checkbox} from "../../ui/Checkbox/Checkbox";
import {dataHelper} from "../../helper/DataHelper";
import {Radio} from "../../ui/Radio/Radio";
import {List} from "../../ui/List/List";
import {TextInput} from "../../ui/Text/TextInput";
import {Form} from "../../containers/Form/Form";

const genItems1=dataHelper.genWordsArray(4,10).map((s:string)=>({value:s,label:s}))
const genItems2=dataHelper.genWordsArray(5,20).map((s:string)=>({value:s,label:s}))
const genItems3=dataHelper.genWordsArray(5,20)

export const TestForm3=()=>{
    const [values,setValues]=useState<AnyObject>({})
    const [isValid,setIsValid]=useState<boolean>(false)
    
    return (
        <div style={{
            display: "flex",
            flexDirection: "row"
        }}>
            <Form
                onFormChange={(values:AnyObject, isValid:boolean)=>{
                    // console.log(values,isValid)
                    setValues(values)
                    setIsValid(isValid)
                }}
                debug={true}
            >
                <TextInput
                    name="champ1"
                    type="text"
                    label="Champ N°1"
                    placeholder="Saisissez un texte..."
                    required={true}
                />
                <TextInput
                    name="mail"
                    label="Mail"
                    type="email"
                    required={true}
                    help="votre eMail de contact"
                    defaultValue="Hello@gmail.com"
                    placeholder="name@domain.sufixe"
                />
                <TextInput
                    name="champ2"
                    label="Champ N°2"
                    type="text"
                    pattern="[a-d]{3}"
                    nullIfEmpty={false}
                />
                <Radio
                    name="language"
                    defaultValue="js"
                    choices={[
                        {id:"1", label:"HTML", value:"html" },
                        {id:"2", label:"CSS", value:"css" },
                        {id:"3", label:"js", value:"js" },
                    ]}
                    help="Type de langage"
                />
                <Checkbox
                    name="checkbox"
                    label="Check box"
                />
                <Checkbox
                    name="Select1"
                    label="Choix1"
                />
                <Checkbox
                    name="Select2"
                    label="Choix2"
                    defaultValue={true}
                />
                <List
                    name="myList"
                    label="Liste de choix"
                    multiple={true}
                    defaultValue={["item2","item3"]}
                    items={genItems1}
                    help="Liste à choix multiple"
                />
                <List
                    name="myList2"
                    label="Liste de choix unique"
                    multiple={false}
                    defaultValue="item3"
                    items={genItems2}
                />
                <TextInput
                    name="openList"
                    label="Open list"
                    type="text"
                    data={genItems3}
                    help="Liste à choix unique"
                />
                <Textarea
                    name="champArea"
                    label="Longtext"
                    required={true}
                    defaultValue="Fabrice Audouard ..."
                    rows={3}
                    cols={20}
                />
                <TextInput
                    name="selectMonth"
                    label="Choix période"
                    type="month"
                    required={true}
                    defaultValue="2020-01"
                />
                <TextInput
                    name="champDate"
                    label="Champ Date"
                    type="datetime-local"
                    defaultValue="2022-12-20T10:20"
                />
                <TextInput
                    name="choixDate"
                    label="Choix Semaine"
                    type="week"
                    defaultValue="2021-12-25"
                />
            </Form>
            <div>
                <pre>
                    values={JSON.stringify(values,null,3)}<br/>
                    isValid={isValid.toString()}
                </pre>
            </div>
        </div>
    )
}

