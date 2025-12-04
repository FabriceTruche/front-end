import * as React from 'react'
import {Button} from "../../ui/Button/Button";
import {Buttons} from "../../ui/Button/Buttons";

export type TestButtonGroupProps = {}
export const TestButtonGroup = (props: TestButtonGroupProps) => {

    return (
        <div>
            <Buttons>
                <Button>Bouton1</Button>
            </Buttons>
            <Buttons>
                <Button>Bouton1</Button>
                <Button>Bouton2</Button>
            </Buttons>
            <Buttons>
                <Button>Bouton1</Button>
                <Button>Bouton2</Button>
                <Button>Bouton3</Button>
            </Buttons>
            <Buttons>
                <Button>Bouton1</Button>
                <Button>Bouton2</Button>
                <Button>Bouton3</Button>
                <Button>Bouton4</Button>
            </Buttons>
        </div>
    )
}