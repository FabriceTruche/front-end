import {TextInput} from "../../ui/Text/TextInput";
import React from "react";
import {Form} from "../../containers/Form/Form";

export const TestInput = () => (
    <Form>
        <TextInput name="prenom" label="Prénom" />
        <TextInput name="age" label="Age" />
        <TextInput name="name" label="Nom" />
        <TextInput name="name" label="Nom" />
        <TextInput name="name2" label="Nom2" />
        <TextInput name="date" label="Saisie Date" />
    </Form>
)
