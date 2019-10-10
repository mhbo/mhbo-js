import { camelizeKeys } from "humps"
import { authenticatedRequest } from "./requests"
import { token } from "./token"
import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IFunctionsLookup,
  IMHBOListing,
  IMobileHome,
  IUnparsedCommunity,
  IUnparsedMHBOListing,
  IUnparsedMobileHome
} from "./types"

const functionsLookup: IFunctionsLookup = {
  Community: parseICommunity,
  MHBOListing: parseIMHBOListing,
  MobileHome: parseIMobileHome
}

/**
 * Performs a GET request to mhbo api.
 *
 * @param creds The authentication credential for the API request.
 * @param environment An optional override of the environment to utilize.
 * @param fetchExecutor An instance of the request executor.
 * @returns An array of mobile home results.
 */
async function requestGet<T>(
  url: string,
  creds: ICredentials,
  returnType: keyof (IFunctionsLookup),
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
  const parseFunction = functionsLookup[returnType]
  return (
    json.map(
      (result: any): T => {
        return (parseFunction(result) as unknown) as T
      }
    ) || []
  )
}

function parseIMHBOListing(result: any): IMHBOListing {
  const { ...listing } = camelizeKeys(result) as IUnparsedMHBOListing
  const { address, entityType, listingTypeId } = listing
  const { latitude, longitude } = address
  return {
    ...listing,
    address: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    },
    entityType: parseFloat(entityType),
    listingTypeId: parseFloat(listingTypeId)
  } as IMHBOListing
}

function parseIMobileHome(result: any): IMobileHome {
  const { ...home } = camelizeKeys(result) as IUnparsedMobileHome
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

function parseICommunity(result: any): ICommunity {
  const { ...community } = camelizeKeys(result) as IUnparsedCommunity
  const { address, entityType, listingTypeId, mobilehomes = [] } = community
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
    listingTypeId: parseFloat(listingTypeId),
    mobilehomes: mobilehomes.map(home => parseIMHBOListing(home))
  } as ICommunity
}

export { requestGet }
