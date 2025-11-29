import {useState} from "react";
import {AnyObject} from "../../common/common";
import {PopWindow} from "../PopWindow/PopWindow";
import {TestForm2Content} from "./TestForm2Content";

export const TestForm2Popup = () => {
    const [values, setValues] = useState<AnyObject>({})
    const [isValid,setIsValid]=useState<boolean>(false)

    return (
        <div>
            <PopWindow
                title="Form"
                activator={(show: () => void) => (
                    <button onClick={() => {
                        show()
                    }}>
                        Click to show Form
                    </button>
                )}
                content={(hide: () => void) => (
                    <TestForm2Content
                        onChange={(values:AnyObject, isValid:boolean)=>{
                            setValues(values)
                            setIsValid(isValid)
                            hide()
                        }}
                        showButton={true}
                    />
                )}
                // onOk={() => {
                // }}
                // onCancel={() => {
                // }}
            />
            <div>
                <pre>
                    values={JSON.stringify(values,null,3)}<br/>
                    isValid={isValid.toString()}
                </pre>
            </div>
        </div>
    )
}

