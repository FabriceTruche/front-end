import {useState} from "react";
import {Button} from "../../ui/Button/Button";
import {Popup} from "./Popup";


export type ModalProps = {
    title?: string
    children: any
}

export const Modal = (props: ModalProps) => {

    const [show, setShow] = useState(false)

    return (
        <div>
            <Button
                onClick={() => setShow(true)}
            >Hello</Button>
            <p>Bonjour à tous</p>

            <Popup
                title={props.title ?? "<no title>"}
                visible={show}
                onCancel={() => setShow(false)}
            >
                {props.children}
            </Popup>

        </div>

    )
}