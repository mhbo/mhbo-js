import { camelizeKeys } from "humps"
import { authenticatedRequest } from "./requests"
import { token } from "./token"

import {
  ICommunity,
  ICredentials,
  IEnvironment,
  IFavorite,
  IFetchExecutor,
  IFunctionsLookup,
  IMHBOListing,
  IMobileHome,
  IUnparsedCommunity,
  IUnparsedMHBOListing,
  IUnparsedMobileHome,
} from "./types"

const functionsLookup: IFunctionsLookup = {
  Community: parseICommunity,
  Favorites: parseIFavorite,
  MHBOListing: parseIMHBOListing,
  MobileHome: parseIMobileHome,
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
  returnType: keyof IFunctionsLookup,
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
  if (response.json) {
    const json = await response.json()
    const parseFunction = functionsLookup[returnType]
    return (
      json.map((result: any): T => {
        return parseFunction(result) as unknown as T
      }) || []
    )
  }
  return []
}

/**
 * Performs a POST request to mhbo api.
 *
 * @param creds The authentication credential for the API request.
 * @param environment An optional override of the environment to utilize.
 * @param fetchExecutor An instance of the request executor.
 * @returns The updated result.
 */
async function requestPost<T>(
  url: string,
  creds: ICredentials,
  returnType: keyof IFunctionsLookup,
  environment?: IEnvironment,
  fetchExecutor?: IFetchExecutor,
  body?: any
): Promise<T> {
  const response = await authenticatedRequest(
    token(creds),
    "POST",
    url,
    environment,
    fetchExecutor,
    body
  )
  if (response.json) {
    const json = await response.json()
    const parseFunction = functionsLookup[returnType]
    return parseFunction(json) as unknown as T
  }
  return {} as T
}

/**
 * Performs a DELETE request to mhbo api.
 *
 * @param creds The authentication credential for the API request.
 * @param environment An optional override of the environment to utilize.
 * @param fetchExecutor An instance of the request executor.
 * @returns indicator message
 */
async function requestDelete<T>(
  url: string,
  creds: ICredentials,
  environment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): Promise<T> {
  const response = await authenticatedRequest(
    token(creds),
    "DELETE",
    url,
    environment,
    fetchExecutor
  )
  if (response.json) {
    const json = await response.json()
    return json
  }
  return {} as T
}

function parseIMHBOListing(result: any): IMHBOListing {
  const { ...listing } = camelizeKeys(result) as IUnparsedMHBOListing
  const { address, entityType, listingTypeId } = listing
  const { latitude, longitude } = address
  return {
    ...listing,
    address: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    },
    entityType: parseFloat(entityType),
    listingTypeId: parseFloat(listingTypeId),
  } as IMHBOListing
}

function parseIMobileHome(result: any): IMobileHome {
  const { ...home } = camelizeKeys(result) as IUnparsedMobileHome
  const { address, entityType, listingTypeId, locationStatusId } = home
  const { latitude, longitude, lotNum } = address
  return {
    ...home,
    address: {
      ...address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      lotNum: lotNum === null ? lotNum : parseFloat(lotNum),
    },
    entityType: parseFloat(entityType),
    listingTypeId: parseFloat(listingTypeId),
    locationStatusId: parseFloat(locationStatusId),
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
      lotNum: lotNum === null ? lotNum : parseFloat(lotNum),
    },
    entityType: parseFloat(entityType),
    listingTypeId: parseFloat(listingTypeId),
    mobilehomes: mobilehomes.map((home) => parseIMHBOListing(home)),
  } as ICommunity
}

function parseIFavorite(result: any): IFavorite {
  const { ...listing } = camelizeKeys(result) as IFavorite

  return {
    ...listing,
  } as IFavorite
}

export { requestGet, requestPost, requestDelete }
