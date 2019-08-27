import { camelizeKeys } from "humps"
import { authenticatedRequest } from "../requests"
import { token } from "../token"
import queryBuilder from "./queryBuilder"

import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IRestResource,
  ISearchParams,
  IUnparsedCommunity
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
): Promise<ICommunity[]> {
  const response = await authenticatedRequest(
    token(creds),
    "GET",
    `v1/communities/?${queryBuilder(params)}`,
    environment,
    fetchExecutor
  )
  const json = await response.json()
  return (
    json.map(
      (result: any): ICommunity => {
        const { ...community } = camelizeKeys(result) as IUnparsedCommunity
        return {
          ...community,
          isCommunity: true
        } as ICommunity
      }
    ) || []
  )
}

const communities = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<ICommunity> => ({
  search: (params: ISearchParams) =>
    search(params, creds, Ienvironment, fetchExecutor)
})

export default communities
