import { camelizeKeys } from "humps"
import { authenticatedRequest } from "./requests"
import { token } from "./token"
import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IUnparsedCommunity,
  IUnparsedMHBOListing
} from "./types"

/**
 * Performs a GET request to mhbo api.
 *
 * @param creds The authentication credential for the API request.
 * @param environment An optional override of the environment to utilize.
 * @param fetchExecutor An instance of the request executor.
 * @returns An array of mobile home results.
 */
async function requestGet<T extends any, U extends any>(
  url: string,
  creds: ICredentials,
  environment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): Promise<T[]> {
  const response = await authenticatedRequest(
    token(creds),
    "GET",
    url,
    environment,
    fetchExecutor
  )
  const json = await response.json()
  return (
    json.map(
      (result: any): T => {
        const { ...community } = camelizeKeys(result) as U
        const { address, entityType, listingTypeId } = community
        const { latitude, longitude, lotNum } = address
        const parsedResult = {
          ...community,
          address: {
            ...address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            lotNum: lotNum === null ? lotNum : parseFloat(lotNum)
          },
          entityType: parseFloat(entityType),
          listingTypeId: parseFloat(listingTypeId)
        }
        if (community.mobilehomes) {
          const parsedMobilehomes = community.mobilehomes.map(
            ({ address: add, ...home }: IUnparsedCommunity) => ({
              ...home,
              address: {
                ...add,
                latitude: parseFloat(add.latitude),
                longitude: parseFloat(add.longitude)
              }
            })
          )
          parsedResult.mobilehomes = parsedMobilehomes
        }
        return (parsedResult as unknown) as T
      }
    ) || []
  )
}

export { requestGet }
