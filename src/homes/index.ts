import { requestGet } from "../entityRequest"
import {
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IMobileHome,
  IRestResource,
  ISearchParams
} from "../types"
import queryBuilder from "./queryBuilder"

const homes = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<IMobileHome | IMHBOListing> => ({
  byIds: (params: number[]) =>
    requestGet<IMobileHome>(
      `v1/mobile_homes/${params.toString()}?detail_level=FULL`,
      creds,
      "MobileHome",
      Ienvironment,
      fetchExecutor
    ),
  search: (params: ISearchParams) =>
    requestGet<IMobileHome>(
      `v1/mobile_homes/?${queryBuilder(params)}`,
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
    )
})

export default homes
