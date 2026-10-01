// components/Table4.tsx
import React from 'react';
import {createConfigFromMetadata, TableConfig} from "../../widgets/Table/TableConfig";
import {EventManager, TableViewActionsMain} from "../../widgets/Table/component/TableViewActionsMain";
import "../../containers/Form/form-modal.css";
import {ApiLoader} from "../../widgets/common/ApiLoader";
import {MetaData} from "../../model/Api";

// const entityName = "contrat"
// const columns: string[] = ["ID","Nom","DateEntree","DateSortie","Locataire_ID","typeContrat","LotEnLocation_ID"]
const events : EventManager = {
    getNewObject: (row: any) => {
        // date d'entrée & date d'entrée prévi init au jour
        // row["DateEntree"]=new Date()
        // row["DateEntreePrevue"]=new Date()
    }
}

export const Table4 = (entityName:string) => {
    return (
        <ApiLoader<any, MetaData> entity={entityName}>
            {(data, metadata) => {
                // Construction de la configuration de la table spécifique à ce composant si besoin
                const tc: TableConfig = createConfigFromMetadata(metadata)
                // tc.columns = columns;

                return (
                    <div>
                        <TableViewActionsMain
                            title={`Liste des ${entityName}s`}
                            entity={entityName}
                            initialData={data}
                            config={tc}
                            canDeleteRow={true}
                            events={events}
                        />
                    </div>
                );
            }}
        </ApiLoader>
    );
};

// import {helper, TypeProperty} from "../../common/Helper";
// import {createSqlApi, MetaData, MetaDataItem} from "../../model/Api";
// import {FieldConfig} from "../../containers/Form/FormObject";
//
// const url="http://localhost:3001/api/v1/contrats/"
// const url="contrat"
// DateEntree: {
//     dataType: "date",
//     mask: "DD-MM-YYYY",
//     label: "Date d'entrée"
// },
// DateSortie: {
//     dataType: "date",
//     mask: "DD-MM-YYYY",
//     label: "Date de sortie"
// },
// DateEntree: {
//     type: "date",
// },
// DateSortie: {
//     type: "date",
//     label: "Date de sortie",
// },
// ID: {
//     disabled: true
// }
// ID: {
//     label: "Numéro"
// }
// Nom: {
//     label: "Nom du contrat"
// },
// tc.columnsDefinition["PatternReleve"].visible=false
// tc.columnsDefinition["DateEntreePrevue"].visible=false
// tc.columnsDefinition["DateSortiePrevue"].visible=false

// const tableConfig: TableConfig = {
//     allColumns: [],
//     columns: ["ID","Nom","PatternReleve","DateEntree","DateSortie","Locataire_ID","typeContrat","LotEnLocation_ID"],
//     sorts: {},
//     columnsDefinition: {},
// };
/**
 *     onModified: (row: any) => {
 *         console.log("onModified",row)
 *     },
 *
 *     onAdding: (row: any) => {
 *         return true
 *     },
 *
 *     onAdded: (row: any) => {
 *         console.log("onAdded",row)
 *     },
 *
 *     onDeleting: (row: any) => {
 *         console.log("onDeleting",row)
 *         return true
 *     },
 *
 *     onDeleted: (row: any) => {
 *         console.log("onDeleted",row)
 *     },
 */