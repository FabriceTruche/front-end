import {CSSProperties} from 'react';
import {ICell, TypeCell} from "./Cell";

// Signature d'une règle de style : prend une cellule, renvoie un style ou null
type StyleRule = (cell: ICell) => CSSProperties | null;

export interface IStyleRulesManager {
    computeCellStyle(cell: ICell): CSSProperties;
    registerRule(name: string, rule: StyleRule): void;
}

class _StyleService implements IStyleRulesManager {
    private rules: Map<string, StyleRule> = new Map();

    constructor() {
        this.initializeDefaultRules();
    }

    /**
     * Définit les règles de base nommées
     */
    private initializeDefaultRules() {

        // Règle d'alignement par type
        this.registerRule('AutoAlignment', (cell: ICell) => {
            const dbType = cell.column.dbType;
            const uiType = cell.column.uiType;

            // liste de substitution alignée à droite
            if ((uiType === 'select') || (uiType === 'datalist')) {
                return { textAlign: 'left' };
            }

            switch (dbType) {
                case 'number':
                // case 'currency':
                    return { textAlign: 'right' };

                case 'boolean':
                    return { textAlign: 'center' };

                case 'date':
                    return { textAlign: 'center' };

                case 'string':
                default:
                    // Pour le texte ou les types non spécifiés, on peut forcer à gauche
                    // ou retourner null pour laisser le style par défaut
                    return { textAlign: 'left' };
            }

        });

        // Règle pour les valeurs négatives
        this.registerRule('NegativeAlert', (cell: ICell) => {
            if (typeof cell.value === 'number' && cell.value < 0) {
                return {
                    color: '#c63c3c',
                    fontWeight: 'bold',
                };
            }
            return null;
        });

        // Règle pour les cellules "Header" (figées ou titres)
        this.registerRule('HeaderStyle', (cell: ICell) => {
            if (cell.isLabel) {
                return {
                    fontWeight: '600',
                    color: 'blueviolet'
                };
            }
            return null;
        });


        // Règle permettant de mettre en apparanec ekes GT(test))
        this.registerRule('GTStyle', (cell: ICell) => {
            switch (cell.typeCell) {
                case TypeCell.grandTotalMeasure :
                case TypeCell.grandTotal :
                case TypeCell.footer:
                    return {
                        fontWeight: '600',
                        border: '1px solid gray',
                        background: 'yellow',
                    };
            }
            return null;
        });


    }

    /**
     * Permet d'ajouter dynamiquement une règle nommée depuis l'extérieur
     */
    public registerRule(name: string, rule: StyleRule): void {
        this.rules.set(name, rule);
    }

    /**
     * Applique toutes les règles enregistrées et fusionne les styles
     */
    public computeCellStyle(cell: ICell): CSSProperties {
        // On part du style par défaut de la colonne
        let finalStyle: CSSProperties = { ...(cell.column.defaultStyle || {}) };

        // On itère sur toutes les règles du registre
        this.rules.forEach((rule: StyleRule, name: string) => {
            const ruleResult = rule(cell);
            if (ruleResult) {
                finalStyle = { ...finalStyle, ...ruleResult };
            }
        });

        return finalStyle;
    }
}

export const stylerService: IStyleRulesManager = new _StyleService();
