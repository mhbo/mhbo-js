import { camelizeKeys } from "humps"
import { authenticatedRequest } from "../requests"
import { token } from "../token"

import {
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMobileHome,
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
async function byIds(
  params: number[],
  creds: ICredentials,
  environment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): Promise<IMobileHome[]> {
  const response = await authenticatedRequest(
    token(creds),
    "GET",
    `v1/mobile_homes/?${params.toString()}&detail_level=FULL`,
    environment,
    fetchExecutor
  )
  const json = await response.json()
  return (
    json.map(
      (result: any): IMobileHome => {
        const home = camelizeKeys(result) as IUnparsedMobileHome
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
        } as IMobileHome
      }
    ) || []
  )
}
export default byIds
