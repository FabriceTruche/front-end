import {useState} from "react";
import {Popup_V0} from "../../containers/Popup/Popup_V0";

export const TestPopWindow2 = () => {
    const [value, setValue] = useState("ok")
    return (
        <Popup_V0
            title="Select item"
            visible={true}
            activator={(activate: () => void) => (
                <button onClick={() => {
                    activate()
                }}>
                    Click THE BUTTON
                </button>
            )}
            content={() => (
                <pre
                    style={{
                        whiteSpace: "pre-wrap"
                    }}
                >
                    <div>dfdsfsdfsd sdf sd fsd </div>
                    <div>dfdsfsdfsd sdf sd fsd </div>
                    <div>fldkfdsk sdflskdf ksf sdkfsldm fksdml fksdml fksmlfksdml fsdml fsdm ksdmlf sqdf qs dmlqskd qkdsmqsl qmsd smdk qkmds</div>
                    <div>lkjdkfjdslfs</div>
                    <div>qsssqd</div>
                    <div>dfdsfsdfsd sdf sd fsd </div>
                    <div>dfdsfsdfsd sdf sd fsd </div>
                    <div>dfdsfsdfsd sdf sd fsd </div>
                    <div>{value}</div>
                    <button onClick={() => setValue("newValue")}>CLICK</button>
                </pre>
            )}
        />
    )
}
