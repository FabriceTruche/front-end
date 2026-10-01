import React from "react";
import {InputBasicProps} from "./InputComponents";

export interface IInputManager<TCE,TME> {
    props: InputBasicProps

    handleInputChange(ev: TCE, setFunc: Function): void
    handleInputReset(ev: TME, setFunc: Function): void

}
