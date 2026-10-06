import {useEffect, useState} from "react";
import "../Form/form-modal.css";
import {ICell} from "../common/Cell";
import {TableViewMain, TableViewMainProps} from "./TableViewMain";
import {FormModal} from "../Form/FormModal";
import {FieldConfig, FormObject} from "../Form/FormObject";
import {helper, TypeProperty} from "../../common/Helper";
import {createCommandApi, createSqlApi, ISqlApi} from "../../api/Api";
import {createEmptyRowFromConfig, TableConfig} from "./TableConfig";
import {ColumnDefinition} from "../common/Column";
import {FormConfirmDelete} from "../Form/FormConfirmDelete";

export type EventManager = {
    // ---- add callback
    getNewObject?: (row: any) => void
    onAdding?: (row: any) => boolean
    onAdded?: (row: any) => void

    // ---- delete callback
    onDeleting?: (row: any) => boolean
    onDeleted?: (row: any) => void

    // ---- modify callback
    // onModifyng?: ( row: any, key: string, onEvent: (fd:FieldConfig)=>void ) => void
    onModifyng?: (row: any) => boolean
    onModified?: (row: any) => void
}

export type TableViewActionsMainProps = TableViewMainProps & {
    entity: string
    events?: EventManager
}

export const TableViewActionsMain = (props: TableViewActionsMainProps) => {
    const [data, setData] = useState<any[]>(props.initialData);

    // États pour la Modale d'Édition / Création
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [modalTitle, setModalTitle] = useState<string>("");

    // 🎯 États pour la Modale de Confirmation de Suppression
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<any>(null);

    // Compteur de version pour forcer la grille à reconstruire sa structure interne
    const [gridVersion, setGridVersion] = useState<number>(0);

    // États pour afficher les retours directement dans l'écran de la page
    const [lastSubmittedData, setLastSubmittedData] = useState<any | null>(null);
    const [logs, setLogs] = useState<string[]>([]);

    const [config,setConfig] = useState(props.config)

    const addLog = (message: string) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prevLogs => [`[${time}] ${message}`, ...prevLogs]);
    };

    const events = props.events;

    /**
     *
     */
    const createEmptyRow = () : any => {
        const res: any = createEmptyRowFromConfig(config)

        if (events && events.getNewObject)
            events.getNewObject(res)

        return res
    }

    // Action : Clic sur une cellule du tableau
    const handleUpdateRow = (cell: ICell, row: any) => {

        if (!row) {
            addLog(`Clic sur une cellule non applicable (Pas de ligne associée)`);
            return;
        }

        if (events && events.onModifyng)
            events.onModifyng(row)

        // Comportement classique : Édition
        setSelectedRow(row);
        setModalTitle(`Édition de l'enregistrement #${row.ID}`);
        setIsModalOpen(true);
        addLog(`Ouverture de la modale en mode ÉDITION pour la ligne ID: ${row.ID}`);
    };

    // Action : Clic sur le bouton Ajouter
    const handleAddRow = () => {

        // const nextId = data.length > 0 ? Math.max(...data.map(item => item.ID)) + 1 : 1;
        const newObject = createEmptyRow()

        if (newObject === null)
            return

        if (events && events.onAdding)
            events.onAdding(newObject)

        setSelectedRow(newObject);
        setModalTitle("Ajouter un nouvel enregistrement");
        setIsModalOpen(true);
        addLog(`Ouverture de la modale en mode CRÉATION`);
    }

    // suppression d'un ro
    const handleDeleteRow = (row: object) => {
        if (events && events.onDeleting)
            events.onDeleting(row)

        setRowToDelete(row)
        setIsConfirmOpen(true)
    }

    // Traitement à la fermeture de la modale d'édition
    const handleUpsertModalClose = (updatedObject: any | null) => {
        setIsModalOpen(false);

        if (updatedObject) {

            // est-on en mode insert ou update ?
            // => l'ID de l'objet est valorisé si upate
            setLastSubmittedData(updatedObject);

            // add
            if (isNaN(updatedObject.ID)) {

                // creation de l'objet de commandSql
                const comSql = createCommandApi(props.entity)

                comSql.insert(updatedObject)
                    .then(result => {
                        const newData = [result.data.data, ...data]
                        setData(newData)
                        setGridVersion(prev => prev + 1);

                        if (events && events.onAdded)
                            events.onAdded(result.data.data)
                    })


            } else
            // update
            {
                const targetId = Number(updatedObject.ID);
                const cleanObject = { ...updatedObject };
                const index = data.findIndex(item => item.ID === targetId);

                if (index !== -1) {
                    // creation de l'objet de commandSql
                    const comSql = createCommandApi(props.entity)

                    comSql.update(cleanObject)
                        .then(()=>{
                            // update de l'objet
                            const newData = [...data];
                            newData[index] = cleanObject;
                            setData(newData);
                            setGridVersion(prev => prev + 1);

                            if (events && events.onModified)
                                events.onModified(updatedObject)
                        })
                }
            }
        } else {
            addLog("Modale fermée : Action annulée par l'utilisateur.");
        }
    };

    // Traitement à la fermeture de la modale de suppression
    const handleDeleteModalClose = (objectToDelete: any | null) => {

        setIsConfirmOpen(false);

        if (objectToDelete) {
            const comSql = createCommandApi(props.entity)

            comSql.delete(objectToDelete.ID)
                .then(()=>{
                    const newData = data.filter(item => item.ID !== objectToDelete.ID);

                    setData(newData);
                    setGridVersion(prev => prev + 1);

                    if (events && events.onDeleted)
                        events.onDeleted(objectToDelete);
                })
        }
     };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>

            {/* Composant Grid Tableau */}
            <div style={{ border: "1px solid #ddd", borderRadius: "6px", overflow: "hidden" }}>
                <TableViewMain
                    {...props}
                    key={gridVersion}
                    title={props.title}
                    initialData={data}
                    config={config}
                    canDeleteRow={props.canDeleteRow}
                    onClick={handleUpdateRow}
                    onAdd={handleAddRow}
                    onDeleteRow={handleDeleteRow}
                />
            </div>

            {/* Modale standard d'Édition / Création */}
            <FormModal
                isOpen={isModalOpen}
                title={modalTitle}
                initialData={selectedRow}
                formComponent={FormObject}
                onClose={handleUpsertModalClose}
                formConfig={config.fieldsDefinition}
            />

            {/* 🎯 Nouvelle Modale : Boîte de dialogue de Confirmation de Suppression au même look */}
            <FormModal
                isOpen={isConfirmOpen}
                title="⚠️ Confirmation de suppression"
                initialData={rowToDelete}
                formComponent={FormConfirmDelete}
                onClose={handleDeleteModalClose}
            />
        </div>
    );
};






