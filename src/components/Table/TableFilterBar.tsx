import React, { useState } from 'react';
import { TableConfig } from './TableConfig';

interface TableFilterBarProps {
    config: TableConfig;
    columnsWidth: number[];
    onFilterChange: (filters: Record<string, any>) => void;
}

export const TableFilterBar: React.FC<TableFilterBarProps> = ({
                                                                  config,
                                                                  columnsWidth,
                                                                  onFilterChange
                                                              }) => {
    // Stockage local des valeurs de filtres par colonne
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});

    const handleChange = (columnName: string, value: any) => {
        const updated = { ...filterValues, [columnName]: value };
        setFilterValues(updated);
        onFilterChange(updated);
    };

    const columns = config.columns || config.allColumns || [];
    const fieldsDef = config.fieldsDefinition || {};
    const width = columnsWidth.reduce<number>((previousValue, currentValue, currentIndex, array)=>previousValue+currentValue,0)

    return (
        <div
            className="table-filter-bar"
            style={{
                display: 'flex',
                gap: '0px',
                // marginBottom: '8px',
                // overflowX: 'auto',
                backgroundColor: '#f1f2f6',
                border: '1px solid #dfe4ea',
                borderRadius: '4px',
                padding: '6px 0px',
                alignItems: 'center',
                // overflow: 'clip',
                width
            }}
        >
            {columns.map((colName, index) => {
                const width = columnsWidth[index] || 100;
                const fieldConfig = fieldsDef[colName] || {};
                const currentValue = filterValues[colName] ?? '';

                return (
                    <div
                        key={colName}
                        style={{
                            width: `${width}px`,
                            minWidth: `${width}px`,
                            maxWidth: `${width}px`,
                            padding: '0 4px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {/* Appel du composant sur mesure associé à la configuration du champ */}
                        <DynamicFilterControl
                            colName={colName}
                            fieldConfig={fieldConfig}
                            value={currentValue}
                            onChange={(val) => handleChange(colName, val)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

/**
 * Sous-composant qui sélectionne et instancie le composant de saisie
 * en se basant sur le type ou l'uiType défini dans ton architecture FormObject / FormComponents.
 */
const DynamicFilterControl = ({
                                  colName,
                                  fieldConfig,
                                  value,
                                  onChange
                              }: {
    colName: string;
    fieldConfig: any;
    value: any;
    onChange: (val: any) => void;
}) => {
    // Récupération du type UI ou du type de données (ex: 'checkbox', 'date', 'select', etc.)
    const uiType = fieldConfig.uiType || fieldConfig.type;
    const items = fieldConfig.items;

    // Si tu utilises un objet centralisé de composants (ex: FormComponents[uiType]),
    // tu peux directement l'injecter ici. Exemple d'intégration propre :

    // 1. Si le champ possède des items (liste de choix / select)
    if (items && Array.isArray(items)) {
        return (
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: '100%', padding: '4px', fontSize: '11px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
                <option value="">Tous</option>
                {items.map((item, idx) => (
                    <option key={idx} value={item}>{item}</option>
                ))}
            </select>
        );
    }

    // 2. Si c'est une checkbox gérée par vos composants
    if (uiType === 'checkbox') {
        return (
            <div style={{ width: '100%', textAlign: 'center' }}>
                <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                />
            </div>
        );
    }

    // 3. Pour tous les autres types (text, date, month, number, etc.) gérés par vos composants de saisie
    // Tu peux remplacer cette balise par ton composant custom importé depuis FormComponents :
    // ex: <FormComponents.InputField ... /> ou ton composant métier.
    return (
        <input
            type={uiType === 'number' ? 'number' : uiType === 'date' || uiType === 'month' ? uiType : 'text'}
            value={value}
            placeholder={`Filtrer...`}
            disabled={fieldConfig.disabled}
            onChange={(e) => onChange(e.target.value)}
            style={{
                width: '100%',
                padding: '4px 6px',
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                backgroundColor: fieldConfig.disabled ? '#f1f2f6' : '#fff'
            }}
        />
    );
};
