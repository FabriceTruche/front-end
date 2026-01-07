import {AnyObject, DbColumn, ResponseQuery} from "./common";
import {ITableData} from "../widgets/Table/TableData";
import {factory} from "./Factory";
import {IColumn} from "../widgets/Table/Column";
import {CSSProperties} from "react";
import {createTcdColumn, ITcdColumn} from "../widgets/Tcd/model/TcdColumn";

export type GenColumn = {
    name: string
    type: "integer"|"string"|"Date"|"boolean"|"index"|"float"
    total?: boolean
    label?: string
    ratioNull?: number
    min?: number
    max?: number
    items?: any[]
}

export interface IHelper {

    // common
    display(data: any[], showHierarchy?: boolean): void
    ifStr(cond:boolean,str:string):string

    // DTO / Object
    findItem<T,U>(items:T[],predicat:((item:T)=>boolean),returnValue:((item:T)=>U),defaultValue:U):U
    getById<T extends {id:string} >(items:T[],id:string):T|null

    // table
    convertToTableData<T>(response:any, pred?:(c:DbColumn)=>string): ITableData<T>

    // api / sql
    executeQuery(sql:string): Promise<ResponseQuery>

    // data generator
    tf(pc?:number):boolean
    genKey():string
    genFromList(items: any[]): any
    genNumber(min:number, max:number):number
    genInteger(min:number, max:number):number
    genFloat(min:number, max:number):number
    genWords(min:number, max:number):string
    genWordsArray(min?:number, max?:number,predicate?:(item:string, index:number)=>string):string[]
    genDate():Date
    aleatDate(): Date
    rand(min: number, max: number): number
    generateData(genColumns: GenColumn[], count: number, validate?: (row:any)=>void): any[]
    generateTcdColumn(genColumns: GenColumn[]): ITcdColumn[]
    convertToDataTable<T>(data: any[], columns: GenColumn[], labelPred?: (c: GenColumn) => string): ITableData<T>

    // date managment
    today:Date
    nbMois(dateDebut: Date, dateFin: Date): number
    nbAnnee(dateDebut: Date, dateFin: Date): number
    nbJour(dateDebut: Date, dateFin: Date): number
    nbJourAnnee(annee: number): number
    nbJourDepuisPremierJanvier(date: Date): number
    currentPeriode(): Date|null
    samePeriode(d1: Date, d2: Date): boolean
    isEmpty(d1: Date): boolean
    nbJourMois(date: Date): number
    nbJourLoyer(periode: Date, jour: number): [number,number]
    toStandardDate(d: Date): string
    toPeriode(d: Date): Date|null
    periodeFormat(d : Date): string

    // UI text width calculation
    getCssStyleById(prop:string,elementId:string):string
    getCssStyle(prop:string,element:Element):string
    getWidthFromText(text:string, element:Element):number
    getMaxWidthFromArray(text:string[], element:Element):number
    getMaxWidthFromArrayById(text:string[], elementId:string):number
    getMaxWidthFromCollectionById(collection:ITableData<{[strProp: string]: string}>, elementId:string, extension?:number): {[strProp: string]: number}
    mergeClassName(cls1: string|undefined, cls2: string|undefined): string|undefined
    mergeCSSProperties(style1: CSSProperties|undefined, style2: CSSProperties|undefined): CSSProperties|undefined

}

class _Helper implements IHelper {

    private static canvas: HTMLCanvasElement = document.createElement("canvas")
    private static context: CanvasRenderingContext2D|null = _Helper.canvas.getContext("2d")

