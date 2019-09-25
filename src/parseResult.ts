import { camelizeKeys } from "humps"
import { IMHBOListing, IUnparsedMHBOListing } from "./types"

async function parseResult<
  T extends IMHBOListing,
  U extends IUnparsedMHBOListing
>(response: any): Promise<T[]> {
  const json = await response.json()
  return (
    json.map(
      (result: any): T => {
        const { ...community } = camelizeKeys(result) as U
        const { address, entityType, listingTypeId } = community
        const { latitude, longitude, lotNum } = address
        return ({
          ...community,
          address: {
            ...address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            lotNum: lotNum === null ? lotNum : parseFloat(lotNum)
          },
          entityType: parseFloat(entityType),
          listingTypeId: parseFloat(listingTypeId)
        } as unknown) as T
      }
    ) || []
  )
}

export default parseResult
