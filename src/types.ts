export enum Environment {
  Production = "PRODUCTION",
  Staging = "STAGING",
  Development = "DEVELOPMENT"
}

export enum ListingTypeID {
  ForSale = 1,
  ForRent = 2,
  ForRentAndToOwn = 3,
  ForRentOrForSale = 4
}

export enum ModelTypeID {
  SingleWide = 1,
  DoubleWide = 2,
  TripleWide = 3,
  ParkModel = 4,
  Unspecified = 5
}

export enum SellerTypeID {
  Owner = 1,
  Agent = 2,
  Dealer = 3,
  Repo = 4
}

export interface Coordinate {
  latitude: number
  longitude: number
}

export interface SearchParams {
  ageRestrictionType?: number
  lenderRepos?: boolean
  listingTypeIds: ListingTypeID[]
  location?: string
  maxPrice?: number
  minPrice?: number
  modelTypeIds?: ModelTypeID[]
  numBathrooms?: number
  numBedrooms?: number
  openHousesOnly?: boolean
  pageCount?: number
  preOwned?: boolean
  radius?: number
  sellerTypeIds?: SellerTypeID[]
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
