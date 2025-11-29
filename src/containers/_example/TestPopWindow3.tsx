import {dataHelper} from "../../helper/DataHelper";
import {useState} from "react";
import {PopWindow} from "../PopWindow/PopWindow";
import {SimpleList} from "../../ui/List/SimpleList";

const items: string[] = dataHelper.genWordsArray()

export const TestPopWindow3 = () => {
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
