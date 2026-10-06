import {PopupV1} from "../components/containers/PopupV1";

export const TestPopWindow1 = () => {
    return (
        <PopupV1
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
