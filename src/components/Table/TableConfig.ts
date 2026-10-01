//import {TableColumnFormat} from "./TableColumn";
import {ColumnDefinition, SortOrder} from "../common/ColumnDefinition";
import {FieldConfig} from "../../containers/Form/FormObject";
import {MetaData} from "../../model/Api";

/** État de configuration complet */
export type TableConfig = {
    allColumns: string[]
    columns: string[]
    filter?: string
    sorts?: Record<string, SortOrder>
    columnsDefinition: Record<string, ColumnDefinition>
    fieldsDefinition?: Record<string, FieldConfig>
}

export function createConfigFromMetadata(md: MetaData): TableConfig {
    const cd: Record<string, ColumnDefinition> = {}
    const fd: Record<string, FieldConfig> = {}

    Object.keys(md).forEach((key) => {

        cd[key] = {
        }

        fd[key] = {
            type: md[key].uiType
        }

    })

    return  {
        columns: Object.keys(md),
        allColumns: Object.keys(md),
        columnsDefinition: cd,
        fieldsDefinition: fd,
    }
}