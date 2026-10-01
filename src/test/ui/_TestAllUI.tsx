export {}

// import {AnyObject} from "../../common/common";
// import {List} from "../../ui/List/List";
// import {TextInput, TextInputProps} from "../../ui/Text/TextInput";
// // import {ModalWindow} from "../../containers/__Form/ModalWindow";
// import {helper} from "../../common/Helper";
// import {Checkbox} from "../../ui/Checkbox/Checkbox";
// import {Radio, RadioChoice} from "../../ui/Radio/Radio";
// import {useState} from "react";
//
// export const TestAllUI = () => {
//
//     const radioChoices: RadioChoice[] = [
//         {id: "1", label: "Value1", value: "v1"},
//         {id: "2", label: "Value2", value: "v2"},
//         {id: "3", label: "Value3", value: "v3"},
//     ]
//         const [selection,setSelection]=useState<object>({})
//         const [isValid,setValid]=useState(false)
//
//         return (
//             <div>
//                     <ModalWindow
//                         onFormChange={(value: AnyObject, isValid: boolean) => {
//                                 const ls = JSON.parse(JSON.stringify(value))
//                                 console.log(value, isValid)
//                                 setSelection(value)
//                                 setValid(isValid)
//                         }}
//                         submit={"Go"}
//                     >
//                             <TextInput name="Montant" inputType="currency"/>
//                             <TextInput name="Tel" inputType="tel"/>
//                             <TextInput name="Mail" inputType="email"/>
//                             <TextInput name="Year" inputType="year"/>
//                             <TextInput name="Date" inputType="date"/>
//                             <TextInput name="DateTime" inputType="datetime"/>
//                             <TextInput name="Month" inputType="month"/>
//                             <TextInput name="Week" inputType="week"/>
//                             <TextInput name="Time" inputType="time"/>
//                             <TextInput name="Number" inputType="number"/>
//                             <TextInput name="Range" inputType="range"/>
//                             <TextInput name="Text" inputType="text"/>
//                             <TextInput name="URL" inputType="url"/>
//                             <TextInput name="Password" inputType="password"/>
//                             <Checkbox name={"Checkbox"} />
//                             <Radio name={"Radio"} choices={radioChoices} />
//
//
//                     </ModalWindow>
//                     <div>
//                             <pre>selection={JSON.stringify(selection,null,3)}</pre>
//                             <pre>isValid={JSON.stringify(isValid,null,3)}</pre>
//                     </div>
//             </div>
//        )
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