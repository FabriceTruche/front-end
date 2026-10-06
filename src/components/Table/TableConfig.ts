import {FieldConfig} from "../Form/FormObject";
import {ColumnDefinition, SortOrder} from "../common/Column";
import {createSqlApi, ISqlApi} from "../../api/Api";
import {MetaData, MetaDataItem} from "../../common/SharedFrontBack";
import {helper} from "../../common/Helper";

/** État de configuration complet */
export type TableConfig = {
    allColumns: string[]
    columns: string[]
    filter?: string
    sorts?: Record<string, SortOrder>
    columnsDefinition: Record<string, ColumnDefinition>
    fieldsDefinition?: Record<string, FieldConfig>
}

/**
 *
 * @param md
 */
export async function createConfigFromMetadata(md: MetaData): Promise<TableConfig> {
    const cd: Record<string, ColumnDefinition> = {}
    const fd: Record<string, FieldConfig> = {}

    for (let key of Object.keys(md)) {

        // column definition
        const keyMetadata: MetaDataItem = md[key]
        const label: string = helper.convertToLabel(key)

        cd[key] = {
            label,
            dbType: keyMetadata.dbType
        }

        fd[key] = {
            label,
            uiType: keyMetadata.uiType,
        }

        if (keyMetadata.isPrimaryKey) {
            cd[key].label = '#'
            fd[key].label = '#'
            fd[key].disabled = true
        }

        if (keyMetadata.isForeignKey || keyMetadata.isEnum) {
            const sqlApi: ISqlApi = createSqlApi(keyMetadata.isEnum ? "enums" : "lists")
            const result = await sqlApi.getById(key)

            fd[key].multiple = false
            fd[key].options = result.data.data
        }

        if (keyMetadata.isCurrency) {
            cd[key].dbType = 'number'
            cd[key].mask = 'currency'
            cd[key].precision = 2
            fd[key].precisions = 2
        }

        if (keyMetadata.isReal) {
            cd[key].dbType = 'number'
            cd[key].precision = 2
            fd[key].precisions = 2
        }

        if (keyMetadata.dbType == "date") {
            cd[key].dbType = 'date'
            cd[key].mask = 'DD-MM-YY'
        }
    }

    return {
        columns: Object.keys(md),
        allColumns: Object.keys(md),
        columnsDefinition: cd,
        fieldsDefinition: fd,
    }
}

/**
 *
 * @param config
 */
export function createEmptyRowFromConfig(config: TableConfig) : any {
    const res: any = {}

    if (config.fieldsDefinition!==undefined) {

        for (let key of Object.keys(config.fieldsDefinition)) {
            const fd: FieldConfig = config.fieldsDefinition[key]

            if (fd.disabled)
                continue

            switch (fd.uiType || 'text') {

                case "checkbox":
                    res[key] = false
                    break;

                case "datalist":
                case "select":
                    res[key] = (fd.options && fd.options[0] && fd.options[0].value) || ""
                    break;

                case "date":
                case "datetime":
                case "month":
                case "time":
                    res[key] = null
                    break;

                case 'number':
                case "range":
                    res[key] = 0
                    break;

                case "password":
                case "tel":
                case "text":
                case "email":
                case "textarea":
                case "url":
                default:
                    res[key]=""
                    break;
            }
        }
    }

    return res
}

