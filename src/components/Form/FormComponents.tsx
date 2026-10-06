import React, { ChangeEvent, CompositionEvent, useState, useEffect } from 'react';

// ==========================================
// CONFIGURATION DU DESIGN SYSTEM (Harmonisé)
// ==========================================
const DESIGN_SYSTEM = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    textMain: '#334155',      // Gris ardoise foncé
    textMuted: '#64748b',     // Gris secondaire
    borderColor: '#e2e8f0',   // Bordure fine subtile
    borderFocus: '#cbd5e1',   // Bordure au survol/focus
    accentColor: '#3b82f6',   // Bleu moderne
    accentHover: '#2563eb',   // Bleu survol
    bgMuted: '#f8fafc',       // Fond gris clair (ex: valeur range, boutons secondaires)
    radiusInput: '6px',       // Micro-arrondis modernes
    fontSizeLabel: '13px',    // Police plutôt petite
    fontSizeInput: '14px',    // Lisible et standard
};

// Styles partagés pour éviter la répétition
const commonInputStyle: React.CSSProperties = {
    fontFamily: DESIGN_SYSTEM.fontFamily,
    fontSize: DESIGN_SYSTEM.fontSizeInput,
    color: DESIGN_SYSTEM.textMain,
    padding: '8px 12px',
    borderRadius: DESIGN_SYSTEM.radiusInput,
    border: `1px solid ${DESIGN_SYSTEM.borderColor}`,
    outline: 'none',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.15s ease',
};

const commonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontFamily: DESIGN_SYSTEM.fontFamily,
};

const commonLabelStyle: React.CSSProperties = {
    fontSize: DESIGN_SYSTEM.fontSizeLabel,
    fontWeight: 500, // Medium pour le côté épuré (évite le gras trop lourd)
    color: DESIGN_SYSTEM.textMain,
};


// ==========================================
// 0. FONCTION UTILITAIRE DE PROJECTION
// ==========================================
const getProjectedValue = (input: HTMLInputElement, newData: string): string => {
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    return input.value.substring(0, start) + newData + input.value.substring(end);
};

// ==========================================
// 1. COMPOSANT GÉNÉRIQUE DE FORMULAIRE (FORM)
// ==========================================
interface FormProps<T extends Record<string, any>> {
    initialValues: T;
    onSubmit: (values: T) => void;
    children: (helpers: {
        values: T;
        setValue: <K extends keyof T>(key: K, value: T[K]) => void;
    }) => React.ReactNode;
}

export const Form = <T extends Record<string, any>>({ initialValues, onSubmit, children }: FormProps<T>) => {
    const [values, setValues] = useState<T>(initialValues);

    const setValue = <K extends keyof T>(key: K, value: T[K]) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {children({ values, setValue })}
            <button
                type="submit"
                style={{
                    fontFamily: DESIGN_SYSTEM.fontFamily,
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '10px 16px',
                    cursor: 'pointer',
                    maxWidth: '160px',
                    backgroundColor: DESIGN_SYSTEM.accentColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: DESIGN_SYSTEM.radiusInput,
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    transition: 'background-color 0.15s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.accentHover}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = DESIGN_SYSTEM.accentColor}
            >
                Soumettre
            </button>
        </form>
    );
};

// ==========================================
// 2. COMPOSANTS INPUT NUMÉRIQUES (NUMBER & RANGE)
// ==========================================
export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    label: string;
    value: number;
    onChange: (value: number) => void;
    decimals?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, decimals = 0, ...props }) => {
    const [inputValue, setInputValue] = useState<string>(String(value));

    useEffect(() => {
        if (inputValue !== '' && inputValue !== '-' && inputValue !== '+' && inputValue !== '.' && Number(inputValue) !== value) {
            setInputValue(String(value));
        }
    }, [value]);

    const handleBeforeInput = (e: CompositionEvent<HTMLInputElement> & { data: string | null }) => {
        if (e.data === null) return;
        const projectedValue = getProjectedValue(e.currentTarget, e.data);
        const regex = decimals === 0 ? /^[+-]?\d*$/ : new RegExp(`^[+-]?\\d*\\.?\\d{0,${decimals}}$`);
        if (!regex.test(projectedValue)) e.preventDefault();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        if (val === '' || val === '-' || val === '+' || val === '.') {
            onChange(0);
        } else {
            const parsedNumber = Number(val);
            if (!isNaN(parsedNumber)) onChange(parsedNumber);
        }
    };

    return (
        <div style={commonContainerStyle}>
            <label style={commonLabelStyle}>{label}</label>
            <input
                type="text"
                inputMode={decimals > 0 ? "decimal" : "numeric"}
                value={inputValue}
                onBeforeInput={handleBeforeInput as any}
                onChange={handleChange}
                {...props}
                style={commonInputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderFocus}
                onBlur={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderColor}
            />
        </div>
    );
};

