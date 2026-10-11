import {TestPopWindow3} from "./TestPopWindow3";
import {TestPopWindow4} from "./TestPopWindow4";
import {TestButtonGroup} from "./TestButtonGroup";
import {TestPopWindow2} from "./TestPopWindow2";
import {TestPopWindow1} from "./TestPopWindow1";
import {TestButtonImage} from "./TestButtonImage";
import {TestPage1} from "./TestPage1";
import {MenuItem} from "../components/Menu";
import {TestTcd11} from "./TestTcd11";
import FormDemoMain from "../components/Form/FormDemoMain";
import {Table4} from "./Table/Table4";

const majestimRessource: string[] = [
    "tiers",
    "contrat",
    "lot",
    "----",
    "contratdetail",
    ]
const majestimConfig: string[] = [
    "compte",
    "natureoperation",
    ]
const majestimCompta: string[] = [
    "ecriture",
    "operation",
    "----",
    "opeecriture",
    "opeappel",
    "operappro",
    "operegul"
    ]
const majestimAppel: string[] = [
    "appel",
    "ligneappel",
    "----",
    "ligneappels",
    "ligneappelcontrat",
    "ligneappeldefinition",
    ]
const majestimDepense: string[] = [
    "depense",
    "depenses",
    "----",
    "lignedepense",
    ]
const majestimRapprochement: string[] = [
    "rappro",
    "reglerappro",
    "lignerappro",
    ]
const majestimRegul: string[] = [
    "comptage",
    "ligneregul",
    "charge",
    "regul",
    "----",
    "comptagedetail",
    "compteurlot",
    ]
const majestimBaseRepart: string[] = [
    "baserepart",
    "postecharge",
]

const menuOf = (options:string[])=>options.map((entity) => ({label: entity, content: ()=>Table4(entity)}))

export const allTests: MenuItem[] = [
    {
        label: "Containers", content: [
            {content: TestPage1},
            {content: TestPopWindow1},
            {content: TestPopWindow2},
            {content: TestPopWindow3},
            {content: TestPopWindow4},
        ]
    },
    {
        label: "Widgets", content: [
            {content: TestTcd11 },
            {content: ()=>Table4("contrat") },
        ]
    },
    {
        label: "UI", content: [
            {
                label: "List", content: [
                ]
            },
            {
                label: "Button", content: [
                    {content: TestButtonGroup},
                    {content: TestButtonImage},
                ]
            },
            {
                label: "Input", content: [
                    {content: FormDemoMain }
                ]
            },
        ]
    },{
        label: "MAJESTIM", content: [
            { content: menuOf(majestimRessource), label: "Ressource" },
            { content: menuOf(majestimConfig), label: "Config" },
            { content: menuOf(majestimCompta), label: "Compta" },
            { content: menuOf(majestimDepense), label: "Dépenses" },
            { content: menuOf(majestimRegul), label: "Regul de charges" },
            { content: menuOf(majestimAppel), label: "Appel de loyers" },
            { content: menuOf(majestimRegul), label: "Regul de lignes" },
            { content: menuOf(majestimBaseRepart), label: "Base de répartition" },
            { content: menuOf(majestimRapprochement), label: "Rapprochement bancaire" },
        ]
    }
]






// const majestimRessource: string[] = [
//     "appel",
//     "baserepart",
//     "charge",
//     "comptage",
//     "compte",
//     "contrat",
//     "depense",
//     "ecriture",
//     "ligneappel",
//     "ligneappelcontrat",
//     "ligneappeldefinition",
//     "lignedepense",
//     "lignerappro",
//     "ligneregul",
//     "lot",
//     "natureoperation",
//     "operation",
//     "postecharge",
//     "rappro",
//     "reglerappro",
//     "regul",
//     "tiers",
// ]
