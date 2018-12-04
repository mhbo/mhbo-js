export enum Environment {
  Production = "PRODUCTION",
  Staging = "STAGING",
  Development = "DEVELOPMENT"
}

export interface Coordinate {
  latitude: number
  longitude: number
}

export interface SearchParams {
  listingTypeIds: number[]
  modelTypeIds?: number[]
  numBedrooms?: number
  numBathrooms?: number
  maxPrice?: number
  minPrice?: number
  location?: string
  ageRestrictionType?: number
  radius?: number
  pageCount?: number
}

export interface Credentials {
  apiAccessKey: string
  apiSecret: string
}

export interface MobileHome {
  id: string
  photos?: string[]
}

export interface RestResource<T> {
  search: (params: SearchParams) => Promise<T[]>
}

export interface MHBOApiClient {
  homes: RestResource<MobileHome>
}

export type FetchExecutor = (
  input: RequestInfo,
  init?: RequestInit
) => Promise<Response>
