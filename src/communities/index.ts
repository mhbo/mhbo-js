import { requestGet } from "../entityRequest"
import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IRestResource,
  ISearchParams,
  IUnparsedCommunity,
  IUnparsedMHBOListing
} from "../types"
import queryBuilder from "./queryBuilder"

const communities = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<ICommunity | IMHBOListing> => ({
  byIds: (params: number[]) =>
    requestGet<ICommunity, IUnparsedCommunity>(
      `v1/communities/${params.toString()}?detail_level=FULL`,
      creds,
      Ienvironment,
      fetchExecutor
    ),
  search: (params: ISearchParams) =>
    requestGet<ICommunity, IUnparsedCommunity>(
      `v1/communities/?${queryBuilder(params)}`,
      creds,
      Ienvironment,
      fetchExecutor
    ),
  searchSummary: (params: ISearchParams) =>
    requestGet<IMHBOListing, IUnparsedMHBOListing>(
      `v1/communities/?${queryBuilder({ ...params, detailLevel: "SUMMARY" })}`,
      creds,
      Ienvironment,
      fetchExecutor
    )
})

export default communities
