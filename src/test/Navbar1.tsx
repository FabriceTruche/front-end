import {Navbar} from "../containers/Navbar/Navbar";
import {TextInput} from "../ui/Text/TextInput";

export const Navbar1 = () => {
    return (
        <Navbar>
            <TextInput name="name" label="Nom" />
            <TextInput name="prenom" label="Prénom" />
            <TextInput name="age" label="Age" />
        </Navbar>
    )
}
