import { useState } from "react"
import {AnyObject} from "../../common/common";
import {Checkbox} from "../../ui/Checkbox/Checkbox";
import {dataHelper} from "../../helper/DataHelper";
import {TestForm2Content} from "./TestForm2Content";


export const TestForm2=()=>{
    const [values,setValues]=useState<AnyObject>({})
    const [isValid,setIsValid]=useState<boolean>(false)
    const [showButton,setShowButton]=useState<boolean>(true)
    
    return (
        <div style={{
            display: "flex",
            flexDirection: "row"
        }}>
            <TestForm2Content
                onChange={(values:AnyObject, isValid:boolean)=>{
                    setValues(values)
                    setIsValid(isValid)
                }}
                showButton={showButton}
            />
            <div>
                <Checkbox
                    label="show button" 
                    name="show_button" 
                    defaultValue={showButton}
                    help="Auto validation"
                    onChange={()=>{
                        setShowButton(!showButton)
                    }}
                />

                <pre>
                    values={JSON.stringify(values,null,3)}<br/>
                    isValid={isValid.toString()}
                </pre>
            </div>
        </div>
    )
}

