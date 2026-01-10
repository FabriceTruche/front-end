import React, { DragEvent, FC } from 'react';
import { ITcdColumn } from "../TcdColumn";
import { FilterMenu } from "./FilterMenu"; // Nom mis à jour
import { TcdSortOrder } from "./TcdConfPanel";
import {GroupByFunc, GroupByFuncNames} from "./GroupByFunc";
import {Options} from "./Options";

interface ZoneProps {
    title: string;
    colorClass: string;
    fields: ITcdColumn[];
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onRemove: (name: string) => void;
    onDragStart: (e: DragEvent<HTMLDivElement>, name: string) => void;
    tcdData?: any[];
    filters?: Record<string, string[]>;
    onFilter?: (col: string, val: string) => void;
    sorts?: Record<string, TcdSortOrder>;
    onSort?: (name: string) => void;
    groupByFuncs?: Record<string, GroupByFuncNames>;
    onUpdateGroupByFunc?: (colName: string, func: GroupByFuncNames) => void;
}

export const Zone: FC<ZoneProps> = ({
                                        title, colorClass, fields, onDrop, onRemove, onDragStart,
                                        tcdData, filters, onFilter, sorts, onSort,
                                        groupByFuncs, onUpdateGroupByFunc // Récupération des props
                                    }) => {
    return (
        <div className={`tcd-conf-zone ${colorClass}`}>
            <span className="tcd-conf-label-zone">{title}</span>
            <div className="tcd-conf-zone-list"
                 onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                 onDrop={onDrop}>
                {fields.map((col: ITcdColumn) => (
                    <div key={col.name}
                         className="tcd-conf-card is-assigned"
                         draggable
                         onDragStart={(e: DragEvent<HTMLDivElement>) => onDragStart(e, col.name)}>

                        <div className="card-main-content">
                            <span className="drag-handle">⠿</span>
                            <span className="col-label-text">{col.label || col.name}</span>
                        </div>

                        <div className="card-controls">

                            {/* AJOUT DU BOUTON FONCTION (Uniquement pour Measures) */}
                            {onUpdateGroupByFunc && groupByFuncs && (
                                <div className="btn-control-wrapper">
                                    <GroupByFunc
                                        currentFunc={groupByFuncs[col.name] || 'SUM'}
                                        onSelect={(func) => onUpdateGroupByFunc(col.name, func)}
                                    />
                                </div>
                            )}

                            {/* OPTIONS */}
                            <div className="btn-control-wrapper">
                                <Options
                                    col={col}
                                />
                            </div>

                            {/* BOUTON TRI */}
                            {onSort && (
                                <button type="button"
                                        className={`btn-control btn-sort ${sorts?.[col.name] ? 'is-active' : ''}`}
                                        title="Trier"
                                        onClick={() => onSort(col.name)}>
                                    {sorts?.[col.name] === 'ASC' ? '↑' : sorts?.[col.name] === 'DESC' ? '↓' : '↕'}
                                </button>
                            )}

                            {/* BOUTON FILTRE */}
                            {onFilter && tcdData && (
                                <div className="btn-control-wrapper">
                                    <FilterMenu
                                        col={col}
                                        data={tcdData}
                                        selected={filters?.[col.name] || []}
                                        onToggle={onFilter}
                                    />
                                </div>
                            )}

                            {/* BOUTON SUPPRIMER */}
                            <button type="button"
                                    className="btn-control btn-quick-remove"
                                    title="Supprimer"
                                    onClick={() => onRemove(col.name)}>
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};