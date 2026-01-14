import React, { useState, DragEvent, FC, ReactElement } from 'react';
import { Zone } from "./Zone";
import './tcdConfStyles.css';
import {TcdConfig, TcdSortOrder} from "./TcdConfig";
import {FuncObject} from "../functionsGroup";

interface TcdConfPanelProps {
    // allColumns: string[];
    config: TcdConfig;
    tcdData: any[];
    onApply: (config: TcdConfig) => void;
    onCancel: () => void;
}

export const TcdConfPanel: FC<TcdConfPanelProps> = ({
                                                        config,
                                                        tcdData,
                                                        onApply,
                                                        onCancel
                                                    }): ReactElement => {
    const [rows, setRows] = useState<string[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [measures, setMeasures] = useState<string[]>([]);
    const [filtersColumns, setFiltersColumns] = useState<string[]>([]);
    const [filtersValues, setFiltersValues] = useState<Record<string, string[]>>({});
    const [sorts, setSorts] = useState<Record<string, TcdSortOrder>>({});
    const [funcObjects, setFuncObjects] = useState<Record<string, FuncObject>>({});
    const [columnOptions, setColumnOptions] = useState<TcdConfig['options']>({});

    const updateColumnOption = (colName: string, key: string, value: any) => {
        setColumnOptions(prev => ({
            ...prev,
            [colName]: { ...prev[colName], [key]: value }
        }));
    }

    const updateGroupByFunc = (colName: string, func: FuncObject): void => {
        setFuncObjects(prev => ({ ...prev, [colName]: func }));
    };

    /** Initialisation du Drag */
    const onDragStart = (e: DragEvent<HTMLDivElement>, name: string): void => {
        e.dataTransfer.setData("columnName", name);
    };

    /** Supprime une colonne de toutes les zones actives */
    const removeFromAll = (name: string): void => {
        const filterFn = (prev: string[]): string[] => prev.filter((c: string) => c !== name);
        setRows(filterFn);
        setColumns(filterFn);
        setMeasures(filterFn);
        setFiltersColumns(filterFn);
    };

    /** Gestion du Drop avec calcul de l'index d'insertion */
    const handleDrop = (e: DragEvent<HTMLDivElement>, zone: 'rows' | 'cols' | 'measures' | 'pool' | 'filters'): void => {
        e.preventDefault();
        const name: string = e.dataTransfer.getData("columnName");
        const col: string | undefined = config.allColumns.find((c: string) => c === name);

        if (!col) return;

        // Calcul de l'index selon la position Y de la souris parmi les enfants
        const target = e.currentTarget as HTMLDivElement;
        const children = Array.from(target.querySelectorAll('.tcd-conf-card'));
        let insertIndex: number = children.length;

        for (let i = 0; i < children.length; i++) {
            const rect: DOMRect = children[i].getBoundingClientRect();
            const midPoint: number = rect.top + rect.height / 2;
            if (e.clientY < midPoint) {
                insertIndex = i;
                break;
            }
        }

        removeFromAll(name);

        const insertAt = (prev: string[]): string[] => {
            const next = [...prev];
            next.splice(insertIndex, 0, col);
            return next;
        };

        if (zone === 'rows') setRows(insertAt);
        else if (zone === 'cols') setColumns(insertAt);
        else if (zone === 'measures') setMeasures(insertAt);
        else if (zone === 'filters') setFiltersColumns(insertAt);
    };

    /** Toggle des valeurs de filtres */
    const toggleFilterValue = (colName: string, value: string): void => {
        setFiltersValues((prev: Record<string, string[]>) => {
            const current: string[] = prev[colName] || [];
            const next: string[] = current.includes(value)
                ? current.filter((v: string) => v !== value)
                : [...current, value];
            return { ...prev, [colName]: next };
        });
    };

    /** Cycle de tri: ASC -> DESC -> NULL */
    const toggleSort = (colName: string): void => {
        setSorts((prev: Record<string, TcdSortOrder>) => {
            const current: TcdSortOrder = prev[colName];
            let next: TcdSortOrder = 'ASC';
            if (current === 'ASC') next = 'DESC';
            else if (current === 'DESC') next = null;
            return { ...prev, [colName]: next };
        });
    };

    return (
        <div className="tcd-modal-overlay">
            <div className="tcd-modal-content">
                <div className="tcd-conf-header-compact">
                    <div className="tcd-conf-title-group">
                        <span className="tcd-conf-icon-main">⚙️</span>
                        <h3>Configuration du Pivot</h3>
                    </div>
                    <div className="tcd-conf-actions">
                        <button type="button" className="btn-cancel" onClick={onCancel}>Annuler</button>
                        <button type="button" className="btn-apply-elegant"
                                onClick={() => onApply({
                                    allColumns: config.allColumns,
                                    rows: rows,
                                    columns: columns,
                                    measures: measures,
                                    filters_values: filtersValues,
                                    filters: filtersColumns,
                                    sorts: sorts,
                                    groupByFuncs: funcObjects,
                                    options: columnOptions
                                })}>
                            Appliquer
                        </button>
                    </div>
                </div>

                <div className="tcd-conf-content">
                    <section className="tcd-conf-pool-section">
                        <span className="tcd-conf-label-zone">Champs disponibles</span>
                        <div className="tcd-conf-pool"
                             onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                             onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e, 'pool')}>
                            {config.allColumns.map((col: string) => (
                                <div key={col} draggable
                                     onDragStart={(e: DragEvent<HTMLDivElement>) => onDragStart(e, col)}
                                     className="tcd-conf-card">
                                    <span className="drag-handle">⠿</span>
                                    <span className="col-label-text">{col}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="tcd-conf-drop-grid">
                        <Zone title="Filtres" colorClass="z-filter" fields={filtersColumns}
                              onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e, 'filters')}
                              onRemove={removeFromAll} onDragStart={onDragStart}
                              tcdData={tcdData} filters={filtersValues} onFilter={toggleFilterValue}
                              sorts={sorts} onSort={toggleSort}
                              columnOptions={columnOptions}
                              onUpdateOption={updateColumnOption}
                        />

                        <Zone title="Colonnes" colorClass="z-cols" fields={columns}
                              onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e, 'cols')}
                              onRemove={removeFromAll} onDragStart={onDragStart}
                              tcdData={tcdData} filters={filtersValues} onFilter={toggleFilterValue}
                              sorts={sorts} onSort={toggleSort}
                              columnOptions={columnOptions}
                              onUpdateOption={updateColumnOption}
                        />

                        <Zone title="Lignes" colorClass="z-rows" fields={rows}
                              onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e, 'rows')}
                              onRemove={removeFromAll} onDragStart={onDragStart}
                              tcdData={tcdData} filters={filtersValues} onFilter={toggleFilterValue}
                              sorts={sorts} onSort={toggleSort}
                              columnOptions={columnOptions}
                              onUpdateOption={updateColumnOption}
                        />

                        <Zone title="Valeurs (Σ)"
                              colorClass="z-measures"
                              fields={measures}
                              onDrop={e => handleDrop(e, 'measures')}
                              onRemove={removeFromAll}
                              onDragStart={onDragStart}
                              groupByFuncs={funcObjects}
                              onUpdateGroupByFunc={updateGroupByFunc}
                              columnOptions={columnOptions}
                              onUpdateOption={updateColumnOption}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};