    private defaultPredicate = (item: string, index: number): string => `${index} - ${item}`
    private words: string[] = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur culpa debitis, dolore enim explicabo fuga id illo laboriosam nesciunt placeat quis quo quos ratione rerum, similique temporibus ullam voluptatum. A adipisci deserunt dolores, ea, ex exercitationem fugit hic id ipsum nesciunt nostrum nulla optio praesentium quaerat quibusdam quo quod vitae voluptate. Autem cupiditate in labore maiores nesciunt nulla, perspiciatis quos similique ullam. Amet aspernatur magnam molestias neque nisi odio odit placeat porro praesentium quaerat, quidem quod repudiandae sed. Consectetur corporis delectus distinctio dolores ducimus esse ex facilis iusto laudantium libero nostrum, odio praesentium quia reiciendis rem repellendus rerum sequi suscipit ullam voluptas? Dignissimos distinctio dolore ea enim hic incidunt laudantium, maxime nesciunt provident quasi quod quos suscipit temporibus, velit voluptas! Amet consectetur libero repudiandae, similique tempora voluptate! Dignissimos exercitationem nulla obcaecati quasi. Assumenda atque autem, blanditiis commodi consequatur cum deserunt dicta ducimus eius eligendi eveniet excepturi exercitationem facilis fuga fugiat harum ipsa iusto laboriosam necessitatibus nobis quidem ratione, saepe ullam, unde veritatis! A aperiam aspernatur beatae dolor dolore earum possimus quam totam ut veritatis. Necessitatibus possimus reiciendis vel. Cupiditate eveniet reiciendis sed! Commodi consequuntur doloribus eligendi fuga fugiat fugit iusto, minima possimus quia repudiandae tempore vitae, voluptas voluptate. Ab accusamus eligendi fuga harum magnam numquam, odit reiciendis? A accusantium alias amet architecto, aspernatur assumenda atque autem cumque cupiditate delectus dolore eaque excepturi facilis fuga fugiat fugit harum hic illum iure labore laboriosam molestiae molestias neque nihil perferendis quisquam voluptas voluptatem! Culpa cum, earum est exercitationem hic modi praesentium? Error esse sapiente sed! Architecto itaque iusto odit vel velit. A alias amet aut autem cum debitis, delectus deserunt dolore dolorem doloribus facilis, inventore ipsam labore maxime molestias nam nemo neque nesciunt officiis ratione similique sunt tenetur totam, velit voluptatum! Accusantium aliquid animi aperiam atque corporis, cumque dolores error esse et eum expedita facere hic ipsum, modi nulla officia perferendis possimus quisquam quod quos reiciendis sapiente sequi sunt tempore, totam unde velit veritatis vitae voluptas voluptatem! Asperiores deserunt dicta doloremque ea ex harum incidunt iusto nulla obcaecati, odio, quae, quasi quidem quos ratione rerum unde veniam vero voluptatum. Amet assumenda doloribus earum excepturi facere magni nemo, perspiciatis quibusdam reiciendis tenetur. Beatae consequuntur corporis eligendi ipsa modi nam natus officia! Amet ea eveniet ex minima porro sunt tempore. Accusamus cum delectus dolore, dolorum ducimus eos est explicabo fuga hic illo impedit ipsam, laborum laudantium perspiciatis praesentium quaerat quia, rem sit suscipit veniam? Adipisci animi corporis culpa delectus deleniti dignissimos dolore dolorem dolores facilis illo incidunt itaque iusto maiores maxime necessitatibus nesciunt nihil nulla omnis pariatur quisquam repellat similique sit sunt ullam, ut veritatis voluptates, voluptatum? A commodi harum inventore minus, nemo, perferendis praesentium quasi quod, quos recusandae reiciendis voluptatem. A commodi cupiditate deleniti dolore dolorum fugiat in inventore iusto numquam obcaecati? Dolor doloremque eius eligendi, laborum necessitatibus omnis soluta sunt tempore vero voluptates? Accusantium aperiam facere labore neque officia omnis quaerat quidem tempore, ut voluptatum! Accusantium consectetur deserunt eaque enim id maxime quia? Adipisci aliquid amet commodi consectetur cum enim explicabo harum illum incidunt iste itaque laborum molestiae nisi nulla perferendis placeat, quas quasi, recusandae temporibus vitae. Adipisci asperiores commodi dolorum eius ex fugiat harum illum maiores nesciunt nobis nostrum odio placeat quidem quisquam reiciendis totam, voluptate voluptates? Accusantium aliquid ducimus enim facilis, maxime natus nostrum nulla odio quaerat totam ullam ut. A, accusantium alias aliquid at cum eos esse impedit labore magnam, magni modi perferendis quis repellendus ullam ut velit voluptatem. Ab aliquam aperiam asperiores aspernatur beatae consequatur, eos est et ex facere fuga id magnam minus molestias nemo, optio qui quis, quod ullam vel! A accusantium aliquid amet architecto autem commodi consectetur corporis doloremque doloribus ea ex excepturi id impedit natus non odio officiis quaerat quam, quia quod repellat repellendus saepe totam ullam vitae! Ab assumenda delectus deleniti dolore doloribus ducimus eius eligendi esse est facilis iste itaque labore magnam magni maxime minima neque nesciunt obcaecati odit perspiciatis porro quaerat quam quasi quia quibusdam quo quod repudiandae sequi similique suscipit tempora tenetur ullam ut vero vitae voluptatem, voluptates. Accusamus accusantium aliquid aut commodi ea illum nisi vitae? Consequuntur cupiditate delectus ea eligendi hic iste molestias nam nulla, obcaecati voluptatibus. Aliquid architecto aspernatur commodi consequatur cumque dolore doloremque doloribus, dolorum explicabo ipsum itaque labore magni minima natus obcaecati odio possimus qui quo ratione repellendus rerum similique tenetur ullam ut vel veritatis voluptas voluptatum. Ab aliquid, atque corporis delectus deserunt dolore ducimus ea exercitationem fuga id iusto mollitia nesciunt nulla numquam perferendis quaerat sequi similique ut veritatis vero? Consectetur eligendi eos placeat repudiandae? Accusamus accusantium commodi consequatur dolorum error eveniet exercitationem illum in, minima necessitatibus nulla perferendis quam qui repellat rerum sunt tempore unde voluptatibus? Aliquid assumenda beatae consectetur, consequatur cum delectus distinctio doloremque dolorum ea error fugit harum illum inventore ipsa ipsam ipsum iste minus nesciunt placeat quidem repellat reprehenderit sed sequi, suscipit ullam ut veniam voluptatem? Aperiam asperiores atque consequuntur corporis delectus dicta fugit hic incidunt iure laudantium libero magnam minima modi molestias nihil odio optio, quaerat quibusdam quos recusandae reiciendis soluta veniam voluptas! Dicta dignissimos distinctio eveniet excepturi libero natus optio qui quibusdam ullam ut. Aspernatur corporis error ex, facere impedit ipsa nisi non ratione similique veniam. Amet aut delectus ducimus eligendi enim eveniet exercitationem ipsam magnam natus officiis pariatur porro, quae repellendus sunt unde? Accusantium aliquid amet animi aspernatur consequatur corporis cupiditate debitis ducimus est ex exercitationem harum ipsam magnam modi, molestiae mollitia neque nesciunt nobis odit officiis, pariatur perspiciatis provident quaerat quis quo quod rem repellat repellendus, sapiente sequi sunt suscipit temporibus totam ut vel veniam vero! Ab accusamus at, atque culpa debitis dolorem eius harum itaque, modi molestias necessitatibus officia quia quisquam recusandae saepe sed tenetur ullam unde velit voluptatum. Ab cupiditate delectus iusto quaerat qui quibusdam recusandae saepe sit ullam veritatis? Alias asperiores beatae distinctio ex fuga id ipsam labore laborum laudantium magni, minus non obcaecati perspiciatis, quia reprehenderit similique vero! Amet, architecto, at cupiditate deserunt doloribus enim esse harum minus mollitia nam nihil porro quaerat reprehenderit repudiandae sed sequi voluptatum! Aperiam earum nulla odit.".split(' ')

