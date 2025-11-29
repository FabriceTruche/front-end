import {dataHelper} from "./DataHelper";
import {TableData} from "../widgets/Table/Table";
import {Column} from "../common/common";


export type GenColumn = {
    name: string
    type: "number"|"string"|"Date"|"boolean"|"index"
    label?: string
    ratioNull?: number
    min?: number
    max?: number
}

export interface IGenHelper {
    generateData(genColumns: GenColumn[], count: number): any[]
    convertToDataTable(data: any[], columns: GenColumn[], labelPred?: (c: GenColumn) => string): TableData
}

class GenHelper implements IGenHelper {

    private checkNull<T>(gc: GenColumn, value: T): T|null {
        if (gc.ratioNull===undefined)
            return value

        return (gc.ratioNull>0 && Math.random()<gc.ratioNull) ? value : null
    }

    /**
     *
     * @param genColumns
     * @param count
     */
    public generateData(genColumns: GenColumn[], count: number): any[] {
        const rows: any[] = []
        let i=0

        while (i<count) {
            const row: {[prop:string]:any} = {}
            for(const genCol of genColumns) {

                switch (genCol.type) {
                    case "index":
                        row[genCol.name]=i+1
                        break;
                    case "number":
                        row[genCol.name]=this.checkNull(genCol, dataHelper.genInteger(genCol.min ?? 1,genCol.max ?? 100))
                        break;
                    case "string":
                        row[genCol.name]=this.checkNull(genCol, dataHelper.genWords(genCol.min ?? 1,genCol.max ?? 1))
                        break;
                    case "Date":
                        row[genCol.name]=this.checkNull(genCol, dataHelper.genDate().toLocaleDateString())
                        break;
                    case "boolean":
                        row[genCol.name]=this.checkNull(genCol, dataHelper.rand(0,1)>0.5)
                        break;
                }
            }
            rows.push(row)
            i++
        }

        return rows
    }

    /**
     *
     * @param data
     * @param columns
     * @param labelPred
     */
    public convertToDataTable(data: any[], columns: GenColumn[], labelPred?:(c:GenColumn)=>string): TableData {
        const inputData: TableData = {
            data: data,
            columns: columns.map((c: GenColumn):Column => ({
                name: c.name,
                type: c.type,
                sort: 0,
                filter: "",
                label: labelPred ? labelPred(c) : ( c.label ?? c.name )
            }))
        }
        return inputData
    }

}

export const dataGen: IGenHelper = new GenHelper()
