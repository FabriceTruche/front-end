import React from "react";
import {TestPopWindow3} from "./containers/TestPopWindow3";
import {TestPopWindow4} from "./containers/TestPopWindow4";
import {TestForm10} from "./containers/TestForm10";
import {TestForm2} from "./containers/TestForm2";
import {TestForm3} from "./containers/TestForm3";
import {TestButtonGroup} from "./ui/TestButtonGroup";
import {TestForm} from "./containers/TestForm";
import {TestPopWindow2} from "./containers/TestPopWindow2";
import {TestForm2Popup} from "./containers/TestForm2Popup";
import {TestPopWindow1} from "./containers/TestPopWindow1";
import {TestTable2} from "./Table/TestTable2";
import {TestTable1} from "./Table/TestTable1";
import {TestButtonImage} from "./ui/TestButtonImage";
import {TestInput} from "./ui/TestInput";
import {TestList} from "./ui/TestList";
import {EditorObject1} from "./widgets/EditorObject1";
import {TestPopWindowV2} from "./containers/TestPopWindowV2";
import {TestModal1} from "./containers/TestModal1";
import {Page1} from "./containers/Page1";
import {Menu, MenuItem} from "../widgets/Menu/Menu";
import {Tcd1} from "./Tcd/Tcd1";
import {Tcd3} from "./Tcd/Tcd3";


export const allTests: MenuItem[] = [
    {
        label: "Containers", content: [
            {content: Page1},
            {content: TestPopWindow1},
            {content: TestPopWindow2},
            {content: TestPopWindow3},
            {content: TestPopWindow4},
            {content: TestPopWindowV2},
            {content: TestForm},
            {content: TestForm2},
            {content: TestForm2Popup},
            {content: TestForm3},
            {content: TestForm10},
            {content: TestModal1},
        ]
    },
    {
        label: "Widgets", content: [
            {content: TestTable1},
            {content: TestTable2},
            {content: Tcd1 },
            {content: Tcd3 }
        ]
    },
    {
        label: "UI", content: [
            {
                label: "List", content: [
                    {content: TestList},
                ]
            },
            {
                label: "Button", content: [
                    {content: TestButtonGroup},
                    {content: TestButtonImage},
                ]
            },
            {
                label: "Input", content: [
                    {content: TestInput},
                    {content: EditorObject1},
                ]
            },
        ]
    }
]

//export const AllTests = ()=> <Menu items={allTests} />
//
//     <Navbar label="List">
//         <TestList />
//     </Navbar>
//     <Navbar label="Button">
//         <TestButtonGroup/>
//         <TestButtonImage/>
//     </Navbar>
//     <Navbar label="Input">
//         <TestInput />
//         <EditorObject1 />
//     </Navbar>
//     <Navbar label="Box">
//
//     </Navbar>
//
// export const AllTests = ()=> {
//     return (
//         <Navbar showTitle={false}>
//
//             {/**** containers  ********************/}
//             <Navbar label="Containers"  >
//                 <Page1 />
//                 <TestPopWindow1/>
//                 <TestPopWindow2/>
//                 <TestPopWindow3/>
//                 <TestPopWindow4/>
//                 <TestPopWindowV2 />
//                 <TestForm/>
//                 <TestForm2/>
//                 <TestForm2Content
//                     onChange={() => {
//                     }}
//                     showButton={true}
//                 />
//                 <TestForm2Popup/>
//                 <TestForm3/>
//                 <TestForm10/>
//                 <TestModal1/>
//             </Navbar>
//
//             {/**** widgets  ********************/}
//             <Navbar label="Widgets">
//                 <TestTable1/>
//                 <TestTable2/>
//                 <TestNav2 />
//             </Navbar>
//
//             {/**** UI  ***************************************/}
//             <Navbar label="UI">
//                 <Navbar label="List">
//                     <TestList />
//                 </Navbar>
//                 <Navbar label="Button">
//                     <TestButtonGroup/>
//                     <TestButtonImage/>
//                 </Navbar>
//                 <Navbar label="Input">
//                     <TestInput />
//                     <EditorObject1 />
//                 </Navbar>
//                 <Navbar label="Box">
//
//                 </Navbar>
//
//             </Navbar>
//
//         </Navbar>
//     )
// }