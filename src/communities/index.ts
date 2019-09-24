import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IRestResource,
  ISearchParams
} from "../types"
import byIds from "./byIds"
import searchSummary from "./searchSummary"

const communities = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<ICommunity | IMHBOListing> => ({
  byIds: (params: number[]) =>
    byIds(params, creds, Ienvironment, fetchExecutor),
  searchSummary: (params: ISearchParams) =>
    searchSummary(params, creds, Ienvironment, fetchExecutor)
})

export default communities
