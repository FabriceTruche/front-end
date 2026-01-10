import React, { useState, DragEvent, FC, ReactElement } from 'react';
import { ITcdColumn } from "../TcdColumn";
import { Zone } from "./Zone";
import './tcdConfStyles.css';
// Ajoutez GroupByFuncNames aux imports si nécessaire
import { GroupByFuncNames } from './GroupByFunc';

/** Types pour le tri */
export type TcdSortOrder = 'ASC' | 'DESC' | null;

/** État de configuration complet */
export interface ITcdConfigState {
    rows: ITcdColumn[];
    columns: ITcdColumn[];
    measures: ITcdColumn[];
    filters_columns: ITcdColumn[];
    filters: Record<string, string[]>;
    sorts: Record<string, TcdSortOrder>;
    // Ajout du dictionnaire pour les fonctions de groupe
    groupByFuncs: Record<string, GroupByFuncNames>;
}

interface TcdConfPanelProps {
    allColumns: ITcdColumn[];
    tcdData: any[];
    onApply: (config: ITcdConfigState) => void;
    onCancel: () => void;
}

export const TcdConfPanel: FC<TcdConfPanelProps> = ({
                                                        allColumns,
                                                        tcdData,
                                                        onApply,
                                                        onCancel
                                                    }): ReactElement => {
    const [rows, setRows] = useState<ITcdColumn[]>([]);
    const [columns, setColumns] = useState<ITcdColumn[]>([]);
    const [measures, setMeasures] = useState<ITcdColumn[]>([]);
    const [filters_columns, setFilters_columns] = useState<ITcdColumn[]>([]);
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [sorts, setSorts] = useState<Record<string, TcdSortOrder>>({});
    const [groupByFuncs, setGroupByFuncs] = useState<Record<string, GroupByFuncNames>>({});

    const updateGroupByFunc = (colName: string, func: GroupByFuncNames): void => {
        setGroupByFuncs(prev => ({ ...prev, [colName]: func }));
    };

    /** Initialisation du Drag */
    const onDragStart = (e: DragEvent<HTMLDivElement>, name: string): void => {
        e.dataTransfer.setData("columnName", name);
    };

    /** Supprime une colonne de toutes les zones actives */
    const removeFromAll = (name: string): void => {
        const filterFn = (prev: ITcdColumn[]): ITcdColumn[] => prev.filter((c: ITcdColumn) => c.name !== name);
        setRows(filterFn);
        setColumns(filterFn);
        setMeasures(filterFn);
        setFilters_columns(filterFn);
    };

    /** Gestion du Drop avec calcul de l'index d'insertion */
    const handleDrop = (e: DragEvent<HTMLDivElement>, zone: 'rows' | 'cols' | 'measures' | 'pool' | 'filters'): void => {
        e.preventDefault();
        const name: string = e.dataTransfer.getData("columnName");
        const col: ITcdColumn | undefined = allColumns.find((c: ITcdColumn) => c.name === name);

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

        const insertAt = (prev: ITcdColumn[]): ITcdColumn[] => {
            const next = [...prev];
            next.splice(insertIndex, 0, col);
            return next;
        };

        if (zone === 'rows') setRows(insertAt);
        else if (zone === 'cols') setColumns(insertAt);
        else if (zone === 'measures') setMeasures(insertAt);
        else if (zone === 'filters') setFilters_columns(insertAt);
    };

    /** Toggle des valeurs de filtres */
    const toggleFilterValue = (colName: string, value: string): void => {
        setFilters((prev: Record<string, string[]>) => {
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
                                onClick={() => onApply({ rows, columns, measures, filters, filters_columns, sorts, groupByFuncs })}>
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
                            {allColumns.map((col: ITcdColumn) => (
                                <div key={col.name} draggable
                                     onDragStart={(e: DragEvent<HTMLDivElement>) => onDragStart(e, col.name)}
                                     className="tcd-conf-card">
                                    <span className="drag-handle">⠿</span>
                                    <span className="col-label-text">{col.label || col.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="tcd-conf-drop-grid">
                        <Zone title="Filtres" colorClass="z-filter" fields={filters_columns}
                              onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e, 'filters')}
                              onRemove={removeFromAll} onDragStart={onDragStart}
                              tcdData={tcdData} filters={filters} onFilter={toggleFilterValue}
                              sorts={sorts} onSort={toggleSort} />

                        <Zone title="Colonnes" colorClass="z-cols" fields={columns}
                              onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e, 'cols')}
                              onRemove={removeFromAll} onDragStart={onDragStart}
                              tcdData={tcdData} filters={filters} onFilter={toggleFilterValue}
                              sorts={sorts} onSort={toggleSort} />

                        <Zone title="Lignes" colorClass="z-rows" fields={rows}
                              onDrop={(e: DragEvent<HTMLDivElement>) => handleDrop(e, 'rows')}
                              onRemove={removeFromAll} onDragStart={onDragStart}
                              tcdData={tcdData} filters={filters} onFilter={toggleFilterValue}
                              sorts={sorts} onSort={toggleSort} />

                        <Zone title="Valeurs (Σ)"
                              colorClass="z-measures"
                              fields={measures}
                              onDrop={e => handleDrop(e, 'measures')}
                              onRemove={removeFromAll}
                              onDragStart={onDragStart}
                              groupByFuncs={groupByFuncs}
                              onUpdateGroupByFunc={updateGroupByFunc}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};