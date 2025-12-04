import {Form} from "../../containers/Form/Form";
import {dataHelper} from "../../helper/DataHelper";
import {SimpleList} from "../../ui/List/SimpleList";
import {List} from "../../ui/List/List";
import {TextInput} from "../../ui/Text/TextInput";

const items: string[] = dataHelper.genWordsArray(10,30)

export const ControlsUI = () => {
    return (
        <Form>
            <TextInput name="prenom" label="Prénom" />
            <TextInput name="age" label="Age" />
            <TextInput name="name" label="Nom" />
            <TextInput name="name" label="Nom" />
            <TextInput name="name2" label="Nom2" />
            <TextInput name="date" label="Saisie Date" />
            <SimpleList items={items} />
            <List
                items={items.map((v:string)=>({value:v,label:v}))}
                label={"List"}
                name={"list"}
            />
            <List
                items={items.map((v:string)=>({value:v,label:v}))}
                label={"List"}
                name={"list"}
                multiple={true}
            />
        </Form>
    )
}

