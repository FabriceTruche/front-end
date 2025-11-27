import {Navbar} from "../Navbar/Navbar";
import {TestButtonGroup} from "../../ui/_exemple/TestButtonGroup";
import React from "react";
import {TestForm} from "./TestForm";
import {TestPopWindow1, TestPopWindow2, TestPopWindow3, TestPopWindow4} from "./TestPopWindow";
import {TestForm2} from "./TestForm2";
import {TestForm3} from "./TestForm3";

export const TestNavbar = ()=>{
    return (
        <Navbar>
            <TestPopWindow1 />
            <TestPopWindow2 />
            <TestPopWindow3 />
            <TestPopWindow4 />
            <TestForm />
            <TestForm2 />
            <TestForm3 />
            <TestButtonGroup />
        </Navbar>
    )
}