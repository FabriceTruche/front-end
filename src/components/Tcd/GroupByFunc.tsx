import React, { useState, FC } from 'react';
import {FuncObject, functionsGroup} from "../functionsGroup";

interface GroupByFuncProps {
    currentFunc: FuncObject;
    onSelect: (func: FuncObject) => void;
}

export const GroupByFunc: FC<GroupByFuncProps> = ({ currentFunc, onSelect }) => {
    const [show, setShow] = useState(false);

    const options: { key: string, value: FuncObject; label: string }[] = Object.keys(functionsGroup).map((k:string)=>(
        {
            key: k,
            label: functionsGroup[k].label,
            value: functionsGroup[k]
        }))

    const handleSelect = (func: FuncObject) => {
        onSelect(func);
        setShow(false);
    };

    return (
        <div className="filter-wrapper">
            <button
                type="button"
                // className={`btn-filter ${currentFunc !== 'SUM' ? 'is-active' : ''}`}
                className={`btn-filter`}
                title="Fonction d'agrégation"
                onClick={() => setShow(!show)}
            >
                ƒ
            </button>

            {show && (
                <div className="filter-popover function-selector">
                    <div className="filter-scroll">
                        {options.map((opt) => (
                            <div
                                key={opt.key}
                                className={`filter-item func-option ${currentFunc === opt.value ? 'selected' : ''}`}
                                onClick={() => handleSelect(opt.value)}
                            >
                                <span className="func-icon">{currentFunc === opt.value ? '✓' : ''}</span>
                                <span>{opt.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};





// ))  functionsGroup.map((fg:IGroupByFunc)=>({value:fg, label: fg.label}))
//     [
//     { value: 'SUM', label: 'Somme (Σ)' },
//     { value: 'AVG', label: 'Moyenne (x̄)' },
//     { value: 'COUNT', label: 'Nombre (n)' },
//     { value: 'MIN', label: 'Minimum' },
//     { value: 'MAX', label: 'Maximum' },
// ];
// Définition des types de fonctions disponibles
// export type GroupByFuncNames = 'SUM' | 'AVG' | 'COUNT' | 'MIN' | 'MAX';

