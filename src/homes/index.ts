import { camelizeKeys } from "humps"
import { authenticatedRequest } from "../requests"
import { token } from "../token"
import queryBuilder from "./queryBuilder"

import {
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMobileHome,
  IRestResource,
  ISearchParams,
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
): Promise<IMobileHome[]> {
  const response = await authenticatedRequest(
    token(creds),
    "GET",
    `v1/mobile_homes/?${queryBuilder(params)}`,
    environment,
    fetchExecutor
  )
  const json = await response.json()
  return (
    json.map(
      (result: any): IMobileHome => {
        const { latitude, longitude, ...home } = camelizeKeys(
          result
        ) as IUnparsedMobileHome
        return {
          ...home,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        } as IMobileHome
      }
    ) || []
  )
}

const homes = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<IMobileHome> => ({
  search: (params: ISearchParams) =>
    search(params, creds, Ienvironment, fetchExecutor)
})

export default homes
