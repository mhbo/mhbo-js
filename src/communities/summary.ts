import { camelizeKeys } from "humps"
import { authenticatedRequest } from "../requests"
import { token } from "../token"
import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  ISearchParams,
  IUnparsedMHBOListing
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
async function summary(
  params: ISearchParams,
  creds: ICredentials,
  environment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): Promise<ICommunity[]> {
  params.detailLevel = "SUMMARY"
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
      (result: any): IMHBOListing => {
        const home = camelizeKeys(result) as IUnparsedMHBOListing
        const { address, entityType, listingTypeId } = home
        const { latitude, longitude, lotNum } = address
        return {
          ...home,
          address: {
            ...address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            lotNum: lotNum === null ? lotNum : parseFloat(lotNum)
          },
          entityType: parseFloat(entityType),
          listingTypeId: parseFloat(listingTypeId)
        } as IMHBOListing
      }
    ) || []
  )
}
export default summary
