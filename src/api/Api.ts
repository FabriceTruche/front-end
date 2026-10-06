import axios, {AxiosResponse} from "axios";
import {helper} from "../common/Helper";

const domain = "http://192.168.1.57:3001"
const subDomain = "api"
const version = "v1"

/**
 *
 */
export interface ISqlApi {
    getAll(parameters?: any): Promise<AxiosResponse>
    getById(objectId: number|string): Promise<AxiosResponse>
    find(object: any): Promise<AxiosResponse>
}

/**
 *
 */
export interface ICommandApi {
    insert(object: any): Promise<AxiosResponse>
    upsert(object: any): Promise<AxiosResponse>
    update(object: any): Promise<AxiosResponse>
    delete(objectId: number): Promise<AxiosResponse>
}

/**
 *
 */
class Api {
    protected readonly _entityName: string

    /**
     *
     * @param entityName
     */
    constructor(entityName: string) {
        this._entityName = entityName
    }

    /**
     *
     * @param extension
     */
    protected getUrl(extension:string|number="") {
        return `${domain}/${subDomain}/${version}/${this._entityName}` + ((extension!=="") ? `/${extension}` : '')
    }

    protected getUrlMulti() {
        return `${domain}/${subDomain}/${version}/${this._entityName}s`
    }

}

/**
 *
 */
export class SqlApi extends Api implements ISqlApi {

    /**
     *
     * @param parameters
     */
    public async getAll(parameters?: any): Promise<AxiosResponse> {
        const path = this.getUrlMulti()

        return axios.get<any>(
            path, {
                transformResponse: (data) => helper.parseIsoDatesToObjects(data),
                params: {
                    ...parameters
                }
            })
    }

    /**
     *
     * @param objectId
     */
    public async getById(objectId: number|string): Promise<AxiosResponse> {
        const path = this.getUrl(objectId)

        return axios.get<any>(path)
    }

    /**
     *
     * @param object
     */
    public async find(object: any) : Promise<AxiosResponse> {
        const path = this.getUrl("find")

        return axios.post(path, object)
    }

}

/**
 *
 */
export class CommandApi extends Api implements ICommandApi {

    /**
     *
     * @param objectId
     */
    public async delete(objectId: number): Promise<AxiosResponse> {
        const path = this.getUrl(objectId)

        return axios.delete<any>(path)
    }

    /**
     *
     * @param object
     */
    public async upsert(object: any): Promise<AxiosResponse> {
        const path = this.getUrl()
        const entityObject = { _entityName: this._entityName, ...object }

        if (object.id === undefined || object.id === null) {

            // create new
            return axios.post(path, entityObject)

        } else {

            // update
            return axios.put(path, entityObject)
        }
    }

    /**
     *
     * @param object
     */
    public async update(object: any): Promise<AxiosResponse> {
        const path = this.getUrl()
        const entityObject = { _entityName: this._entityName, ...object }

        if (isNaN(object.ID))
            throw new Error(`invalide ${object.ID} id for update command`)

        // update
        return axios.put(path, entityObject)
    }

    /**
     *
     * @param object
     */
    public async insert(object: any): Promise<AxiosResponse> {
        const path = this.getUrl()
        const entityObject = { _entityName: this._entityName, ...object }

        // create new
        return axios.post(path, entityObject)
    }
}

/**
 *
 * @param entity
 */
export const createSqlApi: (entity: string) => ISqlApi = (entity: string) => new SqlApi(entity)
export const createCommandApi: (entity: string) => ICommandApi = (entity: string) => new CommandApi(entity)




// export type MetaDataItem = {
//     uiType: UiType;
//     isNullable: boolean;
//     isPrimaryKey: boolean;
//     isAutoIncrement: boolean;
//     isUnique: boolean;
//     maxLength?: number;
// }
//
// export type MetaData = Record<string, MetaDataItem>

