import {useState} from "react";
import {PopupList} from "../../widgets/PopupList/PopupList";
import {helper} from "../../common/Helper";

const items: string[] = helper.genWordsArray()

export const TestPopWindow4 = () => {
    const [value, setValue] = useState("")

    return (
        <PopupList
            title="Selection"
            visible={true}
            items={items}
            onOk={(item: string) => {
                setValue(item)
            }}
            onCancel={() => {
                setValue("<no value>")
            }}
        />
    )
}

