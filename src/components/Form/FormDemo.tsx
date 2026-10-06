import React from 'react';
import * as Field from './FormComponents';
import {FormObject, FormObjectConfig} from './FormObject';
import {FullFeatureFormState} from "./FormDemoMain";

const citySuggestions = ['Paris', 'Lyon', 'Marseille', 'Nantes', 'Strasbourg'];
const roleOptions: Field.SelectOption[] = [
    { label: 'Administrateur', value: 'admin' },
    { label: 'Modérateur', value: 'mod' },
    { label: 'Utilisateur', value: 'user' }
];

export const FormManualDemo: React.FC<{ title: string; initialData: FullFeatureFormState }> = ({ title, initialData }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', background: '#fcfcfc' }}>
            <h3 style={{ color: '#333', marginTop: 0 }}>{title}</h3>
            <Field.Form initialValues={initialData} onSubmit={(d) => console.log(`[Manuel - ${title}] Submitted :`, d)}>
                {({ values, setValue }) => (
                    <>
                        <Field.TextInput label="Texte standard" value={values.text} onChange={(v) => setValue('text', v)} />
                        <Field.EmailInput label="Adresse Email (Filtre strict)" value={values.email} onChange={(v) => setValue('email', v)} />
                        <Field.NumberInput label="Nombre décimal (Max 2)" value={values.numberDecimal} decimals={2} onChange={(v) => setValue('numberDecimal', v)} />
                        <Field.DateInput label="Date" value={values.date} onChange={(v) => setValue('date', v)} />

                        {/* Ajout du composant manuel Textarea */}
                        <Field.TextAreaInput label="Notes de l'opérateur (Multiligne)" value={values.commentaire} onChange={(v) => setValue('commentaire', v)} placeholder="Écrivez vos remarques ici..." />

                        <Field.SelectInput label="Rôles applicatifs (Multi)" multiple={false} options={roleOptions} value={values.selectRoles} onChange={(v) => setValue('selectRoles', v)} />
                        <Field.CheckboxInput label="J'accepte les conditions générales" checked={values.checkbox} onChange={(v) => setValue('checkbox', v)} />
                    </>
                )}
            </Field.Form>
        </div>
    );
};

// =========================================================================
// 2. FORMOBJECT DEMO AVEC INTEGRALITE DES TYPES + TEXTAREA
// =========================================================================
interface FullPayload {
    champTexte: string;
    motDePasse: string;
    courriel: string;
    adresseWeb: string;
    telephone: string;
    heureSimple: string;
    entierStrict: number;
    valeurDecimal: number;
    curseurRange: number;
    dateStandard: Date;
    dateEtHeure: Date;
    moisAnnee: Date;
    caseACocher: boolean;
    villeSaisieSuggestion: string;
    groupeSelection: string[];
    blocDescriptionLongue: string;
}

export const FormObjectDemo: React.FC = () => {
    const completeBusinessData: FullPayload = {
        champTexte: 'Exemple de texte libre',
        motDePasse: 'Secret_123!',
        courriel: 'contact@agence.fr',
        adresseWeb: 'https://github.com',
        telephone: '+33 1 23 45 67 89',
        heureSimple: '14:30',
        entierStrict: 1500,
        valeurDecimal: 2490.8541,
        curseurRange: 75,
        dateStandard: new Date('2026-06-07'),
        dateEtHeure: new Date('2026-06-07T09:15:00'),
        moisAnnee: new Date('2026-12-01'),
        caseACocher: true,
        villeSaisieSuggestion: 'Marseille',
        groupeSelection: ['mod', 'user'],
        blocDescriptionLongue: 'Ligne 1\nLigne 2\nLigne 3 : Ce texte s\'affichera automatiquement dans une zone multiligne grâce au mapping du fichier de config.' // <-- Ajouté
    };

    const completeObjectConfig: FormObjectConfig<FullPayload> = {
        champTexte: { label: '1. Texte libre (Standard)', placeholder: 'Saisissez du texte...' },
        motDePasse: { label: '2. Mot de passe masqué', uiType: 'password' },
        courriel: { label: '3. Adresse Email', uiType: 'email' },
        adresseWeb: { label: '4. URL Internet', uiType: 'url' },
        telephone: { label: '5. Téléphone (Filtre au vol)', uiType: 'tel' },
        heureSimple: { label: '6. Heure (Sélecteur HTML5)', uiType: 'time' },
        entierStrict: { label: '7. Nombre Entier', uiType: 'number', precisions: 0 },
        valeurDecimal: { label: '8. Nombre Décimal (Précision 4)', uiType: 'number', precisions: 4 },
        curseurRange: { label: '9. Curseur Glissant', uiType: 'range', min: 0, max: 100, step: 5 },
        dateStandard: { label: '10. Date standard', uiType: 'date' },
        dateEtHeure: { label: '11. Date et heure locales', uiType: 'datetime' },
        moisAnnee: { label: '12. Sélection de Mois / Année', uiType: 'month' },
        caseACocher: { label: '13. Case à cocher d’activation' },
        villeSaisieSuggestion: { label: '14. Ville avec Datalist', uiType: 'datalist', suggestions: citySuggestions },
        groupeSelection: { label: '15. ComboBox / Select Tag', uiType: 'select', multiple: false, options: roleOptions },
        blocDescriptionLongue: { label: '16. Bloc de texte étendu (TextArea)', uiType: 'textarea', placeholder: 'Saisissez vos paragraphes ici...' } // <-- Ajouté
    };

    return (
        <div style={{ border: '2px solid #007bff', padding: '25px', borderRadius: '12px', background: '#f7faff', marginBottom: '40px' }}>
            <h2 style={{ color: '#007bff', marginTop: 0, borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                Scénario C : Génération Automatique Intégrale (FormObject)
            </h2>
            <FormObject data={completeBusinessData} config={completeObjectConfig} onSubmit={(payload) => console.log('[FormObject SUBMIT] :', payload)} />
        </div>
    );
};