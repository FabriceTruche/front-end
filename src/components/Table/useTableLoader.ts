import { useState, useEffect } from 'react';
import {createConfigFromMetadata, TableConfig} from "./TableConfig";
import {createSqlApi, ISqlApi} from "../../api/Api";
import {MetaData, MetaDataItem} from "../../common/SharedFrontBack";

/**
 *
 * @param entityName
 */
export const useTableLoader = (entityName: string) => {
    const [data, setData] = useState<any[]>([]);
    const [config, setConfig] = useState<TableConfig | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // ou string | null

    useEffect(() => {
        const api: ISqlApi = createSqlApi(entityName)

        setLoading(true);
        api.getAll()
            .then(response => {
                const md: MetaData = response.data.metadata
                const data = response.data.data

                setData(data);
                createConfigFromMetadata(md)
                    .then((config: TableConfig)=>{
                        setConfig(config);
                    })
                    .catch((error: any) => {
                        setError(`Erreur création configuration à partir des metadata : ${error.stack}`);
                    })
                    .finally(() => {
                        setLoading(false)
                    });
            })
            .catch((error: any) => {
                setError(`Erreur ${error.status} : ${error.message}`)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [entityName])

    return {data, config, loading, error}
}
