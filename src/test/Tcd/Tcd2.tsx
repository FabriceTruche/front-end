export {}

// import {Cell, TcdBlock} from "../../widgets/Tcd/component/TcdBlock";
// import {TcdMode} from "../../widgets/Tcd/model/TcdViewManager";
//
//
// export const Tcd2=() => {
//     const header = ["col1", "col2", "col3"]
//     const data: Cell<any>[] = [
//         {object: {displayValue:()=>"Zero"}, coord: {x: 0, y: 0}},
//         {object: {displayValue:()=>"Fabrice"}, coord: {x: 1, y: 1}},
//         {object: {displayValue:()=>"Yoo"}, coord: {x: 1, y: 2}},
//         {object: {displayValue:()=>"Hello"}, coord: {x: 2, y: 4}},
//         {object: {displayValue:()=>"Red"}, coord: {x: 0, y: 3}},
//         {object: {displayValue:()=>"Small"}, coord: {x: 1, y: 5}},
//     ]
//
//
//     return (
//         <div>
//             <TcdBlock
//                 header={header}
//                 body={data}
//                 mode={TcdMode.top}
//                 origin={{x: 0, y: 0}}
//                 totals={[]}
//             />
// wwww
//             <TcdBlock
//                 header={header}
//                 body={data}
//                 mode={TcdMode.left}
//                 origin={{x: 0, y: 0}}
//                 totals={[]}
//             />
//         </div>
//     )
// }