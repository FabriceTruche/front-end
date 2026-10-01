import React from 'react';
import {FieldConfig} from "./FormObject";

interface FormModalProps<T> {
    isOpen: boolean;
    title?: string;
    initialData: T;
    /** * Le composant de formulaire à afficher (ex: FormObject).
     * Il recevra les données initiales et un callback onSubmit.
     */
    formComponent: React.ComponentType<{
        data: T;
        onSubmit: (updatedData: T) => void;
        config?: any;
    }>;
    formConfig?: FieldConfig; // Permet de passer la configuration (optionnelle) au formulaire
    onClose: (result: T | null) => void; // Retourne l'objet modifié, ou null si annulation
}

export const FormModal = <T extends Record<string, any>>({
                                                             isOpen,
                                                             title = "Édition",
                                                             initialData,
                                                             formComponent: Form,
                                                             formConfig,
                                                             onClose
                                                         }: FormModalProps<T>) => {

    if (!isOpen) return null;

    return (
        <div className="form-modal-overlay">
            <div className="form-modal-content">
                <header className="form-modal-header">
                    <h3>{title}</h3>
                    <button
                        type="button"
                        className="form-modal-close-btn"
                        onClick={() => onClose(null)}
                    >
                        &times;
                    </button>
                </header>

                <main className="form-modal-body">
                    {/* Injection dynamique du composant de formulaire passé en propriété */}
                    <Form
                        data={initialData}
                        config={formConfig}
                        onSubmit={(updatedData: T) => {
                            // On renvoie l'objet validé au parent
                            // console.log(updatedData);
                            onClose(updatedData);
                        }}
                    />
                </main>

                <footer className="form-modal-footer">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => onClose(null)}
                    >
                        Annuler
                    </button>
                </footer>
            </div>
        </div>
    );
};