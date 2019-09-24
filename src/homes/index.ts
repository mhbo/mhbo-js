import {
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IMobileHome,
  IRestResource,
  ISearchParams
} from "../types"
import byIds from "./byIds"
import search from "./search"
import searchSummary from "./searchSummary"

const homes = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<IMobileHome | IMHBOListing> => ({
  byIds: (params: number[]) =>
    byIds(params, creds, Ienvironment, fetchExecutor),
  search: (params: ISearchParams) =>
    search(params, creds, Ienvironment, fetchExecutor),
  searchSummary: (params: ISearchParams) =>
    searchSummary(params, creds, Ienvironment, fetchExecutor)
})

export default homes
