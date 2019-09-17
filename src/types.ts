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

export interface IUnparsedAddress {
  addressableId: number
  addressableType: string
  city: string
  county: string
  createdAt: string
  updatedAt: string
  hasSearchedCoordinates: boolean
  id: number
  isHidden: boolean
  latitude: string
  longitude: string
  lotNum: string | null
  numberAndStreet: string
  state: string
  zipCode: string
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

export interface IMHBOListing {
  address: IAddress
  id: number
  isCommunity: boolean
  url: string
}

export interface IUnparsedMHBOListing {
  address: IUnparsedAddress
  id: number
  isCommunity: boolean
  url: string
}

export interface IMobileHome extends IMHBOListing {
  askingPrice: number
  featured: boolean
  manufacturerName: string
  modelType: string
  numBathrooms: number
  numBedrooms: number
  photoSmall: string
  photoLarge: string
  rentalPrice: number | null
}

export interface IUnparsedMobileHome extends IUnparsedMHBOListing {
  askingPrice: number
  latitude: number
  longitude: number
  featured: boolean
  manufacturerName: string
  modelType: string
  numBathrooms: number
  numBedrooms: number
  photoSmall: string
  photoLarge: string
  rentalPrice: number | null
}

export interface ICommunity extends IMHBOListing {
  createdAt: string
  description: string | null
  featured: boolean
  isPublished: boolean
  isDealer: boolean
  minSalePrice: null | number
  name: string
  numExistingPhotos: number
  photoLarge: string
  source: string
  updatedAt: string
}

export interface IUnparsedCommunity extends IUnparsedMHBOListing {
  createdAt: string
  description: string | null
  featured: boolean
  isPublished: boolean
  isDealer: boolean
  minSalePrice: null | number
  name: string
  numExistingPhotos: number
  photoLarge: string
  source: string
  updatedAt: string
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
