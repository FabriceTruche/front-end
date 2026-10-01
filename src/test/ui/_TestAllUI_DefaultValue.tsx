export {}

// import {AnyObject} from "../../common/common";
// import {List} from "../../ui/List/List";
// import {TextInput, TextInputProps} from "../../ui/Text/TextInput";
// // import {ModalWindow} from "../../containers/__Form/_ModalWindow";
// import {helper} from "../../common/Helper";
// import {Checkbox} from "../../ui/Checkbox/Checkbox";
// import {Radio, RadioChoice} from "../../ui/Radio/Radio";
// import {useState} from "react";
//
// export const TestAllUI_DefaultValue = () => {
//
//     const [selection, setSelection] = useState<object>({})
//     const [isValid, setValid] = useState(false)
//
//     const radioChoices: RadioChoice[] = [
//         {id: "1", label: "Value1", value: "v1"},
//         {id: "2", label: "Value2", value: "v2"},
//         {id: "3", label: "Value3", value: "v3"},
//     ]
//
//     return (
//         <div>
//             <ModalWindow
//                 onFormChange={(value: AnyObject, isValid: boolean) => {
//                     const ls = JSON.parse(JSON.stringify(value))
//                     console.log(value, isValid)
//                     setSelection(value)
//                     setValid(isValid)
//                 }}
//                 submit={"Go"}
//             >
//                 <TextInput name="Montant" defaultValue={12.34} inputType="currency"/>
//                 <TextInput name="Tel" defaultValue="1234567890" inputType="tel"/>
//                 <TextInput name="Mail" defaultValue="fabrice.audouard@gmail.com" inputType="email"/>
//                 <TextInput name="Year" defaultValue={2026} inputType="year"/>
//                 <TextInput name="Date" defaultValue={new Date()} inputType="date"/>
//                 <TextInput name="DateTime" defaultValue={new Date()} inputType="datetime"/>
//                 <TextInput name="Month" defaultValue={new Date()} inputType="month"/>
//                 <TextInput name="Week" defaultValue={new Date()} inputType="week"/>
//                 <TextInput name="Time" defaultValue={new Date()} inputType="time"/>
//                 <TextInput name="Number" defaultValue={12345} inputType="number"/>
//                 <TextInput name="Range" defaultValue={7} min={1} max={10} inputType="range"/>
//                 <TextInput name="Text" defaultValue={"Fabrice"} inputType="text"/>
//                 <TextInput name="Password" defaultValue={"coucou"} inputType="password"/>
//                 <TextInput name="URL" defaultValue={"https:google.com"} inputType="url"/>
//                 <Checkbox name={"Checkbox"} defaultValue={true}/>
//                 <Radio name={"Radio"} choices={radioChoices} defaultValue={"v2"}/>
//
//
//             </ModalWindow>
//             <div>
//                 <pre>selection={JSON.stringify(selection, null, 3)}</pre>
//                 <pre>isValid={JSON.stringify(isValid, null, 3)}</pre>
//             </div>
//         </div>
//     )
// }
//
//
// //
// // {/*<__Form*/}
// // {/*    // onChange={(inputName: string, value: any) => {*/}
// // {/*    //     console.log('onChange', inputName, value)*/}
// // {/*    // }}*/}
// // {/*    onFormChange={(values: AnyObject, isValid: boolean) => {*/}
// // {/*        console.log('onFormChange', values, isValid)*/}
// // {/*    }}*/}
// // {/*    submit={"Valider"}*/}
// // {/*>*/}
// // {/*    <div>toto</div>*/}
// // {/*    <TextInput name="nom" label="Nom" defaultValue="2022" inputType="number" pattern="[0-9]{4,4}"/>*/}
// // {/*    <TextInput name="prenom" label="Prénom" defaultValue="default prenom" nullIfEmpty={false}*/}
// // {/*               onChange={(value: any) => {*/}
// // {/*                   console.log('prenom==>', value)*/}
// // {/*               }}*/}
// // {/*    />*/}
// // {/*    <List*/}
// // {/*        name="myList"*/}
// // {/*        label="Liste de choix"*/}
// // {/*        multiple={true}*/}
// // {/*        defaultValue={["item2", "item3"]}*/}
// // {/*        items={helper.genWordsArray(4, 10).map((s: string, index: number) => ({*/}
// // {/*            value: "id" + index,*/}
// // {/*            label: s*/}
// // {/*        }))}*/}
// // {/*        help="Liste à choix multiple"*/}
// // {/*    />*/}
// // {/*</__Form>*/}