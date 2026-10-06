 import { TableConfig } from "./TableConfig";
import {createColumn, IColumn, SortOrder} from "../common/Column";

export interface ITableManager<T = any> {
    initialData: T[];
    data: T[];
    allColumns: IColumn[];
    columns: IColumn[];
    leftFixedColumns: number;
    config: TableConfig | null; // Exposition de la configuration courante
    // list: SelectOption<number>[] | null

    buildTable(data: T[], config: TableConfig): void;
    rowAt(rowIndex: number): T | null;

    /** Alterne ou ajoute un critère de tri sur une colonne */
    toggleSort(columnName: string, multiSort: boolean): void;
}

export class _TableManager<T> implements ITableManager<T> {

    private _initialData: T[];
    private _allColumns: IColumn[];
    private _columns: IColumn[];
    private _data: T[];
    private _leftFixedColumns: number;
    private _config: TableConfig | null = null;
    private readonly _elementId: string;

    public get initialData(): T[] { return this._initialData; }
    public get data(): T[] { return this._data; }
    public get allColumns(): IColumn[] { return this._allColumns; }
    public get columns(): IColumn[] { return this._columns; }
    public get leftFixedColumns(): number { return this._leftFixedColumns; }
    public get config(): TableConfig | null { return this._config; }
    // public get list(): SelectOption<number>[] | null { return }

    public constructor(elementId: string = "") {
        this._data = [];
        this._initialData = [];
        this._elementId = elementId;
        this._allColumns = [];
        this._columns = [];
        this._leftFixedColumns = 0;
    }

    public buildTable(data: T[], config: TableConfig) {
        this._config = config;
        this._initialData = [...data];
        this._data = [...data];

        this._allColumns = [];
        config.allColumns.forEach(colName => {
            const col: IColumn = createColumn(
                colName,
                60,
                config.columnsDefinition[colName],
                config.fieldsDefinition && config.fieldsDefinition[colName]
            );
            this._allColumns.push(col);
        });

        this._columns = [];
        config.columns.forEach(column => {
            const index = this._allColumns.findIndex((col: IColumn) => col.name === column);
            if (index >= 0) {
                this._columns.push(this._allColumns[index]);
            }
        });

        this.sortAndFilter(this._config);
    }

    public rowAt(rowIndex: number): T | null {
        if (rowIndex < this._data.length) {
            return this._data[rowIndex];
        }
        return null;
    }

    /**
     * Alterne le tri selon le cycle : inexistant -> ASC -> DESC -> inexistant
     * @param columnName Nom de la colonne cible
     * @param multiSort Vrai si la touche Shift est enfoncée (conserve les tris précédents)
     */
    public toggleSort(columnName: string, multiSort: boolean): void {
        if (!this._config) return;

        // Initialisation de l'objet de tri si manquant
        const currentSorts: Record<string, SortOrder> = { ...(this._config.sorts || {}) };
        const currentOrder = currentSorts[columnName];
        let nextOrder: SortOrder | undefined = undefined;

        // Cycle de tri : ASC -> DESC -> Supprimé
        if (!currentOrder) {
            nextOrder = "ASC";
        } else if (currentOrder === "ASC") {
            nextOrder = "DESC";
        } // Si c'était "DESC", nextOrder reste undefined (suppression du tri sur cette colonne)

        if (!multiSort) {
            // Tri mono-colonne : on nettoie tous les autres tris actifs
            Object.keys(currentSorts).forEach(key => delete currentSorts[key]);
        }

        if (nextOrder) {
            currentSorts[columnName] = nextOrder;
        } else {
            delete currentSorts[columnName];
        }

        // Mutation de la configuration et exécution du traitement de tri
        this._config.sorts = currentSorts;
        this.sortAndFilter(this._config);
    }

    private sortAndFilter(config: TableConfig): void {
        const sortValues: Record<string, SortOrder> | undefined = config.sorts;
        const cols: string[] | undefined = (sortValues && Object.keys(sortValues)) || undefined;
        const filter: string | undefined = config.filter;

        // 1. Reset à partir de la donnée source originale
        this._data = [...this._initialData];

        // 2. Application du filtre textuel global
        if (filter !== undefined && filter !== "") {
            const re = new RegExp(filter, 'i');
            const tmp: T[] = this._data.filter((row: T) => {
                let isValid: boolean = false;

                for (const c of this.allColumns) {
                    const value: any = row[c.name as keyof T];
                    if (value) {
                        const valueStr: string = value.toString();
                        if (re.test(valueStr)) {
                            isValid = true;
                            break;
                        }
                    }
                }
                return isValid;
            });
            this._data = [...tmp];
        }

        // 3. Application du tri multi-colonne en cascade
        // console.log(new Date())
        if (cols !== undefined && sortValues !== undefined && cols.length > 0) {
            this._data.sort((item1: T, item2: T) => {
                for (let i = 0; i < cols.length; i++) {
                    const colName: keyof T = cols[i] as keyof T;
                    const v1 = item1[colName];
                    const v2 = item2[colName];
                    const s: SortOrder = sortValues[cols[i]];

                    if (v1 === v2) continue; // Si égalité sur ce niveau, on passe à la colonne de tri suivante

                    if (s === "ASC") {
                        if (v1 > v2) return 1;
                        if (v1 < v2) return -1;
                    } else {
                        if (v1 < v2) return 1;
                        if (v1 > v2) return -1;
                    }
                }
                return 0;
            });
        }
        // console.log(new Date())

    }
}

export function createTableManager<T = any>(): ITableManager<T> {
    return new _TableManager<T>();
}