// switch (helper.getTypeProperty(c)) {
//     case TypeProperty.id:
//         break;
//     case TypeProperty.foreignKey:
//     case TypeProperty.enumValues:
//         const fdrec = config && config.fieldsDefinition
//         const fd = fdrec && fdrec[c]
//         const sel = fd && fd.options
//         const opt = sel && sel[0]
//         const option = opt && opt.value
//         res[c] = option
//         break;
//     case TypeProperty.date:
//         res[c] = null
//         break;
//     case TypeProperty.standard:
//         res[c] = null
//         break;
// }
// const updateFieldDef = (colName: string, newFieldDef: FieldConfig) => {
//     setConfig((lastConfig) => {
//
//         const newConfig: TableConfig = {
//             ...lastConfig,
//             fieldsDefinition: {
//                 ...lastConfig.fieldsDefinition,
//                 [colName]: {
//                     ...(lastConfig.fieldsDefinition && lastConfig.fieldsDefinition[colName]),
//                     ...newFieldDef
//                 }
//             }
//         }
//         // console.log(colName, newConfig)
//         return newConfig
//     })
// }
// const updateColDef = (colName: string, newColDef: Partial<ColumnDefinition>) => {
//     setConfig((lastConfig) => {
//
//         const newConfig: TableConfig = {
//             ...lastConfig,
//             columnsDefinition: {
//                 ...lastConfig.columnsDefinition,
//                 [colName]: {
//                     ...lastConfig.columnsDefinition[colName],
//                     ...newColDef,
//                 }
//             }
//         }
//         // console.log(colName, newConfig)
//         return newConfig
//     })
// }
//
// useEffect(() => {
//     // on chercher les lists de fk et les placer dans la config
//     // la config est complete des noms de colonnes à ce stade
//     props.config.allColumns.forEach((c:string)=>{
//
//         const label: string = helper.convertToLabel(c)
//
//         switch (helper.getTypeProperty(c)) {
//
//             case TypeProperty.id : {
//                 updateColDef(c, {
//                     label: "#"
//                 })
//                 // rendre la saisie impossible
//                 updateFieldDef(c, {
//                     disabled: true,
//                 })
//                 break
//             }
//
//             case  TypeProperty.date : {
//                 updateColDef(c,{
//                     dataType: "date",
//                     mask: "DD-MM-YY",
//                     label
//                 })
//                 updateFieldDef(c,{
//                     type: "date",
//                     label
//                 })
//                 break
//             }
//
//             case TypeProperty.foreignKey : {
//                 // fk colonne ==> on va chercher le tableau de mapping id<=>libellé
//                 const sqlApi: ISqlApi = createSqlApi("lists")
//
//                 sqlApi.getById(c).then(result => {
//                     updateFieldDef(c,{
//                         type: "select",
//                         options: result.data.data,
//                         multiple: false,
//                         label
//                     })
//                     updateColDef(c,{
//                         label
//                     })
//                 })
//                 break;
//             }
//
//             case TypeProperty.enumValues:
//                 const sqlApi: ISqlApi = createSqlApi("enums")
//
//                 sqlApi.getById(c).then(result => {
//                     updateFieldDef(c,{
//                         type: "select",
//                         options: result.data.data,
//                         multiple: false,
//                         label
//                     })
//                     updateColDef(c,{
//                         label
//                     })
//                 })
//                 break
//
//             case TypeProperty.standard :
//                 updateColDef(c,{
//                     label
//                 })
//                 updateFieldDef(c,{
//                     label
//                 })
//                 break
//         }
//     })
// },[])
