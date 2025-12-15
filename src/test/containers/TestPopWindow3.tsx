import {useState} from "react";
import {SimpleList} from "../../ui/List/SimpleList";
import {Popup_V0} from "../../containers/Popup/Popup_V0";
import {helper} from "../../common/Helper";

const items: string[] = helper.genWordsArray()

export const TestPopWindow3 = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const [overValue, setOverValue] = useState("")

    return (
        <Popup_V0
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
