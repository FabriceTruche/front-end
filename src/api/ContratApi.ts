import axios, {AxiosResponse} from "axios";
import {ISqlApi, SqlApi} from "./Api";

export interface IContratApi extends ISqlApi {
    contratsActifs: () => Promise<AxiosResponse>
}

class ContratSqlApi extends SqlApi implements IContratApi {
    public contratsActifs(): Promise<AxiosResponse> {
        return axios.get<any>(this.getUrl('contratsActifs'))
    }
}

export const contratSqlApi: IContratApi = new ContratSqlApi("contrat")
