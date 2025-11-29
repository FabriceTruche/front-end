import {useState} from "react";
import {PopWindowList} from "../PopWindow/PopWindowList";
import {dataHelper} from "../../helper/DataHelper";

const items: string[] = dataHelper.genWordsArray()

export const TestPopWindow4 = () => {
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

