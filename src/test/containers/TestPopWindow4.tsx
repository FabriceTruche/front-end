import {useState} from "react";
import {dataHelper} from "../../helper/DataHelper";
import {PopupList} from "../../widgets/PopupList/PopupList";

const items: string[] = dataHelper.genWordsArray()

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

