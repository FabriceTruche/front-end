import React from 'react';
import {
    FormManualDemo,
    FormObjectDemo,
} from './FormDemo';

export interface FullFeatureFormState {
    text: string; password: string; email: string; url: string; tel: string;
    numberInt: number; numberDecimal: number; range: number; time: string;
    date: Date | null; dateTime: Date | null; month: Date | null; checkbox: boolean;
    datalistCity: string; selectRoles: string[];
    commentaire: string; // <-- Ajouté
}

export const initializedValuesExample: FullFeatureFormState = {
    text: 'Texte par défaut', password: 'password123', email: 'test@domain.com', url: 'https://site.com', tel: '+33 6 00 00 00',
    numberInt: 10, numberDecimal: 45.65, range: 40, time: '08:30', date: new Date('2026-06-07'),
    dateTime: new Date('2026-06-07T12:00:00'), month: new Date('2026-10-01'), checkbox: true, datalistCity: 'Lyon', selectRoles: ['user'],
    commentaire: 'Ceci est un paragraphe pré-rempli pour tester le textarea.'
};

export const emptyValuesExample: FullFeatureFormState = {
    text: '', password: '', email: '', url: '', tel: '', numberInt: 0, numberDecimal: 0, range: 50, time: '',
    date: null, dateTime: null, month: null, checkbox: false, datalistCity: '', selectRoles: [],
    commentaire: ''
}

const FormDemoMain: React.FC = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1>Démonstrateur de Formulaires Robustes et Typés</h1>
                <p style={{ color: '#555' }}>Vérification en temps réel (Inférence stricte, Ctrl+A supporté, Filtrage de caractères au vol)</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', marginBottom: '40px' }}>
                <FormManualDemo title="Scénario A : Formulaire pré-rempli (Valeurs par défaut)" initialData={initializedValuesExample} />
                <FormManualDemo title="Scénario B : Formulaire vierge (Sans valeurs par défaut)" initialData={emptyValuesExample} />
                <FormObjectDemo />
            </div>
        </div>
    );
};

export default FormDemoMain;
