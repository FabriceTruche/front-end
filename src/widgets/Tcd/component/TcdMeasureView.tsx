export {}

// import {TcdPartViewProps, TcdViewProps} from "./TcdView";
// import {CSSProperties, Fragment} from "react";
// import {Cell} from "./TcdBlock";
//
// // export type TcdHeaderRowViewProps<T extends { displayValue: ()=>string }> = TcdPartViewProps<T> & {
// // }
//
// export const TcdMeasureView=<T extends { displayValue: ()=>string },>(props: TcdPartViewProps<T>) => {
//
//     const style=()=>{
//         return {
//         }
//     }
//
//     return (
//         <Fragment>
//             {props.cells.map((c: Cell<T>, index: number) => {
//                 return (
//                     <div
//                         key={index}
//                         className={"tcd-measure"}
//                         style={style()}
//                     >
//                         {c.object.displayValue()}
//                     </div>
//                 )
//             })}
//         </Fragment>
//     )
// }