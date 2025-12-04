import {TextInput} from "../../ui/Text/TextInput";
import {Form} from "../../containers/Form/Form";

export function TestForm10() {
    return (
        <Form
            children={[
                <TextInput name="xx" label="label1" ></TextInput>,
                <TextInput name="yy" label="labelYYYYY" ></TextInput>
            ]}
        />
    )
}
