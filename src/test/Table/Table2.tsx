export {}

// import { useState } from "react";
// import { GenColumn, helper } from "../../common/Helper";
// import { TableConfig } from "../../components/Table/TableConfig";
// import { TableViewMain } from "../../components/Table/TableViewMain";
// import { ICell } from "../../components/common/Cell";
//
// // IMPORTATIONS DES LOGS ET DE LA MODALE
// // import "../../components/Form/form-modal.css";
// import { FormObject } from "../../components/Form/FormObject";
// import { FormModal } from "../../components/Form/FormModal";
// import { ActivityLogger } from "../../components/ActivityLogger"; // Ajuste le chemin
// import { useActivityLog } from "../../components/useActivityLog";   // Ajuste le chemin
//
// const maxRowCount = 10;
//
// const schema: GenColumn[] = [
//     { name: "id", dataType: "index", label: "Id" },
//     { name: "lot", total: false, dataType: "integer", label: "Lot", items: [1, 2, 3, 4] },
//     { name: "type_op", total: false, dataType: "string", label: "Opération", items: ["ACHAT", "REGUL", "SOLDE", "OD"] },
//     { name: "depot", dataType: "integer", label: "Dépôt", items: [100, 200, 350, 450, 500, 650, 620, 680, 820, 1000, 1200, 2000] },
//     { name: "facture", total: false, dataType: "string", label: "Fac.", items: ["REG", "APA", "ENC", "INC", "AA1", "AA2"] },
//     { name: "description", total: false, dataType: "string", label: "Description." },
//     { name: "periode", total: false, dataType: "Date" },
//     { name: "selection", total: false, dataType: "boolean", label: "Sélection" },
// ];
//
// const initialRows = Array.from({ length: maxRowCount }, (_, i) => ({
//     id: i + 1,
//     lot: schema[1].items?.[i % 4],
//     selection: helper.tf(),
//     type_op: schema[2].items?.[i % 4],
//     depot: schema[3].items?.[i % 12],
//     facture: schema[4].items?.[i % 6],
//     description: helper.genWords(4,6),
//     periode: helper.genDate(),
// }));
//
// const tableConfig: TableConfig = {
//     allColumns: schema.map(s => s.name),
//     columns: schema.map(s => s.name),
//     sorts: {},
//     columnsDefinition: {
//         periode: { dataType: "date", mask: "MM-YYYY" },
//         description: { dataType: "string" },
//         selection: { dataType: "boolean" }
//     },
//     fieldsDefinition : {
//         selection : { type: "checkbox", disabled: true },
//         description: { disabled: false, placeholder: "saisir une description" },
//         periode : { disabled: true },
//         id: { disabled: true }
//     }
// };
//
// const ConfirmDeleteForm = ({ data, onSubmit }: { data: any; onSubmit: (data: any) => void }) => {
//     return (
//         <form
//             onSubmit={(e) => { e.preventDefault(); onSubmit(data); }}
//             style={{ padding: "10px 0", textAlign: "center" }}
//         >
//             <div style={{ fontSize: "50px", marginBottom: "15px" }}>⚠️</div>
//             <p style={{ fontSize: "16px", color: "#2f3640", margin: "0 0 10px 0" }}>
//                 Vous êtes sur le point de supprimer l'enregistrement <strong>#{data.id}</strong>.
//             </p>
//             <p style={{ fontSize: "14px", color: "#778ca3", margin: "0 0 25px 0" }}>
//                 Cette action est irréversible. Souhaitez-vous continuer ?
//             </p>
//             <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
//                 <button
//                     type="submit"
//                     style={{
//                         backgroundColor: "#eb4d4b", color: "#fff", border: "none", padding: "10px 24px",
//                         borderRadius: "6px", fontSize: "14px", fontWeight: "bold", cursor: "pointer",
//                         boxShadow: "0 2px 5px rgba(235, 77, 75, 0.3)", transition: "background-color 0.2s"
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ff7675"}
//                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#eb4d4b"}
//                 >
//                     💥 Confirmer la suppression 🗑️
//                 </button>
//             </div>
//         </form>
//     );
// };
//
// export const Table2 = () => {
//     const [data, setData] = useState<any[]>(initialRows);
//
//     // Extraction de la logique de Log grâce au Hook personnalisé
//     const { logs, addLog } = useActivityLog();
//
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedRow, setSelectedRow] = useState<any>(null);
//     const [modalTitle, setModalTitle] = useState<string>("");
//
//     const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//     const [rowToDelete, setRowToDelete] = useState<any>(null);
//
//     const [gridVersion, setGridVersion] = useState<number>(0);
//     const [lastSubmittedData, setLastSubmittedData] = useState<any | null>(null);
//
//     const handleCellClick = (cell: ICell, row: any) => {
//         if (!row) {
//             addLog(`Clic sur une cellule non applicable (Pas de ligne associée)`);
//             return;
//         }
//
//         if (cell.column.name.toLowerCase() === "id") {
//             setRowToDelete(row);
//             setIsConfirmOpen(true);
//             addLog(`Demande de confirmation de suppression pour l'enregistrement #${row.id}`);
//             return;
//         }
//
//         setSelectedRow(row);
//         setModalTitle(`Édition de l'enregistrement #${row.id}`);
//         setIsModalOpen(true);
//         addLog(`Ouverture de la modale en mode ÉDITION pour la ligne ID: ${row.id}`);
//     };
//
//     const handleAddNewRow = () => {
//         const nextId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
//         const newEmptyRow = {
//             id: nextId,
//             lot: schema[1].items?.[0] || 1,
//             selection: false,
//             type_op: "" ,
//             depot: schema[3].items?.[0] || 100,
//             facture: schema[4].items?.[0] || "REG",
//             description: "",
//             periode: new Date()
//         };
//
//         setSelectedRow(newEmptyRow);
//         setModalTitle("Ajouter un nouvel enregistrement");
//         setIsModalOpen(true);
//         addLog(`Ouverture de la modale en mode CRÉATION (Futur ID: ${nextId})`);
//     };
//
//     const handleModalClose = (updatedObject: any | null) => {
//         setIsModalOpen(false);
//         if (updatedObject) {
//             setLastSubmittedData(updatedObject);
//             const targetId = Number(updatedObject.id);
//             const cleanObject = { ...updatedObject, id: targetId };
//             const index = data.findIndex(item => item.id === targetId);
//
//             if (index !== -1) {
//                 const newData = [...data];
//                 newData[index] = cleanObject;
//                 setData(newData);
//                 addLog(`Modale validée : Ligne ID ${targetId} mise à jour avec succès.`);
//             } else {
//                 setData([cleanObject, ...data]);
//                 addLog(`Modale validée : Nouvel enregistrement créé et inséré avec l'ID ${targetId}.`);
//             }
//             setGridVersion(prev => prev + 1);
//         } else {
//             addLog("Modale fermée : Action annulée par l'utilisateur.");
//         }
//     };
//
//     const handleConfirmClose = (confirmedObject: any | null) => {
//         setIsConfirmOpen(false);
//         if (confirmedObject && rowToDelete) {
//             const newData = data.filter(item => item.id !== rowToDelete.id);
//             setData(newData);
//             addLog(`🗑️ Suppression effectuée : Enregistrement #${rowToDelete.id} définitivement supprimé.`);
//             setGridVersion(prev => prev + 1);
//         } else {
//             addLog(`Suppression annulée.`);
//         }
//         setRowToDelete(null);
//     };
//
//     return (
//         <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//             <h2>Table2 — Vue Principale de l'application (maxRowCount = {maxRowCount})</h2>
//
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
//                 <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "6px", backgroundColor: "#f9f9f9" }}>
//                     <h4 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>📦 Dernier objet retourné par la modale :</h4>
//                     {lastSubmittedData ? (
//                         <pre style={{ margin: 0, background: "#fff", padding: "10px", borderRadius: "4px", border: "1px solid #ddd", fontSize: "12px" }}>
//                             {JSON.stringify(lastSubmittedData, null, 3)}
//                         </pre>
//                     ) : (
//                         <span style={{ color: "#7f8c8d", fontSize: "14px", fontStyle: "italic" }}>Aucun objet soumis pour le moment. Cliquez sur un bouton pour interagir.</span>
//                     )}
//                 </div>
//
//                 {/* 🚀 Utilisation de ton nouveau composant autonome extrait ! */}
//                 <ActivityLogger logs={logs} />
//             </div>
//
//             <div style={{ border: "1px solid #ddd", borderRadius: "6px", overflow: "hidden" }}>
//                 <TableViewMain
//                     key={gridVersion}
//                     title={"Test table 2"}
//                     initialData={data}
//                     config={tableConfig}
//                     onClick={handleCellClick}
//                     onAdd={handleAddNewRow}
//                 />
//             </div>
//
//             <FormModal
//                 isOpen={isModalOpen}
//                 title={modalTitle}
//                 initialData={selectedRow}
//                 formComponent={FormObject}
//                 onClose={handleModalClose}
//                 formConfig={tableConfig.fieldsDefinition}
//             />
//
//             <FormModal
//                 isOpen={isConfirmOpen}
//                 title="⚠️ Confirmation de suppression"
//                 initialData={rowToDelete}
//                 formComponent={ConfirmDeleteForm}
//                 onClose={handleConfirmClose}
//             />
//         </div>
//     );
// };