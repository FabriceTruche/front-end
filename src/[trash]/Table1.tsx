export {}

// import {GenColumn, helper} from "../../common/Helper";
// import {TableConfig} from "../../components/Table/TableConfig";
// import {TableViewMain} from "../../components/Table/TableViewMain";
// import {FormObject} from "../../components/Form/FormObject";
// import {useState} from "react";
// import {ICell} from "../../components/common/Cell";
// import {PopupV1} from "../../components/containers/PopupV1";
//
// const maxRowCount = 20000
// const schema: GenColumn[] = [
//     { name: "id", dataType: "index", label:"Id" },
//     { name: "lot", total: false , dataType: "integer", label:"Lot", items: [1,2,3,4/*,7,8,9,10,11*/] },
//     { name: "type_op", total: false, dataType: "string", label: "Opération", items:["ACHAT","REGUL","SOLDE","OD"] },
//     { name: "depot", dataType: "integer", label: "Dépôt", items: [100, 200, 350, 450, 500, 650, 620, 680, 820, 1000, 1200, 2000] },
//     { name: "facture", total: false, dataType: "string", label: "Fac.", items:["REG","APA","ENC","INC","AA1","AA2","AA3","ZZO"] },
//     { name: "annee", total: false, dataType: "integer", label: "Année", items: [2020,2023, 2024, 2025] },
//     { name: "code", total: true, dataType: "float", label:"Code", min: -99, max: 99 },
//     { name: "libelle", dataType: "string", label:"Libellé" },
//     { name: "periode", dataType: "Date", label: "Période" },
//     { name: "reglement", dataType: "boolean", label: "Réglé ?" },
//     { name: "debit", dataType: "float", label: "Débit", min: -99, max: 99/*, items:[10,20,30,40,50] */},
//     { name: "credit", dataType: "float", label: "Crédit"/*, items:[1,2,3,4,5]*/ },
// ]
// const dummyData: any[] = helper.generateData(schema, maxRowCount)
//
// // CREATION DE LA CONFIG
// const config: TableConfig = {
//     allColumns: schema.map((gc: GenColumn)=>gc.name),
//     columns: ["id","lot","periode","debit","credit"],
//     // filter: "REGUL",
//     sorts: {
//         id: "ASC"
//         // periode: "DESC",
//         // debit: "ASC",
//     },
//     // filter: "520",
//     columnsDefinition: {
//         debit: {
//             hasTotal: false,
//             dataType: "number",
//             precision: 2,
//         },
//         credit: {
//             hasTotal: false,
//             dataType: "number",
//             precision: 1,
//         },
//         code: {
//             dataType: "number",
//             precision: 1,
//         },
//         periode: {
//             dataType: "date",
//             mask: "DD-MM-YYYY",
//         },
//         reglement: {
//             dataType: "boolean",
//         }
//     },
//     // inputs : {
//     //     ...helper.getInputTypes(schema),
//     //     periode: {
//     //         type: "month"
//     //     },
//     //     annee: {
//     //         type: "year",
//     //     }
//     // },
// }
//
// export const Table1=()=> {
//     const [cell,setCell]=useState<ICell|undefined>(undefined)
//     const [row,setRow]=useState<any>(undefined)
//     const [data, setData]=useState<any[]>(dummyData)
//
//     return (
//         <div>
//
//             <PopupV1
//                 title="Editor"
//                 visible={false}
//                 activator={(activate: () => void) => {
//                     console.log("dans activator", data[0])
//                     return (
//                     <TableViewMain
//                         config={config}
//                         initialData={data}
//                         onClick={(cell:ICell, row: any)=>{
//                             setCell(cell)
//                             if (row) {
//                                 setRow(row)
//                                 activate()
//                             }
//                         }}
//                     />)
//                 }}
//                 content={(hide: () => void)=>{
//                     if (cell!==undefined)
//                         return (
//                             <div>
//                                 <FormObject
//                                     key={row.id}
//                                     data={row}
//                                     onSubmit={(object: any) => {
//                                         // const index = data.findIndex(item => item.id === object.id);
//                                         //
//                                         // if (index !== -1) {
//                                         //     const newData = [...data]
//                                         //     newData[index] = { ...object };
//                                         //     setData(newData)
//                                         // }
//
//                                         console.log(JSON.stringify(object,null,3))
//                                         hide()
//                                     }}
//                                 />
//                             </div>
//                         )
//                     else
//                         return <div>NOT APPLICABLE</div>
//                 }}
//             />
//         </div>
//     )
// }