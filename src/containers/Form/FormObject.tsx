import React from 'react';
import * as Field from './FormComponents';

export type FormObjectFieldType =
    | 'text' | 'password' | 'email' | 'url' | 'tel' |  'textarea'
    | 'number' | 'range'
    | 'date' | 'datetime' | 'time' | 'month'
    | 'checkbox'
    | 'datalist' | 'select';

export interface FieldConfig {
    label?: string;
    type?: FormObjectFieldType;
    decimals?: number;
    min?: number;
    max?: number;
    step?: number;
    rows?: number;
    suggestions?: string[];
    options?: Field.SelectOption[];
    multiple?: boolean;
    placeholder?: string;
    disabled?: boolean; // 👈 NOUVELLE PROPRIÉTÉ AJOUTÉE
}

export type FormObjectConfig<T> = { [K in keyof T]?: FieldConfig };

interface FormObjectProps<T extends Record<string, any>> {
    data: T;
    config?: FormObjectConfig<T>;
    onSubmit: (updatedData: T) => void;
}

export const FormObject = <T extends Record<string, any>>({ data, config = {}, onSubmit }: FormObjectProps<T>) => {
    return (
        <Field.Form initialValues={data} onSubmit={onSubmit}>
            {({values, setValue}) => (
                <>
                    {Object.keys(values).map((key) => {
                        const currentValue: any = values[key];
                        const fieldConfig: FieldConfig = config[key] || {};
                        const label = fieldConfig.label || key.charAt(0).toUpperCase() + key.slice(1);

                        let uiType: FormObjectFieldType = fieldConfig.type || 'text';
                        // if (!fieldConfig.type) {
                        //     if (typeof currentValue === "number") uiType = 'number';
                        //     else if (typeof currentValue === 'boolean') uiType = 'checkbox';
                        //     else if (Array.isArray(currentValue)) uiType = 'select';
                        // }

                        // console.log('>>',uiType)

                        const defaultValue = currentValue ? String(currentValue) : undefined
                        const placeholder = (text: string="<saisir une valeur>") => {
                            return fieldConfig.placeholder || text
                        }

                        switch (uiType) {
                            case 'checkbox':
                                return <Field.CheckboxInput key={key} label={label} checked={!!currentValue}
                                                            disabled={fieldConfig.disabled}
                                                            onChange={(v) => setValue(key, v as any)}/>;
                            case 'number':
                                return <Field.NumberInput key={key} label={label} value={Number(currentValue)}
                                                          decimals={fieldConfig.decimals ?? (Number.isInteger(currentValue) ? 0 : 2)}
                                                          min={fieldConfig.min} max={fieldConfig.max}
                                                          disabled={fieldConfig.disabled}
                                                          onChange={(v) => setValue(key, v as any)}/>;
                            case 'range':
                                return <Field.RangeInput key={key} label={label} value={Number(currentValue)}
                                                         min={fieldConfig.min ?? 0} max={fieldConfig.max ?? 100}
                                                         step={fieldConfig.step ?? 1}
                                                         disabled={fieldConfig.disabled}
                                                         onChange={(v) => setValue(key, v as any)}/>;
                            case 'date':
                                return <Field.DateInput key={key} label={label}
                                                        value={currentValue instanceof Date ? currentValue : null}
                                                        disabled={fieldConfig.disabled}
                                                        onChange={(v) => setValue(key, v as any)}/>;
                            case 'datetime':
                                return <Field.DateTimeInput key={key} label={label}
                                                            value={currentValue instanceof Date ? currentValue : null}
                                                            disabled={fieldConfig.disabled}
                                                            onChange={(v) => setValue(key, v as any)}/>;
                            case 'month':
                                return <Field.MonthInput key={key} label={label}
                                                         value={currentValue instanceof Date ? currentValue : null}
                                                         disabled={fieldConfig.disabled}
                                                         onChange={(v) => setValue(key, v as any)}/>;
                            case 'datalist':
                                return <Field.DataListInput key={key} label={label} listId={`list-${key}`}
                                                            suggestions={fieldConfig.suggestions || []}
                                                            value={String(currentValue)}
                                                            disabled={fieldConfig.disabled}
                                                            onChange={(v) => setValue(key, v as any)}/>;
                            case 'select':
                                return <Field.SelectInput key={key} label={label} options={fieldConfig.options || []}
                                                          multiple={fieldConfig.multiple ?? Array.isArray(currentValue)}
                                                          value={currentValue}
                                                          disabled={fieldConfig.disabled}
                                                          onChange={(v) => setValue(key, ((v.length===1) ? v[0] : v) as any)}/>;
                            case 'password':
                                return <Field.PasswordInput key={key} label={label} value={String(currentValue)}
                                                            disabled={fieldConfig.disabled}
                                                            onChange={(v) => setValue(key, v as any)}
                                                            placeholder={placeholder()}/>;
                            case 'email':
                                return <Field.EmailInput key={key} label={label} value={String(currentValue)}
                                                         disabled={fieldConfig.disabled}
                                                         onChange={(v) => setValue(key, v as any)}
                                                         placeholder={placeholder()}/>;
                            case 'url':
                                return <Field.UrlInput key={key} label={label} value={String(currentValue)}
                                                       disabled={fieldConfig.disabled}
                                                       onChange={(v) => setValue(key, v as any)}
                                                       placeholder={placeholder()}/>;
                            case 'tel':
                                return <Field.TelInput key={key} label={label} value={String(currentValue)}
                                                       disabled={fieldConfig.disabled}
                                                       onChange={(v) => setValue(key, v as any)}
                                                       placeholder={placeholder()}/>;
                            case 'time':
                                return <Field.TimeInput key={key} label={label} value={String(currentValue)}
                                                        disabled={fieldConfig.disabled}
                                                        onChange={(v) => setValue(key, v as any)}/>;
                            case 'textarea':
                                return (
                                    <Field.TextAreaInput
                                        key={key}
                                        label={label}
                                        rows={fieldConfig.rows}
                                        value={String(currentValue)}
                                        disabled={fieldConfig.disabled}
                                        onChange={(val) => setValue(key, val as any)}
                                        placeholder={placeholder()}
                                    />
                                );

                            default:
                                return <Field.TextInput key={key} label={label} value={defaultValue}
                                                        disabled={fieldConfig.disabled}
                                                        onChange={(v) => setValue(key, v as any)}
                                                        placeholder={placeholder()}/>;
                        }
                    })}
                </>
            )}
        </Field.Form>
    );
}