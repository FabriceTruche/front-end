import {Popup_V0} from "../../containers/Popup/Popup_V0";

export const TestPopWindow1 = () => {
    return (
        <Popup_V0
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
