import * as React from 'react'
import {useState} from "react"

// Component name : TestWidth
// Creation date : 03/01/2025 - 18:07

/**
 * Props de TestWidth
 */
export type TestWidthProps = {
    // props...
}
/**
 * Component TestWidth
 */
// export const TestWidth = (props: TestWidthProps) => {
//     const [value, setValue] = useState("Initial value")
//
//     const getWidth=(pText:string, pFontSize, pStyle) {
//         var lDiv = document.createElement('div');
//
//         document.body.appendChild(lDiv);
//
//         if (pStyle != null) {
//             lDiv.style = pStyle;
//         }
//         lDiv.style.fontSize = "" + pFontSize + "px";
//         lDiv.style.position = "absolute";
//         lDiv.style.left = -1000;
//         lDiv.style.top = -1000;
//
//         lDiv.textContent = pText;
//
//         var lResult = {
//             width: lDiv.clientWidth,
//             height: lDiv.clientHeight
//         };
//
//         document.body.removeChild(lDiv);
//         lDiv = null;
//
//         return lResult;
//     }
//
//     return (
//         <div>
//             Hello world. Value={value}
//         </div>
//     )
// }
//
//
//
