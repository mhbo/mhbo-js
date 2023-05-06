import { requestGet } from "../entityRequest"
import queryBuilder from "../queryBuilder"
import {
  ICommunity,
  ICommunityRestResource,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  ISearchParams,
} from "../types"

const communities = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): ICommunityRestResource<ICommunity | IMHBOListing> => ({
  byIds: (params: number[]) =>
    requestGet<ICommunity>(
      `v1/communities/${params.toString()}?detail_level=FULL`,
      creds,
      "Community",
      Ienvironment,
      fetchExecutor
    ),
  searchSummary: (params: ISearchParams) =>
    requestGet<IMHBOListing>(
      `v1/communities/?${queryBuilder({ ...params, detailLevel: "SUMMARY" })}`,
      creds,
      "MHBOListing",
      Ienvironment,
      fetchExecutor
    ),
  searchSummaryV2: (params: ISearchParams) =>
    requestGet<IMHBOListing>(
      `v2/search/?${queryBuilder({ ...params, detailLevel: "SUMMARY" })}`,
      creds,
      "MHBOListing",
      Ienvironment,
      fetchExecutor
    ),
})

export default communities
