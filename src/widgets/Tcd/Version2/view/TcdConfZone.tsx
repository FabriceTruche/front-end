// --- Composants Internes Typés ---
import {FC, DragEvent} from "react";
import {ITcdColumn} from "../TcdColumn";
import {SelectGroupByFunc} from "./SelectGroupByFunc";
import {TcdConfFilterMenu} from "./TcdConfFilterMenu";

interface ZoneProps {
    title: string; colorClass: string; fields: ITcdColumn[];
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onRemove: (name: string) => void;
    onDragStart: (e: DragEvent<HTMLDivElement>, name: string) => void;
    tcdData?: any[]; filters?: Record<string, string[]>;
    onFilter?: (col: string, val: string) => void;
}

export const TcdConfZone: FC<ZoneProps> = ({ title, colorClass, fields, onDrop, onRemove, onDragStart, tcdData, filters, onFilter }) => (
    <div className={`tcd-conf-zone ${colorClass}`} onDragOver={e => e.preventDefault()} onDrop={onDrop}>
        <span className="tcd-conf-label-zone">{title}</span>
        <div className="tcd-conf-zone-list">
            {fields.map(col => (
                <div key={col.name} draggable onDragStart={e => onDragStart(e, col.name)} className="tcd-conf-card is-assigned">
                    <span>{col.label || col.name}</span>
                    <div className="card-controls">

                        {colorClass === 'z-measures' && (
                            <SelectGroupByFunc
                                currentFunc={(col as any).aggFunc || 'SUM'}
                                onSelect={(f) => {} /*handleUpdateAgg(col.name, f)*/}
                            />
                        )}

                        {onFilter && tcdData && filters && (
                            <TcdConfFilterMenu
                                col={col}
                                data={tcdData}
                                selected={filters[col.name] || []} onToggle={onFilter}
                            />
                        )}

                        <button type="button" className="btn-quick-remove" onClick={() => onRemove(col.name)}>×</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
