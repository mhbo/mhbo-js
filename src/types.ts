export enum IEnvironment {
  Production = "PRODUCTION",
  Staging = "STAGING",
  Development = "DEVELOPMENT"
}

export enum IListingTypeID {
  ForSale = 1,
  ForRent = 2,
  ForRentAndToOwn = 3,
  ForRentOrForSale = 4
}

export enum IModelTypeID {
  SingleWide = 1,
  DoubleWide = 2,
  TripleWide = 3,
  ParkModel = 4,
  Unspecified = 5
}

export enum ISellerTypeID {
  Owner = 1,
  Agent = 2,
  Dealer = 3,
  Repo = 4
}

export interface ICoordinate {
  latitude: number
  longitude: number
}

export interface ISearchParams {
  ageRestrictionType?: number
  lenderRepos?: boolean
  listingTypeIds: IListingTypeID[]
  location?: string
  maxPrice?: number
  minPrice?: number
  modelTypeIds?: IModelTypeID[]
  numBathrooms?: number
  numBedrooms?: number
  openHousesOnly?: boolean
  pageCount?: number
  preOwned?: boolean
  radius?: number
  sellerTypeIds?: ISellerTypeID[]
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
  addressable_id: number
  addressable_type: string
  city: string
  county: string
  created_at: string
  has_searched_coordinates: boolean
  id: number
  is_hidden: boolean
  latitude: string
  longitude: string
  lot_num: number | null
  number_and_street: string
  state: string
  updated_at: string
  zip_code: string
}

export interface IMobileHome {
  address: IAddress
  asking_price: number
  manufacturer_name: string
  model_type: string
  num_bathrooms: number
  num_bedrooms: number
  photo_small: string
  rental_price: number | null
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
