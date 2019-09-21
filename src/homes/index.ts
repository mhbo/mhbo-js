import {
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IMobileHome,
  IRestResource,
  ISearchParams
} from "../types"
import details from "./details"
import summary from "./summary"

const homes = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<IMobileHome | IMHBOListing> => ({
  details: (params: ISearchParams) =>
    details(params, creds, Ienvironment, fetchExecutor),
  summary: (params: ISearchParams) =>
    summary(params, creds, Ienvironment, fetchExecutor)
})

export default homes
