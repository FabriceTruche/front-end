import React from "react";
import {TestPopWindow3} from "./containers/TestPopWindow3";
import {TestPopWindow4} from "./containers/TestPopWindow4";
import {TestForm10} from "./containers/TestForm10";
import {TestForm2} from "./containers/TestForm2";
import {TestForm3} from "./containers/TestForm3";
import {TestButtonGroup} from "./ui/TestButtonGroup";
import {TestForm} from "./containers/TestForm";
import {TestForm2Content} from "./containers/TestForm2Content";
import {TestPopWindow2} from "./containers/TestPopWindow2";
import {TestForm2Popup} from "./containers/TestForm2Popup";
import {TestPopWindow1} from "./containers/TestPopWindow1";
import {Navbar} from "../widgets/Navbar/Navbar";
import {TestTable2} from "./widgets/TestTable2";
import {TestTable1} from "./widgets/TestTable1";
import {TestButtonImage} from "./ui/TestButtonImage";
import {TestInput} from "./ui/TestInput";
import {TestList} from "./ui/TestList";
import {EditorObject1} from "./widgets/EditorObject1";
import {TestPopWindowV2} from "./containers/TestPopWindowV2";
import {TestModal1} from "./containers/TestModal1";


export const AllTests = ()=> {
    return (
        <Navbar showTitle={false}>

            {/**** containers  ********************/}
            <Navbar label="Containers"  >
                <TestPopWindow1/>
                <TestPopWindow2/>
                <TestPopWindow3/>
                <TestPopWindow4/>
                <TestPopWindowV2 />
                <TestForm/>
                <TestForm2/>
                <TestForm2Content
                    onChange={() => {
                    }}
                    showButton={true}
                />
                <TestForm2Popup/>
                <TestForm3/>
                <TestForm10/>
                <TestModal1/>
            </Navbar>

            {/**** widgets  ********************/}
            <Navbar label="Widgets">
                <TestTable1/>
                <TestTable2/>
            </Navbar>

            {/**** UI  ***************************************/}
            <Navbar label="UI">
                <Navbar label="List">
                    <TestList />
                </Navbar>
                <Navbar label="Button">
                    <TestButtonGroup/>
                    <TestButtonImage/>
                </Navbar>
                <Navbar label="Input">
                    <TestInput />
                    <EditorObject1 />
                </Navbar>
                <Navbar label="Box">

                </Navbar>

            </Navbar>

        </Navbar>
    )
}