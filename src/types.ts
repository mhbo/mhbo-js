export enum IEnvironment {
  Production = "PRODUCTION",
  Staging = "STAGING",
  Development = "DEVELOPMENT"
}

export interface ICoordinate {
  latitude: number
  longitude: number
}

export interface ISearchParams {
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

export interface ICredentials {
  apiAccessKey: string
  apiSecret: string
}

export interface IAddress {
  city: string
  county: string
  latitude: number
  longitude: number
  lotNum: number
  numberAndStreet: string
  state: string
  zipCode: string
}

export interface IMobileHome {
  address: IAddress
  askingPrice: number
  id: number
  latitude: number
  longitude: number
  manufacturerName: string
  modelType: string
  photoSmall: string
  rentalPrice: number
  url: string
}

export interface IRestResource<T> {
  search: (params: ISearchParams) => Promise<T[]>
}

export interface IMHBOApiClient {
  homes: IRestResource<IMobileHome>
}

export type IFetchExecutor = (
  input: RequestInfo,
  init?: RequestInit
) => Promise<Response>
