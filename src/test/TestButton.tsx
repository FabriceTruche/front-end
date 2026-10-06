import * as React from 'react'
import {Button} from "../components/Button";
import {Buttons} from "../components/Buttons";

export type TsButtonProps = {}
export const TestButton = (props: TsButtonProps) => {
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
