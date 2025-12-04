
export class DateHelper {

    private static _formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
    })


    /**
     *
     */
    public static get today():Date {
        return new Date()
    }

    /**
     *
     * @param d
     * @param dateDebut
     * @param dateFin
     */
    public static nbMois(dateDebut: Date, dateFin: Date): number {
        if (dateDebut>dateFin)
            return 0

        const a1 = dateDebut.getFullYear()
        const a2 = dateFin.getFullYear()
        const m1 = dateDebut.getMonth()
        const m2 = dateFin.getMonth()
        const j1 = dateDebut.getDate()
        const j2 = dateFin.getDate()
        const nbjMois1 = DateHelper.nbJourMois(dateDebut)
        const nbjMois2 = DateHelper.nbJourMois(dateFin)

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
    public static nbAnnee(dateDebut: Date, dateFin: Date): number {
        if (dateDebut>dateFin)
            return 0

        const a1 = dateDebut.getFullYear()
        const a2 = dateFin.getFullYear()
        const nbjAnnee1 = DateHelper.nbJourAnnee(a1)
        const nbjAnnee2 = DateHelper.nbJourAnnee(a2)
        const nbjDepuisPremierJanvier1 = DateHelper.nbJourDepuisPremierJanvier(dateDebut)
        const nbjDepuisPremierJanvier2 = DateHelper.nbJourDepuisPremierJanvier(dateFin)

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
    public static nbJour(dateDebut: Date, dateFin: Date): number {
        const msParJour = 1000 * 60 * 60 * 24
        const diff = Math.abs(dateFin.getTime()-dateDebut.getTime())

        return Math.round(diff/msParJour)
    }

    /**
     *
     * @param annee
     */
    public static nbJourAnnee(annee: number): number {
        const febDate: Date = new Date(annee, 1, 1)

        return 337 + DateHelper.nbJourMois(febDate)
    }

    /**
     *
     * @param date
     */
    public static nbJourDepuisPremierJanvier(date: Date): number {
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
    public static currentPeriode(): Date|null {
        return DateHelper.toPeriode(new Date())
    }

    /**
     *
     * @param d1
     * @param d2
     * @constructor
     */
    public static samePeriode(d1: Date, d2: Date): boolean {
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
    public static isEmpty(d1: Date): boolean {
        return d1===undefined || d1===null
        //throw new Error('Not implemented')
    }

    /**
     *
     * @param date
     * @constructor
     */
    public static nbJourMois(date: Date): number {
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
    public static nbJourLoyer(periode: Date, jour: number): [number,number] {
        const nbJour = DateHelper.nbJourMois(periode)

        return [jour, (nbJour - jour) + 1]
    }

    /**
     *
     * @param d
     */
    public static toStandardDate(d: Date): string {
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
    public static toPeriode(d: Date): Date|null {
        if (DateHelper.isEmpty(d))
            return null

        return new Date(d.getFullYear(),d.getMonth(),1)
    }

    /**
     *
     * @param d
     */
    public static periodeFormat(d : Date): string {
        return DateHelper._formatter.format(d)
    }

    /**
     *
     */
    public static aleatDate(): Date {
        return new Date(
            2025,
            (Math.random()*100)%12,
            (Math.random()*100)%28
        )
    }
}
