import communities from "./communities"

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

export enum IHomeTypeID {
  Community = 2,
  MobileHome = 1
}

export interface ISearchParams {
  ageRestrictionType?: number
  lenderRepos?: boolean
  listingTypeIds?: IListingTypeID[]
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
  homeTypeId: IHomeTypeID
}

export interface ICredentials {
  apiAccessKey: string
  apiSecret: string
}

export interface IAddress {
  addressableId: number
  addressableType: string
  city: string
  county: string
  createdAt: string
  updatedAt: string
  hasSearchedCoordinates: boolean
  id: number
  isHidden: boolean
  latitude: number
  longitude: number
  lotNum: number | null
  numberAndStreet: string
  state: string
  zipCode: string
}

export interface IMobileHome {
  address: IAddress
  askingPrice: number
  id: number
  isCommunity: boolean
  latitude: number
  longitude: number
  manufacturerName: string
  modelType: string
  photoSmall: string
  photoLarge: string
  rentalPrice: number
  url: string
}

export interface IUnparsedMobileHome {
  address: IAddress
  askingPrice: number
  id: number
  latitude: string
  longitude: string
  manufacturerName: string
  modelType: string
  photoSmall: string
  photoLarge: string
  rentalPrice: number
  url: string
}

export interface ICommunity {
  address: IAddress
  country: string | null
  county: string
  createdAt: string
  description: string | null
  featured: boolean
  id: number
  isCommunity: boolean
  isPublished: boolean
  name: string
  numExistingPhotos: number
  photoLarge: string
  source: string
  updatedAt: string
  url: string
}

export interface IUnparsedCommunity {
  address: IAddress
  country: string | null
  county: string
  createdAt: string
  description: string | null
  featured: boolean
  id: number
  isPublished: boolean
  numExistingPhotos: number
  photoLarge: string
  source: string
  updatedAt: string
  url: string
}

export interface IRestResource<T> {
  search: (params: ISearchParams) => Promise<T[]>
}

export interface IMHBOApiClient {
  homes: IRestResource<IMobileHome>
  communities: IRestResource<ICommunity>
}

export type IFetchExecutor = (
  input: RequestInfo,
  init?: RequestInit
) => Promise<Response>
