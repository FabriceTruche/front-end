import React, { useRef, useState, useEffect } from 'react';

export const Page1 = ()=> {
    return (
        <ContenuHauteurRestante>
            <pre
                style={{
                        width: "100vw",
                        height: "1000px",
                    }}
            >
                Hello
                World
            </pre>
        </ContenuHauteurRestante>
    )
}
// Définition de l'interface des Props (propriétés)
interface ContenuProps {
    children: React.ReactNode;
}

/**
 * Composant qui calcule et applique la hauteur restante de l'écran.
 */
const ContenuHauteurRestante: React.FC<ContenuProps> = ({ children }) => {
    // 1. Hook useRef pour obtenir une référence directe à l'élément DOM du div
    const contentRef = useRef<HTMLDivElement>(null);

    // 2. Hook useState pour stocker la hauteur calculée en pixels
    const [hauteurRestante, setHauteurRestante] = useState<number | 'auto'>('auto');

    // 3. Fonction de calcul de la hauteur
    const calculerHauteur = () => {
        // S'assurer que la référence DOM existe
        if (contentRef.current) {

            // a. Obtenir les dimensions et la position du div par rapport au viewport
            const rect = contentRef.current.getBoundingClientRect();

            // L'offset top (rect.top) est la distance entre le haut de l'écran et le div.
            const topOffset = rect.top;

            // b. La hauteur totale de la fenêtre d'affichage
            const viewportHeight = window.innerHeight;

            // c. Calcul de la hauteur restante disponible
            const nouvelleHauteur = viewportHeight - topOffset;

            // d. Mise à jour de l'état
            setHauteurRestante(nouvelleHauteur - 30);
        }
    };

    // 4. Hook useEffect pour gérer le cycle de vie et les événements
    useEffect(() => {
        // 4a. Exécuter le calcul une première fois au montage du composant
        calculerHauteur();

        // 4b. Ajouter un écouteur d'événement pour le redimensionnement de la fenêtre
        window.addEventListener('resize', calculerHauteur);

        // 4c. Fonction de nettoyage (Cleanup)
        // Elle est exécutée lorsque le composant est démonté ou avant que
        // useEffect ne se réexécute, évitant les fuites de mémoire.
        return () => {
            window.removeEventListener('resize', calculerHauteur);
        };
    }, []); // Le tableau vide [] signifie que ce useEffect ne s'exécute qu'une seule fois au montage

    // 5. Rendu du Composant
    return (
        <div
            style={{
                // Application de la hauteur calculée
                // Ajout d'overflow pour permettre le défilement si le contenu dépasse
                // overflowY: 'auto',
                border: "30px solid blue",
            }}
        >
            <div
                ref={contentRef}
                className="hauteur-restante-container"
                style={{
                    // Application de la hauteur calculée
                    height: hauteurRestante ,
                    // Ajout d'overflow pour permettre le défilement si le contenu dépasse
                    overflowY: 'auto',
                    // border: "30px solid blue",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ContenuHauteurRestante;


/*
            <div
                style={{
                    height: "120px",
                    border: "10px solid red",
                }}
            />
            <div
                style={{
                }}
            >
            </div>
        </div>

 */