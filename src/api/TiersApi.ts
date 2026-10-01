import {ISqlApi, SqlApi} from "./Api";

export interface ITiersSqlApi extends ISqlApi {
}

class TiersSqlApi extends SqlApi implements ITiersSqlApi {
}

export const tiersSqlApi: ITiersSqlApi = new TiersSqlApi("tiers")
