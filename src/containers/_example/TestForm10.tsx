import {Form} from "../Form/Form";
import {TextInput} from "../../ui/Text/TextInput";

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
