import React, { DragEvent, FC } from 'react';
import { FilterMenu } from "./FilterMenu"; // Nom mis à jour
import {Options} from "./Options";
import {GroupByFunc} from "./GroupByFunc";
import {TcdSortOrder} from "./TcdConfig";
import {FuncObject} from "../functionsGroup";

interface ZoneProps {
    title: string;
    colorClass: string;
    fields: string[];
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onRemove: (name: string) => void;
    onDragStart: (e: DragEvent<HTMLDivElement>, name: string) => void;
    tcdData?: any[];
    filters?: Record<string, string[]>;
    onFilter?: (col: string, val: string) => void;
    sorts?: Record<string, TcdSortOrder>;
    onSort?: (name: string) => void;
    groupByFuncs?: Record<string, FuncObject>;
    onUpdateGroupByFunc?: (colName: string, func: FuncObject) => void;
    columnOptions?: Record<string, any>;
    onUpdateOption?: (colName: string, key: string, value: any) => void;
}

export const Zone: FC<ZoneProps> = ({
                                        title, colorClass, fields, onDrop, onRemove, onDragStart,
                                        tcdData, filters, onFilter, sorts, onSort,
                                        groupByFuncs, onUpdateGroupByFunc,
                                        columnOptions, onUpdateOption
                                    }) => {
    return (
        <div className={`tcd-conf-zone ${colorClass}`}>
            <span className="tcd-conf-label-zone">{title}</span>
            <div className="tcd-conf-zone-list"
                 onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                 onDrop={onDrop}>
                {fields.map((col: string) => (
                    <div key={col}
                         className="tcd-conf-card is-assigned"
                         draggable
                         onDragStart={(e: DragEvent<HTMLDivElement>) => onDragStart(e, col)}>

                        <div className="card-main-content">
                            <span className="drag-handle">⠿</span>
                            <span className="col-label-text">{col}</span>
                        </div>

                        <div className="card-controls">

                            {/* AJOUT DU BOUTON FONCTION (Uniquement pour Measures) */}
                            {onUpdateGroupByFunc && groupByFuncs && (
                                <div className="btn-control-wrapper">
                                    <GroupByFunc
                                        currentFunc={groupByFuncs[col] || 'SUM'}
                                        onSelect={(func) => onUpdateGroupByFunc(col, func)}
                                    />
                                </div>
                            )}

                            {/* OPTIONS */}
                            <div className="btn-control-wrapper">
                                <Options
                                    col={col}
                                    onOptionChange={(val:any, propName: string) => onUpdateOption && onUpdateOption(col, propName, val)}
                                    // onTypeFormatChange={(val) => onUpdateOption && onUpdateOption(col.name, 'typeFormat', val)}
                                    // onPrecisionChangeChange={(val) => onUpdateOption && onUpdateOption(col.name, 'precision', val)}
                                    // onDateMaskChange={(val) => onUpdateOption && onUpdateOption(col.name, 'dateMask', val)}
                                    // onSetTotalChange={(val:boolean) => onUpdateOption && onUpdateOption(col.name, 'setTotal', val)}
                                />
                            </div>

                            {/* BOUTON TRI */}
                            {onSort && (
                                <button type="button"
                                        className={`btn-control btn-sort ${sorts?.[col] ? 'is-active' : ''}`}
                                        title="Trier"
                                        onClick={() => onSort(col)}>
                                    {sorts?.[col] === 'ASC' ? '↑' : sorts?.[col] === 'DESC' ? '↓' : '↕'}
                                </button>
                            )}

                            {/* BOUTON FILTRE */}
                            {onFilter && tcdData && (
                                <div className="btn-control-wrapper">
                                    <FilterMenu
                                        col={col}
                                        data={tcdData}
                                        selected={filters?.[col] || []}
                                        onToggle={onFilter}
                                    />
                                </div>
                            )}

                            {/* BOUTON SUPPRIMER */}
                            <button type="button"
                                    className="btn-control btn-quick-remove"
                                    title="Supprimer"
                                    onClick={() => onRemove(col)}>
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};