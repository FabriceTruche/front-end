import React, { useState, DragEvent, FC, ReactElement } from 'react';
import {ITcdColumn} from "../TcdColumn";
import {TcdConfZone} from "./TcdConfZone";
import './tcdConfStyles.css';

/** État de configuration pour le manager */
export interface ITcdConfigState {
    rows: ITcdColumn[];
    columns: ITcdColumn[];
    measures: ITcdColumn[];
    filters: Record<string, string[]>;
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
    const [filters, setFilters] = useState<Record<string, string[]>>({});

    const onDragStart = (e: DragEvent<HTMLDivElement>, name: string): void => {
        e.dataTransfer.setData("columnName", name);
    };

    const removeFromAll = (name: string): void => {
        const filterOut = (prev: ITcdColumn[]) => prev.filter(c => c.name !== name);
        setRows(filterOut);
        setColumns(filterOut);
        setMeasures(filterOut);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>, zone: 'rows' | 'cols' | 'measures' | 'pool'): void => {
        e.preventDefault();
        const name = e.dataTransfer.getData("columnName");
        const col = allColumns.find(c => c.name === name);
        if (!col) return;

        removeFromAll(name);
        if (zone === 'rows') setRows(prev => [...prev, col]);
        if (zone === 'cols') setColumns(prev => [...prev, col]);
        if (zone === 'measures') setMeasures(prev => [...prev, col]);
    };

    const toggleFilterValue = (colName: string, value: string): void => {
        setFilters(prev => {
            const current = prev[colName] || [];
            const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
            return {...prev, [colName]: next};
        });
    };

    return (
        <div className="tcd-conf-panel">
            <div className="tcd-conf-header-compact">
                <div className="tcd-conf-title-group">
                    <span className="tcd-conf-icon-main">⚙️</span>
                    <h3>Configuration du Pivot</h3>
                </div>
                <div className="tcd-conf-actions">
                    <button type="button" className="btn-cancel" onClick={onCancel}>Annuler</button>
                    <button type="button" className="btn-apply-elegant"
                            onClick={() => onApply({rows, columns, measures, filters})}>
                        Appliquer
                    </button>
                </div>
            </div>

            <div className="tcd-conf-content">
                <section className="tcd-conf-pool-section">
                    <span className="tcd-conf-label">Champs disponibles</span>
                    <div className="tcd-conf-pool" onDragOver={e => e.preventDefault()}
                         onDrop={e => handleDrop(e, 'pool')}>
                        {allColumns.map(col => (
                            <div key={col.name} draggable onDragStart={e => onDragStart(e, col.name)}
                                 className="tcd-conf-card">
                                <span className="drag-handle">⠿</span> {col.label || col.name}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="tcd-conf-drop-grid">
                    <TcdConfZone title="Colonnes" colorClass="z-cols" fields={columns}
                                 onDrop={e => handleDrop(e, 'cols')}
                                 onRemove={removeFromAll} onDragStart={onDragStart} tcdData={tcdData} filters={filters}
                                 onFilter={toggleFilterValue}/>
                    <TcdConfZone title="Lignes" colorClass="z-rows" fields={rows} onDrop={e => handleDrop(e, 'rows')}
                                 onRemove={removeFromAll} onDragStart={onDragStart} tcdData={tcdData} filters={filters}
                                 onFilter={toggleFilterValue}/>
                    <TcdConfZone title="Valeurs (Σ)" colorClass="z-measures" fields={measures}
                                 onDrop={e => handleDrop(e, 'measures')} onRemove={removeFromAll}
                                 onDragStart={onDragStart}/>
                </div>
            </div>
        </div>
    );
}