//@flow

export type Environment = "PRODUCTION" | "STAGING" | "DEVELOPMENT"

export type Coordinate = { latitude: number, longitude: number }

export type SearchParams = {
  listingTypeIds: Array<number>,
  modelTypeIds?: Array<number>,
  numBedrooms?: number,
  numBathrooms?: number,
  maxPrice?: number,
  minPrice?: number,
  location?: Coordinate,
  ageRestrictionType?: number
}

export type Credentials = {
  apiAccessKey: string,
  apiSecret: string
}

export type MobileHome = {
  id: string,
  photos?: string[]
}

export type RestResource<T> = {
  search: (params: SearchParams) => Promise<T[]>
}

export type MHBOApiClient = {
  homes: RestResource<MobileHome>
}

export type FetchExecutor = (
  input: RequestInfo,
  init?: RequestOptions
) => Promise<Response>
