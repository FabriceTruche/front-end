export {}

// import { GenColumn, helper } from "../../common/Helper";
// import { TableConfig } from "../../components/Table/TableConfig";
// import { ICell } from "../../components/common/Cell";
//
// // AJOUT DE L'IMPORTATION DU STYLE DE LA MODALE
// // import "../../components/Form/form-modal.css";
// import {EventManager, TableViewActionsMain} from "../../components/Table/TableViewActionsMain";
// import {ActivityLogger} from "../../components/ActivityLogger";
// import {useActivityLog} from "../../components/useActivityLog";
//
// // Passage du nombre maximal de lignes à 10 pour l'expérimentation
// const maxRowCount = 50;
//
// const depot_sel = [100, 200, 350, 450, 500, 650, 620, 680, 820, 1000, 1200, 2000]
// const lot_sel = [1, 2, 3, 4]
// const type_op_sel = ["ACHAT", "REGUL", "SOLDE", "OD"]
// const facture_sel = ["REG", "APA", "ENC", "INC", "AA1", "AA2"]
//
// const schema: GenColumn[] = [
//     { name: "id", dataType: "index", label: "Id" },
//     { name: "lot", total: false, dataType: "integer", label: "Lot", items: lot_sel },
//     { name: "type_op", total: false, dataType: "string", label: "Opération", items: type_op_sel },
//     { name: "depot", dataType: "integer", label: "Dépôt", items: depot_sel },
//     { name: "facture", total: false, dataType: "string", label: "Fac.", items: facture_sel },
//     { name: "description", total: false, dataType: "string", label: "Description." },
//     { name: "periode", total: false, dataType: "Date" },
//     { name: "selection", total: false, dataType: "boolean", label: "Sélection" },
// ];
//
// // Génération initiale limitée à 10 lignes brutes
// const initialRows = Array.from({ length: maxRowCount }, (_, i) => ({
//     id: i + 1,
//     lot: schema[1].items?.[i % 4],
//     selection: helper.tf(),
//     type_op: schema[2].items?.[i % 4],
//     depot: schema[3].items?.[i % 12],
//     facture: schema[4].items?.[i % 6],
//     description: helper.genWords(4,6),
//     periode: helper.genDate(),
// }))
//
// const defaultObject = () => (
//     {
//         id: helper.rand(1,1000000),
//         lot: 1,
//         selection: false,
//         type_op: schema[2].items?.[0],
//         depot: schema[3].items?.[0],
//         facture: schema[4].items?.[0],
//         description: "new object description",
//         periode: new Date()
//     }
// )
//
// const tableConfig: TableConfig = {
//     allColumns: schema.map(s => s.name),
//     columns: schema.map(s => s.name),
//     sorts: {},
//     columnsDefinition: {
//         periode: {
//             dataType: "date",
//             mask: "MM-YYYY",
//             label: "Période"
//         },
//         description: {
//             dataType: "string",
//         },
//         selection: {
//             dataType: "boolean"
//         }
//     },
//     fieldsDefinition : {
//         selection : {
//             type: "checkbox",
//             disabled: true,
//         },
//         description: {
//             disabled: false,
//             placeholder: "saisir une description"
//         },
//         periode : {
//             disabled: true
//         },
//         id: {
//             disabled: true,
//         }
//     }
// };
//
//
//
//
// export const Table3 = () => {
//     const { logs, addLog, clearLogs } = useActivityLog();
//     const events : EventManager = {
//         onModifyng: (row: object) => {
//             addLog("on modifying ...")
//             return true
//         },
//
//         onModified: (row: object) => {
//             addLog("modified", row)
//         },
//
//         onAdding: (row: object) => {
//             return false
//         },
//
//         onAdded: (row: object) => {
//             addLog("added", row)
//         },
//
//         onDeleting: (row: object) => {
//             addLog("on deleting ...")
//             return true
//         },
//
//         onDeleted: (row: object) => {
//             addLog("deleted", row)
//         },
//
//         getNewObject: () => {
//             addLog("on adding ...")
//             return defaultObject()
//         }
//     }
//     return (
//         <div>
//             <TableViewActionsMain
//                 entity={'none'}
//                 title={"Test table 3"}
//                 initialData={initialRows}
//                 config={tableConfig}
//                 canDeleteRow={true}
//                 onClick={(cell:ICell, row: any)=>{ addLog(cell.rect.y,cell.rect.x,cell.value) }}
//                 events={events}
//                 // getNewObject={()=>{
//                 //     addLog("on adding ...")
//                 //     return defaultObject()
//                 // }}
//                 // onAdded={(row: object)=>{
//                 //     addLog("added", row)
//                 // }}
//                 // onDeleting={()=>{
//                 //     addLog("on deleting ...")
//                 //     return true
//                 // }}
//                 // onDeleted={(row: object)=>{
//                 //     addLog("deleted", row)
//                 // }}
//                 // onModifyng={()=>{
//                 //     addLog("on modifying ...")
//                 //     return true
//                 // }}
//                 // onModified={(row: object)=>{
//                 //     addLog("modified", row)
//                 // }}
//             />
//             <ActivityLogger logs={logs} onClear={clearLogs} />
//         </div>
//     )
// }