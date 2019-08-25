import { camelizeKeys } from "humps"
import { authenticatedRequest } from "../requests"
import { token } from "../token"
import queryBuilder from "./queryBuilder"

import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMobileHome,
  IRestResource,
  ISearchParams,
  IUnparsedCommunity,
  IUnparsedMobileHome
} from "../types"

/**
 * Performs a search for mobile homes.
 *
 * @param creds The authentication credential for the API request.
 * @param environment An optional override of the environment to utilize.
 * @param fetchExecutor An instance of the request executor.
 * @returns An array of mobile home results.
 */
async function search(
  params: ISearchParams,
  creds: ICredentials,
  environment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): Promise<IMobileHome[] | ICommunity[]> {
  const response = await authenticatedRequest(
    token(creds),
    "GET",
    `v1/${
      params.homeTypeId !== 2 ? `mobile_homes` : `communities`
    }/?${queryBuilder(params)}`,
    environment,
    fetchExecutor
  )
  const json = await response.json()
  if (params.homeTypeId !== 2) {
    return (
      json.map(
        (result: any): IMobileHome => {
          const { latitude, longitude, ...home } = camelizeKeys(
            result
          ) as IUnparsedMobileHome
          return {
            ...home,
            isCommunity: false,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          } as IMobileHome
        }
      ) || []
    )
  } else {
    return (
      json.map(
        (result: any): ICommunity => {
          const { ...home } = camelizeKeys(result) as IUnparsedCommunity
          return {
            ...home,
            isCommunity: true
          } as ICommunity
        }
      ) || []
    )
  }
}

const homes = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<IMobileHome | ICommunity> => ({
  search: (params: ISearchParams) =>
    search(params, creds, Ienvironment, fetchExecutor)
})

export default homes
