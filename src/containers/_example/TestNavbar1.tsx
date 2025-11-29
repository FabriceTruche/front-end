import {TestButtonGroup} from "../../ui/_exemple/TestButtonGroup";
import React from "react";
import {TestForm3} from "./TestForm3";
import {TestTable1} from "../../widgets/_exemple/TestTable1";
import {TestForm2Popup} from "./TestForm2Popup";
import { Navbar } from "../../widgets/Navbar/Navbar";
import {TestTable2} from "../../widgets/_exemple/TestTable2";
import {TestPopWindow3} from "./TestPopWindow3";
import {TestPopWindow4} from "./TestPopWindow4";
import {TestPopWindow1} from "./TestPopWindow1";
import {TestPopWindow2} from "./TestPopWindow2";
import {TestForm2} from "./TestForm2";
import {TestForm} from "./TestForm";
import {TestForm2Content} from "./TestForm2Content";
import {TestForm10} from "./TestForm10";
import {EditRow} from "../../widgets/Table/EditRow";
import {TestPopWindowV2} from "../../widgets/_exemple/TestPopWindowV2";

export const TestNavbar1 = ()=> {
        return (
            <Navbar>
                <TestPopWindowV2 />
                <EditRow show={true}/>
                    <TestPopWindow1/>
                    <TestPopWindow2/>
                    <TestPopWindow3/>
                    <TestPopWindow4/>
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
                    <TestButtonGroup/>
                    <TestTable1/>
                    <TestTable2/>
            </Navbar>
        )
}