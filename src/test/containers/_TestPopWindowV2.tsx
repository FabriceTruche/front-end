export {}

// import {useState} from "react";
// import {ModalWindow} from "../../containers/__Form/_ModalWindow";
// import {TextInput} from "../../ui/Text/TextInput";
// import {Button} from "../../ui/Button/Button";
// import {Popup} from "../../containers/Popup/Popup";
//
//
// export const TestPopWindowV2 = () => {
//     const [show, setShow] = useState(false)
//
//     return (
//         <div>
//             <Button
//                 onClick={() => setShow(true)}
//             >Hello</Button>
//             <p>Bonjour à tous</p>
//
//             <Popup
//                 title="Edit row"
//                 visible={show}
//                 onCancel={() => setShow(false)}
//             >
//                 <ModalWindow>
//                     <TextInput name={"name1"} label={"Nom 1"}/>
//                     <TextInput name={"name2"} label={"Nom 2"}/>
//                     <TextInput name={"name3"} label={"Nom 3"}/>
//                 </ModalWindow>
//             </Popup>
//
//         </div>
//
//     )
// }