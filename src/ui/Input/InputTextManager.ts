import {IInputManager} from "./IInputManager";
import React from "react";
import {InputBasicProps} from "./InputComponents";

export class InputTextManager implements IInputManager<React.ChangeEvent<HTMLInputElement>, React.MouseEvent<HTMLSpanElement>> {
    private readonly _props: InputBasicProps;

    constructor(props: InputBasicProps) {
        this._props = props;
    }

    handleInputChange(ev: React.ChangeEvent<HTMLInputElement>, setFunc: Function): void {
        const validate = (v: any) => {
            setFunc(v)
            this.props.onChange && this.props.onChange(v)
        }
        const v = ev.target.value

        if (!!v)
            validate("")

        if (this.props.mask) {
            const re = new RegExp(this.props.mask, "i")

            if (re.test(v))
                validate(v)
        } else {
            validate(v)
        }
    }

    handleInputReset(ev: React.MouseEvent<HTMLSpanElement>, setFunc: Function): void {
        setFunc("")
        this.props.onChange && this.props.onChange("")
        this.props.onReset && this.props.onReset("")
    }

    get props(): any {
        return this._props
    }

}