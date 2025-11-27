import {useState} from "react";
import {PopWindow} from "../PopWindow";
import {dataHelper} from "../../../helper/DataHelper";
import {SimpleList} from "../../../ui/List/SimpleList";
import {PopWindowList} from "../PopWindowList";

export const TestPopup1 = () => {
    return (
        <PopWindow
            title="Example 1"
            visible={true}
            content={()=>(
                <div>
                    HELLO
                </div>
            )}
        />
    )
}
export const TestPopup2 = () => {
    const [value, setValue] = useState("ok")
    return (
        <PopWindow
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
const items: string[] = dataHelper.genWordsArray()
export const TestPopup3 = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const [overValue, setOverValue] = useState("")

    return (
        <PopWindow
            title="Select item"
            visible={false}
            activator={(show: () => void) => (
                <div>
                    <button onClick={() => {
                        show()
                    }}>
                        Click THE BUTTON
                    </button>
                    <div>
                        value={selectedValue}
                    </div>
                    <div>
                        over-value={overValue}
                    </div>
                </div>
            )}
            content={(hide: () => void) => (
                <SimpleList
                    items={items}
                    onMouseOver={(item: string) => setOverValue(item)}
                    onMouseLeave={(item: string) => setOverValue("")}
                    onClick={(item: string) => {
                        setSelectedValue(item)
                    }}
                    onDoubleClick={(item: string) => {
                        setSelectedValue(item)
                        hide()
                    }}
                />
            )}
            onCancel={() => setSelectedValue("<cancelled>")}
        />
    )
}
export const TestPopup4 = () => {
    const [value, setValue] = useState("")

    return (
        <PopWindowList
            title="Selection"
            visible={true}
            items={items}
            activator={(show: () => void) => (
                <div>
                    <button onClick={() => {
                        show()
                    }}>
                        Click THE BUTTON
                    </button>
                    <div>
                        value={value}
                    </div>
                </div>
            )}
            onOk={(item: string) => {
                setValue(item)
            }}
            onCancel={() => {
                setValue("<no value>")
            }}
        />
    )
}
