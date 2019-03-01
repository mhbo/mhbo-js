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
  ageRestrictionType?: number
  lenderRepos?: boolean
  listingTypeIds: number[]
  location?: string
  maxPrice?: number
  minPrice?: number
  modelTypeIds?: number[]
  numBathrooms?: number
  numBedrooms?: number
  openHousesOnly?: boolean
  pageCount?: number
  preOwned?: boolean
  radius?: number
  sellerTypeIds?: number[]
  withBoatStorage?: boolean
  withGolfInCommunity?: boolean
  withOnSiteCustomerService?: boolean
  withRvParking?: boolean
  withTennisInCommunity?: boolean
}

export interface Credentials {
  apiAccessKey: string
  apiSecret: string
}

export interface MobileHome {
  address: string
  askingPrice: number
  id: number
  manufacturerName: string
  modelType: string
  photoSmall: string
  rentalPrice: number
  url: string
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
