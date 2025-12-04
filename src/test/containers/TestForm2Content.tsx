import {AnyObject} from "../../common/common";
import {TextInput} from "../../ui/Text/TextInput";
import {Radio} from "../../ui/Radio/Radio";
import {Checkbox} from "../../ui/Checkbox/Checkbox";
import {List} from "../../ui/List/List";
import {Textarea} from "../../ui/Text/Textarea";
import {dataHelper} from "../../helper/DataHelper";
import {Form} from "../../containers/Form/Form";

const genItems1=dataHelper.genWordsArray(4,10).map((s:string)=>({value:s,label:s}))
const genItems2=dataHelper.genWordsArray(5,20).map((s:string)=>({value:s,label:s}))
const genItems3=dataHelper.genWordsArray(5,20)

type TestForm2Props = {
    showButton: boolean
    onChange: (values: AnyObject, isValid: boolean)=>void
}
export const TestForm2Content=(props:TestForm2Props)=>(
    <Form
        onFormChange={(values:AnyObject, isValid:boolean)=>{
            props.onChange(values,isValid)
            // console.log(values,isValid)
        }}
        debug={true}
        submit={props.showButton?"Valider...":undefined}
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
            type="search"
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
            title="Type de bidule"
            name="bid1"
            label="Bidule 1"
            defaultValue={true}
        />
        <Checkbox
            name="bid2"
            label="Bidule 2"
            defaultValue={false}
        />
        <Checkbox
            name="bid3"
            label="Bidule 3"
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
            // defaultValue="Fabrice Audouard ..."
            rows={3}
            cols={20}
        />
    </Form>
)
