import {ITcdColumn} from "../TcdColumn";
import {FC, useMemo, useState} from "react";

export const TcdConfFilterMenu: FC<{
    col: ITcdColumn;
    data: any[];
    selected: string[];
    onToggle: (c: string, v: string) => void;
}> = ({ col, data, selected, onToggle }) => {
    const [show, setShow] = useState(false);

    const uniqueValues = useMemo(() => {
        const vals = data.map(d => String(d[col.name] ?? ''));
        return Array.from(new Set(vals)).filter(v => v !== '').sort();
    }, [data, col]);

    // Sélection de tous les éléments
    const handleSelectAll = () => {
        uniqueValues.forEach(v => {
            if (!selected.includes(v)) onToggle(col.name, v);
        });
    };

    // Désélection de tous les éléments
    const handleSelectNone = () => {
        selected.forEach(v => onToggle(col.name, v));
    };

    return (
        <div className="filter-wrapper">
            <button type="button" className={`btn-filter ${selected.length > 0 ? 'is-active' : ''}`}
                    onClick={() => setShow(!show)}>▽
            </button>

            {show && (
                <div className="filter-popover">
                    {/* Header Sticky avec les 3 boutons alignés */}
                    <div className="filter-sticky-header">
                        <div className="filter-header-title">
                            {col.name}
                        </div>
                        <div className="filter-header-content">
                            <button type="button" className="btn-filter-action" onClick={handleSelectAll}>Tout</button>
                            <button type="button" className="btn-filter-action" onClick={handleSelectNone}>Aucun</button>
                            <button type="button" className="btn-filter-ok" onClick={() => setShow(false)}>Ok</button>
                        </div>
                    </div>

                    <div className="filter-scroll">
                        {uniqueValues.map(v => (
                            <label key={v} className="filter-item">
                                <input type="checkbox"
                                       checked={selected.includes(v)}
                                       onChange={() => onToggle(col.name, v)}/>
                                <span className="filter-val-text">{v}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};