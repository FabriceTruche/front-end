import {PopWindow} from "../PopWindow/PopWindow";

export const TestPopWindow1 = () => {
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
