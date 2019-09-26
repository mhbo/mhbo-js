import { requestGet } from "../entityRequest"
import {
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IMobileHome,
  IRestResource,
  ISearchParams,
  IUnparsedMHBOListing,
  IUnparsedMobileHome
} from "../types"
import queryBuilder from "./queryBuilder"

const homes = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<IMobileHome | IMHBOListing> => ({
  byIds: (params: number[]) =>
    requestGet<IMobileHome, IUnparsedMobileHome>(
      `v1/mobile_homes/?${params.toString()}&detail_level=FULL`,
      creds,
      Ienvironment,
      fetchExecutor
    ),
  search: (params: ISearchParams) =>
    requestGet<IMobileHome, IUnparsedMobileHome>(
      `v1/mobile_homes/?${queryBuilder(params)}`,
      creds,
      Ienvironment,
      fetchExecutor
    ),
  searchSummary: (params: ISearchParams) =>
    requestGet<IMHBOListing, IUnparsedMHBOListing>(
      `v1/mobile_homes/?${queryBuilder({ ...params, detailLevel: "SUMMARY" })}`,
      creds,
      Ienvironment,
      fetchExecutor
    )
})

export default homes
