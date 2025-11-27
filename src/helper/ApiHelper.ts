import {ResponseQuery} from "../common/common";

export interface IApiHelper {
    // sql local database
    executeQuery(sql:string): Promise<ResponseQuery>

}
class ApiHelper implements IApiHelper {
    executeQuery(sql: string): Promise<ResponseQuery> {
        throw new Error("Not implemented")
    }
}

export const apiHelper: IApiHelper = new ApiHelper()