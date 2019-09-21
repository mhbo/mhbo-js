import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IRestResource,
  ISearchParams
} from "../types"
import details from "./details"
import summary from "./summary"

const communities = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<ICommunity | IMHBOListing> => ({
  details: (params: ISearchParams) =>
    details(params, creds, Ienvironment, fetchExecutor),
  summary: (params: ISearchParams) =>
    summary(params, creds, Ienvironment, fetchExecutor)
})

export default communities
