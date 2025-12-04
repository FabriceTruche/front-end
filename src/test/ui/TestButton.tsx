import * as React from 'react'
import {Button} from "../../ui/Button/Button";
import {Buttons} from "../../ui/Button/Buttons";

export type TestButtonProps = {}
export const TestButton = (props: TestButtonProps) => {
    return (
        <div>
            <Buttons>
                <Button>kmlkmlklm</Button>
                <Button
                    style={{
                        color: "blue",
                    }}
                    onClick={()=>{
                        alert('Coucou')
                    }}
                >
                    <div
                        className="material-symbols-outlined"
                        style={{
                            fontSize: "20px",
                            padding: 0,
                            margin: 0
                        }}
                    >
                        key
                    </div>

                </Button>
                <Button>vvfdsdkjlk</Button>
            </Buttons>
        </div>
    )
}


/*                <XButton2 label="toto"/>
                <XButton2 label="titi"/>
*/
