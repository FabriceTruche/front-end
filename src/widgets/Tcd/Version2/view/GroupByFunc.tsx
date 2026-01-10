import React, { useState, FC } from 'react';

// Définition des types de fonctions disponibles
export type GroupByFuncNames = 'SUM' | 'AVG' | 'COUNT' | 'MIN' | 'MAX';

interface GroupByFuncProps {
    currentFunc: GroupByFuncNames;
    onSelect: (func: GroupByFuncNames) => void;
}

export const GroupByFunc: FC<GroupByFuncProps> = ({ currentFunc, onSelect }) => {
    const [show, setShow] = useState(false);

    const options: { value: GroupByFuncNames; label: string }[] = [
        { value: 'SUM', label: 'Somme (Σ)' },
        { value: 'AVG', label: 'Moyenne (x̄)' },
        { value: 'COUNT', label: 'Nombre (n)' },
        { value: 'MIN', label: 'Minimum' },
        { value: 'MAX', label: 'Maximum' },
    ];

    const handleSelect = (func: GroupByFuncNames) => {
        onSelect(func);
        setShow(false);
    };

    return (
        <div className="filter-wrapper">
            <button
                type="button"
                className={`btn-filter ${currentFunc !== 'SUM' ? 'is-active' : ''}`}
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
                                key={opt.value}
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
