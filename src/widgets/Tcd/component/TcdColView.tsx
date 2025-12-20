export {}

// import {getStyle, TcdPartViewProps, TcdViewProps} from "./TcdView";
// import {CSSProperties, Fragment} from "react";
// import {Cell} from "./TcdBlock";
//
// // export type TcdHeaderRowViewProps<T extends { displayValue: ()=>string }> = TcdPartViewProps<T> & {
// // }
//
// export const TcdColView=<T extends { displayValue: ()=>string },>(props: TcdPartViewProps<T>) => {
//     return (
//         <Fragment>
//             {props.cells.map((c: Cell<T>, index: number) => {
//                 return (
//                     <div
//                         key={index}
//                         className={"tcd-row"}
//                         style={getStyle(props.startPos)}
//                     >
//                         {c.object.displayValue()}
//                     </div>
//                 )
//             })}
//         </Fragment>
//     )
// }