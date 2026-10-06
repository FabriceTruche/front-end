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

const entities: string[] = [
"appel",
"baserepart",
"charge",
"comptage",
"compte",
"contrat",
"depense",
"ecriture",
"ligneappel",
"ligneappelcontrat",
"ligneappeldefinition",
"lignedepense",
"lignerappro",
"ligneregul",
"lot",
"natureoperation",
"operation",
"postecharge",
"rappro",
"reglerappro",
"regul",
"tiers",
     ]

const entitiesForm = ()=>entities.map((entity) => ({label: entity, content: ()=>Table4(entity)}))

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
        label: "Entities", content: entitiesForm()
    }
]
