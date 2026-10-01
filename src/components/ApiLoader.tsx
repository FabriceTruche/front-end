// components/ApiLoader.tsx
import React, {useState, useEffect, JSX} from 'react';
import {createSqlApi, ISqlApi, MetaData} from "../../model/Api";

export interface ApiResponse<TData = any, TConfig = any> {
    data: TData[];
    metadata: TConfig;
    // [key: string]: any; // Pour d'autres propriétés éventuelles dans le payload
}

export interface GenericTableLoaderProps<TData = any, TMetadata = any> {
    entity: string;
    // Fonction de rendu (similaire à un morceau de HTML/JSX) qui reçoit les données et la config prêtes à l'emploi
    children: (data: TData[], config: TMetadata) => React.ReactNode;
    // Messages personnalisables optionnels
    loadingMessage?: string;
}

export const ApiLoader = <TData = any, TMetadata = MetaData>({
                                                          entity,
                                                          children,
                                                          loadingMessage = "Chargement...",
                                                      }: GenericTableLoaderProps<TData, TMetadata>): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [payload, setPayload] = useState<ApiResponse<TData, TMetadata> | null>(null);

    useEffect( () => {
        const fecthData = async () => {
            try {
                // nom de l'entity en position 2
                const api: ISqlApi = createSqlApi(entity)

                setLoading(true);
                const response = await api.getAll()
                // console.log(2, response);

                setPayload(response.data);
            } catch (err: any) {
                setError(err.message || "Erreur de chargement");
            } finally {
                setLoading(false);
            }
        }

        fecthData();
    }, [entity])

    if (loading) return <div>{loadingMessage}</div>
    if (error) return <div>{error}</div>
    if (!payload) return <div>Aucune donnée disponible.</div>

    // On délègue l'affichage au fragment HTML/JSX passé en enfant via une fonction
    return <>{children(payload.data, payload.metadata)}</>;
};




// useEffect(() => {
//     try {
//             setLoading(true);
//             const response: AxiosResponse = await getData()
//
//             // 1. Récupération du texte brut de la réponse
//             const rawText = await response.text();
//
//             // 2. Parsing automatique des dates ISO en objets Date
//             const result: ApiResponse<TData, TConfig> = helper.parseIsoDatesToObjects(rawText);
//
//             // const result: ApiResponse<TData, TConfig> = await response.json();
//             // console.log(1,rawText);
//             console.log(2,result);
//
//             setPayload(result);
//         } catch (err: any) {
//             setError(err.message || "Erreur de chargement");
//         } finally {
//             setLoading(false);
//         }
//
//     if (url) {
//         fetchData();
//     }
// }, [url]);
// 2. Parsing automatique des dates ISO en objets Date
// const result: ApiResponse<TData, TConfig> = helper.parseIsoDatesToObjects(response.data);

// const result: ApiResponse<TData, TConfig> = await response.json();
// console.log(1,rawText);
