import React, { useState, useMemo, FC } from 'react';
import {ColumnFormatType, ITcdColumn} from "../TcdColumn";

interface OptionsProps {
    col: ITcdColumn;
    onTypeFormatChange?: (typeFormat: ColumnFormatType) => void;
    onPrecisionChangeChange?: (precision: number) => void;
    onDateMaskChange?: (mask: string) => void;
}

export const Options: FC<OptionsProps> = ({ col, onTypeFormatChange, onPrecisionChangeChange, onDateMaskChange }) => {
    const [show, setShow] = useState<boolean>(false);

    // const uniqueValues = useMemo<string[]>(() => {
    //     const vals = data.map((d: any) => String(d[col.name] ?? ''));
    //     return Array.from(new Set(vals)).filter((v: string) => v !== '').sort();
    // }, [data, col]);
    //
    // const handleSelectAll = (): void => {
    //     uniqueValues.forEach((v: string) => {
    //         if (!selected.includes(v)) onToggle(col.name, v);
    //     });
    // };
    //
    // const handleSelectNone = (): void => {
    //     selected.forEach((v: string) => onToggle(col.name, v));
    // };

    return (
        <div className="filter-wrapper">
            <button type="button" className="btn-filter" onClick={() => setShow(!show)}>⚙</button>

            {show && (
                <div className="filter-popover">
                    <div className="filter-sticky-header">
                        {/*<button type="button" className="btn-filter-action" onClick={handleSelectAll}>Tout</button>*/}
                        {/*<button type="button" className="btn-filter-action" onClick={handleSelectNone}>Aucun</button>*/}
                        <button type="button" className="btn-filter-ok" onClick={() => setShow(false)}>Ok</button>
                    </div>
                    <div className="filter-scroll">
                        {/*{uniqueValues.map((v: string) => (*/}
                        {/*    <label key={v} className="filter-item">*/}
                        {/*        <input type="checkbox"*/}
                        {/*               checked={selected.includes(v)}*/}
                        {/*               onChange={() => onToggle(col.name, v)}/>*/}
                        {/*        <span className="filter-val-text">{v}</span>*/}
                        {/*    </label>*/}
                        {/*))}*/}
                    </div>
                </div>
            )}
        </div>
    );
};