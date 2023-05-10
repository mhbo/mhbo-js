import { requestGet, requestGetSummary } from "../entityRequest"
import queryBuilder from "../queryBuilder"
import {
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IMHBOSearchSummaryListing,
  IMobileHome,
  IRestResource,
  ISearchParams,
} from "../types"

const homes = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<IMobileHome | IMHBOListing | IMHBOSearchSummaryListing> => ({
  byIds: (params: number[]) =>
    requestGet<IMobileHome>(
      `v1/mobile_homes/${params.toString()}?detail_level=FULL`,
      creds,
      "MobileHome",
      Ienvironment,
      fetchExecutor
    ),
  searchSummary: (params: ISearchParams) =>
    requestGet<IMHBOListing>(
      `v1/mobile_homes/?${queryBuilder({ ...params, detailLevel: "SUMMARY" })}`,
      creds,
      "MHBOListing",
      Ienvironment,
      fetchExecutor
    ),
  searchSummaryV2: (params: ISearchParams) =>
    requestGetSummary<IMHBOSearchSummaryListing>(
      `v2/mobile_homes/?${queryBuilder({ ...params, detailLevel: "SUMMARY" })}`,
      creds,
      Ienvironment,
      fetchExecutor
    ),
})

export default homes
