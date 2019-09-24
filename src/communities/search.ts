import { camelizeKeys } from "humps"
import { authenticatedRequest } from "../requests"
import { token } from "../token"
import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  ISearchParams,
  IUnparsedCommunity
} from "../types"
import queryBuilder from "./queryBuilder"

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
        const { address, entityType, listingTypeId } = community
        const { latitude, longitude, lotNum } = address
        return {
          ...community,
          address: {
            ...address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            lotNum: lotNum === null ? lotNum : parseFloat(lotNum)
          },
          entityType: parseFloat(entityType),
          listingTypeId: parseFloat(listingTypeId)
        } as ICommunity
      }
    ) || []
  )
}

export default search
