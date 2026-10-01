import {TestPopWindow3} from "./containers/TestPopWindow3";
import {TestPopWindow4} from "./containers/TestPopWindow4";
import {TestButtonGroup} from "./ui/TestButtonGroup";
import {TestPopWindow2} from "./containers/TestPopWindow2";
import {TestPopWindow1} from "./containers/TestPopWindow1";
import {TestButtonImage} from "./ui/TestButtonImage";
import {Page1} from "./containers/Page1";
import {MenuItem} from "../widgets/Menu/Menu";
import {Tcd11} from "./Tcd/Tcd11";
import {Table1} from "./Table/Table1";
import FormDemoMain from "../containers/Form/FormDemoMain";
import {Table2} from "./Table/Table2";
import {Table3} from "./Table/Table3";
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
            {content: Page1},
            {content: TestPopWindow1},
            {content: TestPopWindow2},
            {content: TestPopWindow3},
            {content: TestPopWindow4},
        ]
    },
    {
        label: "Widgets", content: [
            {content: Tcd11 },
            {content: Table1 },
            {content: Table2 },
            {content: Table3 },
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
