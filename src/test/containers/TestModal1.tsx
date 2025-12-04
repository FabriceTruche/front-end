import {Form} from "../../containers/Form/Form";
import {TextInput} from "../../ui/Text/TextInput";
import {Modal} from "../../containers/Popup/Modal";

export const TestModal1 = () => {

    return (
        <Modal>
            <Form>
                <TextInput name={"name1"} label={"Nom 1"}/>
                <TextInput name={"name2"} label={"Nom 2"}/>
                <TextInput name={"name3"} label={"Nom 3"}/>
            </Form>
        </Modal>
    )
}

//
//
// <Button
// onClick={() => setShow(true)}
// >Hello</Button>
// <p>Bonjour à tous</p>
//
// <Popup
// title="Edit row"
// visible={show}
// onCancel={() => setShow(false)}
// >
// </Popup>
//
// </div>
