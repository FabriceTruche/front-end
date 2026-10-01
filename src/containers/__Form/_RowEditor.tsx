export {}

// import {ReactElement} from "react";
// import {TableConfig} from "../../widgets/Table/TableConfig";
// import {InputType, ColumnDefinition, InputProps} from "../../widgets/common/ColumnDefinition";
// import {Checkbox} from "../../ui/Checkbox/Checkbox";
// import {List} from "../../ui/List/List";
// import {Radio} from "../../ui/Radio/Radio";
// import {AnyObject} from "../../common/common";
// import {ModalWindow} from "./ModalWindow";
// import {Textarea} from "../../ui/Text/Textarea";
// import "./rowEditor.css"
// import {TextInput} from "../../ui/Text/TextInput";
//
// export type RowEditorProps = {
//     config: TableConfig
//     row: any
// }
//
// export function RowEditor(props: RowEditorProps): any {
//     const {config} = props;
//
//     const selectComponent = (columnName: string): any => {
//         const inputProps: InputProps|undefined = config.inputs[columnName]
//
//         if (inputProps===undefined)
//             return null
//
//         const inputType: InputType = inputProps.type
//
//         if (inputType===undefined)
//             return null
//
//         // const inputType: InputType|undefined = option.inputType
//         // const inputProps: any = option.inputProps
//         const label: string = columnName
//         let componentType: InputType = "text"
//         let pattern: string|undefined = undefined
//         let rows: number|undefined = undefined
//         let min: number|undefined = 1
//         let max: number|undefined = 100
//         let step: number|undefined = 1
//
//         let componentFound: boolean = true
//
//         switch (inputType) {
//             case "number":
//                 componentType = "number"
//                 break;
//
//             case "currency":
//                 componentType = "number"
//                 pattern = "[0-9]*\\\.?[0-9]+"
//                 break;
//
//             case "range":
//                 componentType = "range"
//                 min = (inputProps && inputProps.min) || 1
//                 max = (inputProps && inputProps.max) || 100
//                 step = (inputProps && inputProps.step) || 1
//                 break
//
//             case "tel":
//                 componentType = "tel"
//                 pattern = "(\\\([0-9]+\\\))?[0-9]+"
//                 break
//
//             case "int":
//                 componentType = "number"
//                 pattern = "[0-9]+"
//                 break
//
//             case "year":
//                 componentType = "number"
//                 pattern = "[0-9]{4,4}"
//                 break
//
//             case "real":
//                 componentType = "number"
//                 // pattern = "[0-9]*\\\.?[0-9]+"
//                 break
//
//             case "month":
//                 componentType = "month"
//                 break;
//
//             case "time":
//                 componentType = "time"
//                 break;
//
//             case "week":
//                 componentType = "week"
//                 break;
//
//             case "date":
//                 componentType = "date"
//                 break;
//
//             case "url":
//                 pattern = "(https?:\\\/\\\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\\\/[^\\\s]*)?"
//                 componentType = "url"
//                 break
//
//             case "email":
//                 pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\.[a-zA-Z]{2,}"
//                 componentType = "email"
//                 break
//
//             case "password":
//                 componentType = "password"
//                 break
//
//             case "text":
//                 componentType = "text"
//                 break
//
//             default:
//                 componentFound=false
//                 break
//         }
//
//         if (componentFound)
//             return (
//                 <TextInput
//                     key={columnName}
//                     name={columnName}
//                     label={label}
//                     min={min}
//                     max={max}
//                     step={step}
//                     pattern={pattern}
//                     inputType={componentType}
//                 /> )
//
//
//         switch (inputType) {
//             case "boolean":
//                 return <Checkbox
//                     key={columnName}
//                     name={columnName}
//                     label={label}
//                 />
//
//             case "textarea":
//                 rows = (inputProps && inputProps.rows) || 2
//
//                 return <Textarea
//                     key={columnName}
//                     label={label}
//                     name={columnName}
//                     rows={rows}
//                 />
//
//             case "choices":
//                 return <Radio
//                     key={columnName}
//                     name={columnName}
//                     choices={[]}
//                 />
//         }
//
//         return null
//     }
//
//     return (
//         <div className="re-container">
//             <ModalWindow
//                 submit={"Ok"}
//             >
//                 {config.columns.map((c:string)=>selectComponent(c)).filter((elt:any)=>elt!==null)}
//             </ModalWindow>
//         </div>
//     )
// }