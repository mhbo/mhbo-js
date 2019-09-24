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
import searchSummary from "./searchSummary"

const homes = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<IMobileHome | IMHBOListing> => ({
  byIds: (params: number[]) =>
    byIds(params, creds, Ienvironment, fetchExecutor),
  searchSummary: (params: ISearchParams) =>
    searchSummary(params, creds, Ienvironment, fetchExecutor)
})

export default homes
