import {AnyObject} from "../../common/common";
import {List} from "../../ui/List/List";
import {TextInput, TextInputProps} from "../../ui/Text/TextInput";
import {Form} from "../../containers/Form/Form";
import {helper} from "../../common/Helper";

export const TestForm = () => {
    return (
        <Form
            onChange={(inputName: string, value: any) => {
                console.log('onChange', inputName, value)
            }}
            onFormChange={(values: AnyObject, isValid: boolean) => {
                console.log('onFormChange', values, isValid)
            }}
        >
            <div>toto</div>
            <TextInput name="nom" label="Nom" defaultValue="nom defaut"/>
            <TextInput name="prenom" label="Prénom" defaultValue="default prenom" nullIfEmpty={false}
                   onChange={(value: any) => {
                       console.log('prenom==>', value)
                   }}
            />
            <List
                name="myList"
                label="Liste de choix"
                multiple={true}
                defaultValue={["item2", "item3"]}
                items={helper.genWordsArray(4, 10).map((s: string) => ({value: s, label: s}))}
                help="Liste à choix multiple"
            />
        </Form>
    )
}

