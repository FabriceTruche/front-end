import { ITableManager } from "./TableManager";
import { _defaultRect, Rect } from "../common/Rect";
import { ICell, TypeCell } from "../common/Cell";
import { IColumn } from "../common/Column";
import {_GridViewManager, IGridViewManager} from "../common/GridViewManager";

export interface ITableViewManager<T> extends IGridViewManager {
    // ---- from IGridViewManager
    maxY: number;
    cells: ICell[];
    columnsWidth: number[];

    headerCells: ICell[];
    bodyCells: ICell[];
    footerCells: ICell[];
    coordTable: Rect;
    coordHeader: Rect;
    coordBody: Rect;
    coordFooter: Rect;
    buildTableView(tableManager: ITableManager<T>): void;
}

class _TableViewManager<T> extends _GridViewManager implements ITableViewManager<T> {

    private _headerCells: ICell[] = [];
    private _bodyCells: ICell[] = [];
    private _footerCells: ICell[] = [];
    private _coordTable: Rect = _defaultRect;
    private _coordHeader: Rect = _defaultRect;
    private _coordBody: Rect = _defaultRect;
    private _coordFooter: Rect = _defaultRect;
    // private _columnsWidth: number[] = [];
    // private _cellsMap: Map<number,ICell[]> = new Map();
    // private _maxY: number = 0

    public get headerCells(): ICell[] { return this._headerCells; }
    public get bodyCells(): ICell[] { return this._bodyCells; }
    public get footerCells(): ICell[] { return this._footerCells; }
    public get coordTable(): Rect { return this._coordTable; }
    public get coordHeader(): Rect { return this._coordHeader; }
    public get coordBody(): Rect { return this._coordBody; }
    public get coordFooter(): Rect { return this._coordFooter; }
    // public get columnsWidth(): number[] { return this._columnsWidth; }
    // public get maxY(): number { return this._maxY; }

    public get cells(): ICell[] {
        return [
            ...this._headerCells,
            ...this._bodyCells,
            ...this._footerCells
        ];
    }

    private reset() {
        this._headerCells = [];
        this._bodyCells = [];
        this._footerCells = [];
        // this._cellsMap.clear();
        // this._columnsWidth = []; // Correction : Penser à vider les largeurs à chaque reconstruction
        this._maxY = 0
        this._coordHeader = _defaultRect;
        this._coordBody = _defaultRect;
        this._coordFooter = _defaultRect;
    }

    private calculateCells(tm: ITableManager<T>): void {
        const activeSorts = tm.config?.sorts || {};

        // console.log(new Date(),200)

        // 1. Génération des cellules d'en-tête (Header) avec métadonnées de tri
        this._headerCells = tm.columns.map((column: IColumn, index: number) => {
            const rect: Rect = {
                x: this.coordHeader.x + index,
                y: this.coordHeader.y,
                xSpan: 1,
                ySpan: 1,
            };

            const cell = this.registerCell(
                TypeCell.header,
                rect,
                column.label,
                column,
                true
            );

            // Extension dynamique de l'objet Cellule pour transporter les informations de tri vers le DOM/Rendu
            const currentSort = activeSorts[column.name];
            if (currentSort) {
                (cell as any).sortOrder = currentSort;
                // Optionnel : indique la priorité du tri multicolonne (ex: index 1 pour le premier tri, 2 pour le second)
                (cell as any).sortPriority = Object.keys(activeSorts).indexOf(column.name) + 1;
            }

            return cell;
        });

        // console.log(new Date(),201)

        // 2. Génération des cellules du corps (Body)
        for (let i = 0; i < tm.data.length; i++) {
            const row: any = tm.data[i];

            tm.columns.forEach((column: IColumn, index: number) => {
                const rect: Rect = {
                    x: this._coordBody.x + index,
                    y: this._coordBody.y + i,
                    xSpan: 1,
                    ySpan: 1,
                };

                this._bodyCells.push(this.registerCell(
                    TypeCell.body,
                    rect,
                    row[column.name],
                    column,
                    false
                ));
            });
        }

        // console.log(new Date(),202)

        // 3. Génération des cellules de pied de page (Footer / Totaux)
        tm.columns.forEach((column: IColumn, index: number) => {
            if (column.total) {
                const rect: Rect = {
                    x: this._coordFooter.x + index,
                    y: this._coordFooter.y,
                    xSpan: 1,
                    ySpan: 1,
                };

                const total: number = tm.data.reduce((acc: number, row: T): number => {
                    const cellValue: any = row[column.name as keyof T];
                    if (typeof cellValue === "number") {
                        return acc + cellValue;
                    }
                    return 0;
                }, 0);

                this._footerCells.push(this.registerCell(
                    TypeCell.footer,
                    rect,
                    total,
                    column,
                    false
                ));
            }
        });
    }

    private calculateOrigins(tm: ITableManager<T>) {
        this._coordHeader = {
            x: this._coordTable.x,
            y: this._coordTable.y,
            xSpan: 1,
            ySpan: 1
        };

        this._coordBody = {
            x: this._coordTable.x,
            y: this._coordTable.y + 1,
            xSpan: 1,
            ySpan: 1
        };

        this._coordFooter = {
            x: this._coordTable.x,
            y: this._coordTable.y + 1 + tm.data.length,
            xSpan: 1,
            ySpan: 1
        };
    }

    // private calculateColumnsWidth(tm: ITableManager<T>) {
    //     tm.columns.forEach((c: IColumn) => {
    //         this._columnsWidth.push(c.width);
    //     });
    // }

    public buildTableView(tm: ITableManager<T>): void {
        // console.log(new Date(),100)
        this.reset();
        // console.log(new Date(),101)
        this.calculateOrigins(tm);
        // console.log(new Date(),102)
        this.calculateCells(tm);
        // console.log(new Date(),103)
    }

    // public getCellsFromRow(y: number): ICell[]|undefined {
    //     return this._cellsMap.get(y)
    // }

}

export function createTableViewManager<T = any>(): ITableViewManager<T> {
    return new _TableViewManager<T>();
}