    /*********************************************************************************************************
     * PRIVATE
     */
    private _formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
    })

    private getValue(gc: GenColumn, value: any): any|null {
        let v: any | null = null

        if (gc.ratioNull===undefined) {
            v = value
        } else {
            if (gc.ratioNull>0 && Math.random()<gc.ratioNull) {
                v = value
            } else {
                v = null
            }
        }

        if (v !== null) {
            if (gc.items !== undefined) {
                v = gc.items[this.genInteger(0, gc.items.length - 1)]
            }
        }

        return v
    }

    /*********************************************************************************************************
     * date managment
     */

    /**
     *
     */
    public get today():Date {
        return new Date()
    }

    /**
     *
     * @param d
     * @param dateDebut
     * @param dateFin
     */
    public nbMois(dateDebut: Date, dateFin: Date): number {
        if (dateDebut>dateFin)
            return 0

        const a1 = dateDebut.getFullYear()
        const a2 = dateFin.getFullYear()
        const m1 = dateDebut.getMonth()
        const m2 = dateFin.getMonth()
        const j1 = dateDebut.getDate()
        const j2 = dateFin.getDate()
        const nbjMois1 = this.nbJourMois(dateDebut)
        const nbjMois2 = this.nbJourMois(dateFin)

        // nb mois des années entre les 2 dates
        let nbMois: number = 0

        if (a2>a1) {
            nbMois = (a2 - (a1 + 1)) * 12 // nb mois des années entre les 2 dates
            nbMois += (11-m1) // nb mois de d1 jsuque fin de la même année
            nbMois += m2 // nb mois du 1er janvier jusqu'au mois de d2
            nbMois += ((nbjMois1-j1)+1)/nbjMois1
            nbMois += j2/nbjMois2
        }
        else {
            if (m2>m1) {
                nbMois = (m2 - m1) - 1
                nbMois += ((nbjMois1-j1)+1)/nbjMois1
                nbMois += j2/nbjMois2
            } else {
                nbMois = ((j2-j1)+1) / nbjMois1
            }
        }

        return nbMois
    }

    /**
     *
     * @param d
     * @param dateDebut
     * @param dateFin
     */
    public nbAnnee(dateDebut: Date, dateFin: Date): number {
        if (dateDebut>dateFin)
            return 0

        const a1 = dateDebut.getFullYear()
        const a2 = dateFin.getFullYear()
        const nbjAnnee1 = this.nbJourAnnee(a1)
        const nbjAnnee2 = this.nbJourAnnee(a2)
        const nbjDepuisPremierJanvier1 = this.nbJourDepuisPremierJanvier(dateDebut)
        const nbjDepuisPremierJanvier2 = this.nbJourDepuisPremierJanvier(dateFin)

        // nb mois des années entre les 2 dates
        let nbAnnees: number = 0

        if (a2>a1) {
            nbAnnees = a2 - (a1 + 1) // nb annees entre les 2 dates
            nbAnnees += ((nbjAnnee1-nbjDepuisPremierJanvier1)+1)/nbjAnnee1
            nbAnnees += nbjDepuisPremierJanvier2/nbjAnnee2
        }
        else {
            nbAnnees = ((nbjDepuisPremierJanvier2-nbjDepuisPremierJanvier1)+1)/nbjAnnee1
        }

        return nbAnnees
    }

    /**
     *
     * @param dateDebut
     * @param dateFin
     */
    public nbJour(dateDebut: Date, dateFin: Date): number {
        const msParJour = 1000 * 60 * 60 * 24
        const diff = Math.abs(dateFin.getTime()-dateDebut.getTime())

        return Math.round(diff/msParJour)
    }

    /**
     *
     * @param annee
     */
    public nbJourAnnee(annee: number): number {
        const febDate: Date = new Date(annee, 1, 1)

        return 337 + this.nbJourMois(febDate)
    }

    /**
     *
     * @param date
     */
    public nbJourDepuisPremierJanvier(date: Date): number {
        // 1. Créer une nouvelle date qui représente le 1er janvier de l'année en cours
        // Le mois est 0 pour janvier, le jour est 1.
        const startOfYear = new Date(date.getFullYear(), 0, 1);

        // 2. Calculer la différence en millisecondes entre les deux dates
        const diff = date.getTime() - startOfYear.getTime();

        // 3. Convertir la différence de millisecondes en jours
        // (1000 ms/s * 60 s/min * 60 min/h * 24 h/jour)
        const oneDayInMs = 1000 * 60 * 60 * 24;

        // 4. Diviser et arrondir à l'entier inférieur pour obtenir les jours complets écoulés
        const dayNumber = Math.floor(diff / oneDayInMs);

        // 5. Ajouter 1 au résultat, car le jour 1 (1er janvier) a 0 jour écoulé
        return dayNumber + 1;
    }


    /**
     *
     */
    public currentPeriode(): Date|null {
        return this.toPeriode(new Date())
    }

    /**
     *
     * @param d1
     * @param d2
     * @constructor
     */
    public samePeriode(d1: Date, d2: Date): boolean {
        if (d1 === null || d2 === null)
            return false

        const m1 = d1.getMonth()
        const m2 = d2.getMonth()
        const a1 = d1.getFullYear()
        const a2 = d2.getFullYear()

        return a1===a2 && m1===m2
        //throw new Error('Not implemented')
    }

    /**
     *
     * @param d1
     * @constructor
     */
    public isEmpty(d1: Date): boolean {
        return d1===undefined || d1===null
        //throw new Error('Not implemented')
    }

    /**
     *
     * @param date
     * @constructor
     */
    public nbJourMois(date: Date): number {
        const m = date.getMonth()
        const a = date.getFullYear()

        return new Date(a,m+1,0).getDate()
    }

    /**
     *
     * @param periode
     * @param jour
     * @constructor
     */
    public nbJourLoyer(periode: Date, jour: number): [number,number] {
        const nbJour = this.nbJourMois(periode)

        return [jour, (nbJour - jour) + 1]
    }

    /**
     *
     * @param d
     */
    public toStandardDate(d: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit', // Garantit le zéro de remplissage
            day: '2-digit',   // Garantit le zéro de remplissage
        };

        // Le format 'sv-SE' (Suédois) est la seule locale standard qui produit
        // nativement l'ordre AAAA-MM-JJ
        return d.toLocaleDateString('sv-SE', options);

        // if (DateHelper.isEmpty(d))
        //     return 'null'
        //
        // return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    }

    /**
     *
     * @param d
     */
    public toPeriode(d: Date): Date|null {
        if (this.isEmpty(d))
            return null

        return new Date(d.getFullYear(),d.getMonth(),1)
    }

    /**
     *
     * @param d
     */
    public periodeFormat(d : Date): string {
        return this._formatter.format(d)
    }

    /**
     *
     */
    public aleatDate(): Date {
        return new Date(
            2025,
            (Math.random()*100)%12,
            (Math.random()*100)%28
        )
    }

    /*********************************************************************************************************
     * data generator
     */
    rand(min: number, max: number): number {
        return min + (Math.random()*(max-min))
    }
    genDate():Date {
        return new Date(
            this.rand(2010,2025),
            this.rand(1,12),
            this.rand(1,31),
        )
    }
    genFromList(items: any[]): any {
        return items[this.genInteger(0, items.length)]
    }
    genInteger(min: number, max: number): number {
        return Math.trunc(this.genNumber(min,max))
    }
    genFloat(min: number, max: number): number {
        return this.genNumber(min,max)
    }
    genWordsArray(min:number=10, max:number=100, predicate: (item: string, index: number) => string=this.defaultPredicate): string[] {
        const N = this.genInteger(min,max)
        const res=[]
        Math.random()
        for(let i=0; i<N; i++)
            res.push(predicate(this.genWords(1,2),1+i))
        return res
    }
    genKey(): string {
        return Math.random().toString(36).substring(2)
    }
    genNumber(min: number, max: number): number {
        const v = min+(Math.random()*((max+1)-min))
        return Math.trunc(v*1000)/1000
    }
    genWords(min: number=1, max: number=5): string {
        const N = this.genInteger(min,max)
        const len=this.words.length-1
        const res=[]
        for(let i=0; i<N; i++)
            res.push(this.words[this.genInteger(0,len)])
        return res.join(' ')
    }

    /********************************************************************************
     * code helper
     */
    ifStr(cond: boolean, str: string): string {
        return cond ? str : ""
    }

    tf(pc: number=0.5): boolean {
        return (Math.random() < pc)
    }

    /********************************************************************************
     * UI text width calculation
     */


    // private _getWidthFromTextAndFont(text:string, font:string):number {
    //     return this._getWidthText(text,font)
    // }

    /*********************************************************************************************************
     * sql local database
     */
    public async executeQuery(sql: string): Promise<ResponseQuery> {
        return new Promise<ResponseQuery>((resolve, reject) =>
            fetch(
                'http://192.168.1.57:3001/api/query?_noPagine',
                {
                    headers: {'Accept': 'application/json'},
                    method: "POST",
                    body: sql
                }).then((response) => {
                return response.json()
            }).then((response: any) => {
                // console.log(response.result)
                if (response.error === undefined)
                    resolve(response.result)
                else
                    reject(response)
            }).catch((error: any) => {
                    reject(error)
                }
            )
        )
    }

    /***
     * find ex
     * @param items
     * @param predicat
     * @param returnValue
     * @param defaultValue
     */
    public findItem<T, U>(items: T[], predicat: ((item: T) => boolean), returnValue: ((item: T) => U), defaultValue: U): U {
        const index: number = items.findIndex((item: T) => predicat(item))
        return (index === -1) ? defaultValue : returnValue(items[index])
    }

    /**
     *
     * @param items
     * @param id
     */
    public getById<T extends { id: string }>(items: T[], id: string): T | null {
        const index: number = items.findIndex((item: T) => item.id === id)
        return (index === -1) ? null : items[index]
    }


    /**
     *
     * @param response
     * @param pr
     */
    public convertToTableData<T>(response: any, pr?: (c: DbColumn) => string): ITableData<T> {
        const pred = (pr === undefined) ? (c: DbColumn): string => c.name : pr

        if (response.error === undefined) {
            // const inputData: ITableData<T> = {
            //     data: response.data,
            //     columns: response.meta.map((c: DbColumn) => ({
            //         name: c.name,
            //         type: c.type,
            //         sort: 0,
            //         filter: "",
            //         label: pred(c)
            //     }))
            // }
            // return inputData

            return factory.createTableData(
                response.data,
                response.meta.map((c: DbColumn) => ({
                    name: c.name,
                    type: c.type,
                    sort: 0,
                    filter: "",
                    label: pred(c)
                })))
        }
        return factory.createTableData<T>()
    }


    /**
     *
     * @param genColumns
     * @param count
     * @param validate
     */
    public generateData(genColumns: GenColumn[], count: number, validate?: (row:any)=>void ): any[] {
        const rows: any[] = []
        let i=0

        while (i<count) {
            const row: {[prop:string]:any} = {}

            for(const genCol of genColumns) {
                const items: any[]|undefined = genCol.items

                switch (genCol.type) {
                    case "index":
                        row[genCol.name]=i+1
                        break;
                    case "integer":
                        row[genCol.name]=this.getValue(genCol, this.genInteger(genCol.min ?? 1,genCol.max ?? 100))
                        break;
                    case "float":
                        row[genCol.name]=this.getValue(genCol, this.genFloat(genCol.min ?? 1,genCol.max ?? 100))
                        break;
                    case "string":
                        row[genCol.name]=this.getValue(genCol, this.genWords(genCol.min ?? 1,genCol.max ?? 1))
                        break;
                    case "Date":
                        row[genCol.name]=this.getValue(genCol, this.genDate())
                        break;
                    case "boolean":
                        row[genCol.name]=this.getValue(genCol, this.rand(0,1)>0.5)
                        break;
                }
            }

            if (validate !== undefined)
                validate(row)

            rows.push(row)
            i++
        }

        return rows
    }

    public generateTcdColumn(genColumns: GenColumn[]): ITcdColumn[] {
        const tcdColumns: ITcdColumn[] = []
        let type: string = ""

        genColumns.forEach((genCol: GenColumn, index:number)=>{
                switch (genCol.type) {
                    case "index":
                        type = "number"
                        break;
                    case "Date":
                        type = "date"
                        break;
                    default:
                    case "integer":
                    case "float":
                    case "string":
                    case "boolean":
                        type = genCol.type
                        break;
                }
                tcdColumns.push(createTcdColumn(genCol.name, type, genCol.total, genCol.label))
            })

        return tcdColumns
    }
    /**
     *
     * @param data
     * @param columns
     * @param labelPred
     */
    public convertToDataTable<T>(data: any[], columns: GenColumn[], labelPred?:(c:GenColumn)=>string): ITableData<T> {
        // const inputData: TableData<T> = {
        //     data: data,
        //     columns: columns.map((c: GenColumn):Column => new Column(c.name, c.type, labelPred ? labelPred(c) : ( c.label ?? c.name )))
        // }
        return factory.createTableData(
            data,
            columns.map((c: GenColumn): IColumn => factory.createColumn(c.name, c.type, labelPred ? labelPred(c) : (c.label ?? c.name)))
        )
    }


    private _getWidthText(text:string, font:string):number {
        if (_Helper.context===null)
            return 0

        _Helper.context.font = font;
        const metrics = _Helper.context.measureText(text);

        return metrics.width;
    }
    private _getCanvasFont(el:Element = document.body) {
        const fontWeight = this.getCssStyle('font-weight',el) || 'normal';
        const fontSize = this.getCssStyle('font-size',el) || '16px';
        const fontFamily = this.getCssStyle('font-family',el) || 'Times New Roman';

        return `${fontWeight} ${fontSize} ${fontFamily}`;
    }

    getWidthFromText(text:string, element:Element):number {
        return this._getWidthText(text,this._getCanvasFont(element))
    }
    getMaxWidthFromArray(textArr:string[], element:Element):number{
        const font:string=this._getCanvasFont(element)
        return textArr.reduce<number>((prevValue:number,text:string)=>Math.max(prevValue,this._getWidthText(text,font)),0)
    }
    getMaxWidthFromArrayById(textArr:string[], elementId:string):number{
        const element:Element|null=document.getElementById(elementId)
        if (element===null)
            return -1
        const font:string=this._getCanvasFont(element)
        return textArr.reduce<number>((prevValue:number,text:string)=>Math.max(prevValue,this._getWidthText(text,font)),0)
    }
    getMaxWidthFromCollectionById(collection:ITableData<{[strProp: string]: string}>, elementId:string, extension?:number):{[strProp: string]: number} {
        const element:Element|null=document.getElementById(elementId)
        let res:AnyObject={}

        if (element) {
            const font: string = this._getCanvasFont(element)

            collection.columns.forEach((c: IColumn) => {
                let tableDataStr: string[] = collection.data.map((row: {[strProp: string]: string}) => row[c.name].toString() )
                tableDataStr.push(c.label)
                res[c.name] = Math.ceil(this.getMaxWidthFromArray(tableDataStr, element) + (extension===undefined?0:extension)) + "px"
            })
        }

        return res
    }
    getCssStyle(prop:string,element:Element):string {
        return window.getComputedStyle(element, null).getPropertyValue(prop);
    }
    getCssStyleById(prop:string,elementId:string):string {
        const elt:Element|null=document.getElementById(elementId)
        if (elt)
            return window.getComputedStyle(elt, null).getPropertyValue(prop);
        return ""
    }

    /**
     *
     * @param cls1
     * @param cls2
     */
    mergeClassName(cls1: string|undefined, cls2: string|undefined): string|undefined {
        if (cls1===undefined)
            return cls2

        if (cls2===undefined)
            return cls1

        return cls1 + " " + cls2
    }
    mergeCSSProperties(style1: CSSProperties|undefined, style2: CSSProperties|undefined): CSSProperties|undefined {
        return {...style1,...style2}
    }

    display(data: any[], showHierarchy: boolean=false): void {

        const len=(d:any)=>(d===null) ? 0 : toStr(d).length
        const txt=(prevVal: any, curVal: any, colName:string, n: number, car: string)=> {
            let value = curVal

            // hide dup
            if (showHierarchy && prevVal && prevVal===curVal) {
                value="·"
            }

            // padEnd the value with spaces
            return ((value===null) ? "" : toStr(value)).padEnd(n, car)
        }
        const toStr=(t:any)=>{
            if (t instanceof Date) {
                return (t as Date).toLocaleDateString()
            }
            return (t===undefined) ? "" : t.toString().replaceAll("\n"," ")
        }
        if (data.length===0)
            return

        // liste des noms de colonnes depuis la liste des attributs du premier objet de la liste
        const header: string[] = [...Object.keys(data[0])]

        // créer un objet dont la valeur = nom des colonnes
        let headerObjet: any = {}
        let sep: any = {}
        header.forEach((h:string)=> {
            headerObjet[h] = h
            sep[h]=""
        })

        const newData: any[] = [headerObjet,sep,...data]

        // largeur des colonnes selon les data
        const columnLen: number[] = [...header.map((h:string)=>newData.reduce((currMax:number, obj:any)=>Math.max(currMax,len(obj[h])),0))]

        console.log('')
        console.log('DISPLAY DATA TABLE :')
        console.log('')
        newData.forEach((r: any, indexRow: number)=>{
            const car: string = (indexRow===1) ? '-' : ' '
            const row: string = header.map((colHeaderName: string, indexColHeader :number)=> {
                const prevRow = indexRow>2 ? newData[indexRow-1] : null
                const curRow = newData[indexRow]
                const prevVal = prevRow ? prevRow[colHeaderName] : null
                const curVal = curRow[colHeaderName]

                return txt(prevVal, curVal, colHeaderName, columnLen[indexColHeader], car)

            }).join('|')
            console.log(row)
        })
    }


}

export const helper:IHelper = new _Helper()
