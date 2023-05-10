import { requestGet, requestGetSummary } from "../entityRequest"
import queryBuilder from "../queryBuilder"
import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  ISearchParams,
  IMHBOSearchSummaryListing,
  IRestResource,
} from "../types"

const communities = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<ICommunity | IMHBOListing | IMHBOSearchSummaryListing> => ({
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
    requestGetSummary<IMHBOSearchSummaryListing>(
      `v2/search/?${queryBuilder({ ...params, detailLevel: "SUMMARY" })}`,
      creds,
      Ienvironment,
      fetchExecutor
    ),
})

export default communities