export interface RangeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value'> {
    label: string;
    value: number;
    onChange: (value: number) => void;
    showCurrentValue?: boolean;
}

export const RangeInput: React.FC<RangeInputProps> = ({ label, value, onChange, showCurrentValue = true, ...props }) => {
    return (
        <div style={commonContainerStyle}>
            <label style={commonLabelStyle}>{label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                    type="range"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...props}
                    style={{ accentColor: DESIGN_SYSTEM.accentColor, cursor: 'pointer' }}
                />
                {showCurrentValue && (
                    <span style={{
                        fontFamily: DESIGN_SYSTEM.fontFamily,
                        fontSize: '12px',
                        color: DESIGN_SYSTEM.textMuted,
                        background: DESIGN_SYSTEM.bgMuted,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: `1px solid ${DESIGN_SYSTEM.borderColor}`,
                        minWidth: '24px',
                        textAlign: 'center'
                    }}>
                        {value}
                    </span>
                )}
            </div>
        </div>
    );
};

// ==========================================
// 3. COMPOSANTS STRINGS SPÉCIALISÉS (TEXT, TEXTAREA, EMAIL, URL, TEL, PASSWORD, TIME)
// ==========================================
interface BaseTextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label: string;
    type: 'text' | 'password' | 'email' | 'url' | 'tel' | 'time';
    value: string|undefined;
    onChange: (value: string) => void;
    patternFilter?: RegExp;
}

const BaseTextInput: React.FC<BaseTextInputProps> = ({ label, type, value, onChange, patternFilter, ...props }) => {
    const handleBeforeInput = (e: CompositionEvent<HTMLInputElement> & { data: string | null }) => {
        if (patternFilter && e.data !== null) {
            const projectedValue = getProjectedValue(e.currentTarget, e.data);
            if (!patternFilter.test(projectedValue)) e.preventDefault();
        }
    };

    return (
        <div style={commonContainerStyle}>
            <label style={commonLabelStyle}>{label}</label>
            <input
                type={type}
                value={value}
                onBeforeInput={handleBeforeInput as any}
                onChange={(e) => onChange(e.target.value)}
                {...props}
                style={commonInputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderFocus}
                onBlur={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderColor}
            />
        </div>
    );
};

// --- TEXTAREA INPUT (Multiligne) ---
export interface TextAreaInputProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
    label: string;
    value: string;
    onChange: (value: string) => void;
    patternFilter?: RegExp;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, value, onChange, patternFilter, rows, ...props }) => {
    const handleBeforeInput = (e: CompositionEvent<HTMLTextAreaElement> & { data: string | null }) => {
        if (patternFilter && e.data !== null) {
            const input = e.currentTarget as unknown as HTMLInputElement;
            const projectedValue = getProjectedValue(input, e.data);
            if (!patternFilter.test(projectedValue)) e.preventDefault();
        }
    };

    return (
        <div style={commonContainerStyle}>
            <label style={commonLabelStyle}>{label}</label>
            <textarea
                value={value}
                onBeforeInput={handleBeforeInput as any}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                {...props}
                style={{
                    ...commonInputStyle,
                    resize: 'vertical',
                    lineHeight: '1.5'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderFocus}
                onBlur={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderColor}
            />
        </div>
    );
};

export type ControlledInputProps = Omit<BaseTextInputProps, 'type'>;

export const TextInput: React.FC<ControlledInputProps> = (props) => <BaseTextInput type="text" {...props} />;
export const PasswordInput: React.FC<ControlledInputProps> = (props) => <BaseTextInput type="password" {...props} />;
export const TimeInput: React.FC<ControlledInputProps> = (props) => <BaseTextInput type="time" {...props} />;
export const EmailInput: React.FC<ControlledInputProps> = (props) => <BaseTextInput type="email" patternFilter={/^[a-zA-Z0-9@._+-]*$/} {...props} />;
export const UrlInput: React.FC<ControlledInputProps> = (props) => <BaseTextInput type="url" patternFilter={/^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*$/} {...props} />;
export const TelInput: React.FC<ControlledInputProps> = (props) => <BaseTextInput type="tel" patternFilter={/^\+?[0-9\s-]*$/} {...props} />;

// ==========================================
// 4. COMPOSANTS DATE COMPLEXES (DATE, DATETIME-LOCAL, MONTH)
// ==========================================
interface BaseDateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value'> {
    label: string;
    type: 'date' | 'datetime-local' | 'month';
    value: Date | null;
    onChange: (value: Date | null) => void;
}

