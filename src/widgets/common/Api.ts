// types/api.ts
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

