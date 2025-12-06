import {useState} from "react";
import {AnyObject, DbColumn} from "../../common/common";
import {Buttons} from "../../ui/Button/Buttons";
import {Button} from "../../ui/Button/Button";

export const TestXArray2 = ()=> {
    const [sql,setSql]=useState("")

    const mapLabels: AnyObject = {
        DateEntreePrevue: "Date entrée prévisionnelle",
        DateSortiePrevue: "Date sortie prévisionnelle",
        DateEntree: "Date entrée",
        DateSortie: "Date sortie",
        ChargesCommunes: "Charges communes",
        DepotGarantie: "Dépôt de garantie",
        PatternReleve: "Masque recherche",
        LoyerPrincipal: "Loyer principal",
        TaxeFonciere: "Taxe foncière",
        TypeContrat_ID: "Type contrat (id)",
        Irl_ID: "IRL (id)",
        ID: "id"
    }
    const mapLabel = (column: DbColumn) => {
        const headerName: string = column.name
        const label: string | undefined = mapLabels[headerName]
        return (label === undefined) ? headerName : label
    }

    console.log('render de TestXArray2')

    return (
        <div>
            <Buttons>
                <Button
                    onClick={()=>{
                        // setSql('select 1 as "col1",2 as "col2",3 as "col3" union select 4,5,6')
                        setSql('select * from contrat')
                    }}>
                    Select 1
                </Button>
                <Button
                    onClick={()=>{
                        // setSql('select 1 as "col1",2 as "col2" union select 4,5')
                        setSql('select * from adresse')
                    }}>
                    Select 2
                </Button>
            </Buttons>
            {/*{(sql!=="") && (*/}
            {/*    <TableFromSql*/}
            {/*        sql={sql}*/}
            {/*        labelName={mapLabel}*/}
            {/*        viewportHeight={600}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    )
}