const BaseDateInput: React.FC<BaseDateInputProps> = ({ label, type, value, onChange, ...props }) => {
    const pad = (n: number) => String(n).padStart(2, '0');

    const formatToString = (date: Date | null): string => {
        if (!date || isNaN(date.getTime())) return '';
        if (type === 'date') return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        if (type === 'month') return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!val) return onChange(null);
        onChange(type === 'month' ? new Date(`${val}-01`) : new Date(val));
    };

    return (
        <div style={commonContainerStyle}>
            <label style={commonLabelStyle}>{label}</label>
            <input
                type={type}
                value={formatToString(value)}
                onChange={handleChange}
                {...props}
                style={commonInputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderFocus}
                onBlur={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderColor}
            />
        </div>
    );
};

export type DatePropsWrapper = Omit<BaseDateInputProps, 'type'>;

export const DateInput: React.FC<DatePropsWrapper> = (props) => <BaseDateInput type="date" {...props} />;
export const DateTimeInput: React.FC<DatePropsWrapper> = (props) => <BaseDateInput type="datetime-local" {...props} />;
export const MonthInput: React.FC<DatePropsWrapper> = (props) => <BaseDateInput type="month" {...props} />;

// ==========================================
// 5. BOOLEAN (CHECKBOX)
// ==========================================
export interface CheckboxInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'checked'> {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, checked, onChange, ...props }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0', fontFamily: DESIGN_SYSTEM.fontFamily }}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                {...props}
                style={{ accentColor: DESIGN_SYSTEM.accentColor, width: '15px', height: '15px', cursor: 'pointer' }}
            />
            <label style={{ ...commonLabelStyle, cursor: 'pointer' }}>{label}</label>
        </div>
    );
};

// ==========================================
// 6. LISTES (DATALIST & SELECT MULTIPLE)
// ==========================================
export interface DataListInputProps extends ControlledInputProps {
    suggestions: string[];
    listId: string;
}

export const DataListInput: React.FC<DataListInputProps> = ({ label, suggestions, listId, value, onChange, ...props }) => {
    return (
        <div style={commonContainerStyle}>
            <label style={commonLabelStyle}>{label}</label>
            <input
                type="text"
                list={listId}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...props}
                style={commonInputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderFocus}
                onBlur={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderColor}
            />
            <datalist id={listId}>
                {suggestions.map((opt) => <option key={opt} value={opt} />)}
            </datalist>
        </div>
    );
};

export interface SelectOption {
    value: string|number;
    label: string;
}

export interface SelectInputProps<T> extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
    value: T | T[];
    label: string;
    options: SelectOption[];
}

export const SelectInput = <T extends string | number>({ label, options, value, onChange, ...props }: SelectInputProps<T> & { onChange: (value: T[]) => void }) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions).map(opt => {
            return (typeof options[0]?.value === 'number' ? Number(opt.value) : opt.value) as T;
        });
        onChange(selected);
    };

    const selectValue = Array.isArray(value) ? value.map(String) : String(value);

    return (
        <div style={commonContainerStyle}>
            <label style={commonLabelStyle}>{label}</label>
            <select
                value={selectValue}
                onChange={handleChange}
                {...props}
                style={{
                    ...commonInputStyle,
                    paddingRight: '24px', /* Sécurité visuelle pour la flèche native */
                    cursor: 'pointer'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderFocus}
                onBlur={(e) => e.currentTarget.style.borderColor = DESIGN_SYSTEM.borderColor}
            >
                {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    );
}