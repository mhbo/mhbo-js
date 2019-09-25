import search from "../search"
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
    search<IMobileHome, IUnparsedMobileHome>(
      `v1/mobile_homes/?${params.toString()}&detail_level=FULL`,
      creds,
      Ienvironment,
      fetchExecutor
    ),
  search: (params: ISearchParams) =>
    search<IMobileHome, IUnparsedMobileHome>(
      `v1/mobile_homes/?${queryBuilder(params)}`,
      creds,
      Ienvironment,
      fetchExecutor
    ),
  searchSummary: (params: ISearchParams) =>
    search<IMHBOListing, IUnparsedMHBOListing>(
      `v1/mobile_homes/?${queryBuilder({ ...params, detailLevel: "SUMMARY" })}`,
      creds,
      Ienvironment,
      fetchExecutor
    )
})

export default homes
