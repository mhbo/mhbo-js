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
import search from "./search"
import searchSummary from "./searchSummary"

const communities = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<ICommunity | IMHBOListing> => ({
  byIds: (params: number[]) =>
    byIds(params, creds, Ienvironment, fetchExecutor),
  searchSummary: (params: ISearchParams) =>
    searchSummary(params, creds, Ienvironment, fetchExecutor),
  search: (params: ISearchParams) =>
    search(params, creds, Ienvironment, fetchExecutor)
})

export default communities
