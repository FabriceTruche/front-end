import {Navbar} from "./widgets/Navbar/Navbar";
import {AllTests} from "./test/AllTests";

export const MainApp=()=>{
    return (
        <Navbar showTitle={false}>
            <Navbar image="business_center" label="Actifs" showTitle={false} >
                <div title="Tiers" ></div>
                <div title="Lots" ></div>
                <div title="Contrats" ></div>
            </Navbar>
            <Navbar image="sync" label="Suivi" showTitle={false} >
                <div title="Appels de loyer" ></div>
                <div title="Quittancements" ></div>
                <div title="Rapprochement bancaire" ></div>
                <div title="Regularisations" ></div>
                <div title="Autres dépenses" ></div>
                <div title="Factures électricité" ></div>
                <div title="Compteurs" ></div>
            </Navbar>
            <Navbar image="database_search" label="Consultation" >
                <div title="Comptabilité" ></div>
                <div title="Comptes" ></div>
            </Navbar>
            <Navbar image="edit_document" label="Documents" showTitle={false}>
                <div title="Etat locatif" />
                <div title="Quittance" />
                <div title="Appel" />
                <div title="Attestation dépôt de garantie" />
                <div title="Consultation GED" />
            </Navbar>
            <Navbar image="settings" label="Paramètres" showTitle={false} >
                <div title="Lignes d'appel"></div>
                <div title="Règles de rapprochement"></div>
                <div title="Comptes comptables"></div>
                <div title="Bases de répartition"></div>
            </Navbar>
            <AllTests />
        </Navbar>
    )
}