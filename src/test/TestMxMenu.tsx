import {Menu, MenuItem} from "../components/Menu";
import React from "react";

export const testMxMenu: MenuItem[] = [

    {
        image: "business_center", label: "Actifs", content: [
            {image: "license", label: "Contrats"},
        ]
    },

    {
        image: "cycle", label: "Suivi", content: [
            {image: "home", label: "Appels de loyer"},
            {image: "home", label: "Quittancements"},
            {image: "home", label: "Rapprochement bancaire"},
            {image: "home", label: "Regularisations"},
            {image: "home", label: "Autres dépenses"},
            {image: "home", label: "Factures électricité"},
            {image: "home", label: "Compteurs"},
        ]
    },

    {
        image: "currency_exchange", label: "Compta/Banque", content: [
            {image: "home", label: "Rapprochement bancaire"},
            {image: "home", label: "Autres dépenses"},
            {image: "home", label: "Opération diverse"},
        ]
    },

    {
        image: "database_search", label: "Consultation", content: [
            {image: "home", label: "Comptabilité"},
            {image: "home", label: "Comptes"},
        ]
    },

    {
        image: "edit_document", label: "Documents", content: [
            {image: "home", label: "Etat locatif"},
            {image: "home", label: "Quittance"},
            {image: "home", label: "Appel"},
            {image: "home", label: "Attestation dépôt de garantie"},
            {image: "home", label: "Consultation GED"},
        ]
    },

    {
        image: "settings", label: "Paramètres", content: [
            {image: "home", label: "Lignes d'appel"},
            {image: "home", label: "Règles de rapprochement"},
            {image: "home", label: "Comptes comptables"},
            {image: "home", label: "Bases de répartition"},
        ]
    },
]

export const MxMenu = () => <Menu items={testMxMenu}/>
