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

export enum IEntityType {
  Home = 1,
  Community = 2,
  Dealer = 3
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

export enum IAgeRestrictionType {
  FiftyFivePlus = 2,
  AllAges = 1
}

export enum ILocationStatusID {
  InACommunity = 1,
  OwnerOwnedLand = 2,
  LeasedRentedLand = 3,
  NotInACommunity = 4,
  OnDealerLot = 5
}

export interface ISearchParams {
  ageRestrictionType?: IAgeRestrictionType[]
  withPetFriendly?: boolean
  isResidentOwned?: boolean
  isMhrv?: boolean
  isTinyHouseCommunity?: boolean
  lenderRepos?: boolean
  listingTypeIds?: IListingTypeID[]
  location?: string
  locationStatusId?: ILocationStatusID[]
  maxPrice?: number
  minPrice?: number
  modelTypeIds?: IModelTypeID[]
  numBathrooms?: number[]
  numBedrooms?: number[]
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
  listingIds?: number[]
  detailLevel?: "SUMMARY" | "FULL"
}

export interface ICredentials {
  apiAccessKey?: string
  apiSecret?: string
  token?: string
}

export interface IUnparsedLatLongAddress {
  latitude: string
  longitude: string
}

export interface ILatLongAddress {
  latitude: number
  longitude: number
}

export interface IUnparsedAddress extends IUnparsedLatLongAddress {
  addressableId: number
  addressableType: string
  city: string
  county: string
  createdAt: string
  updatedAt: string
  hasSearchedCoordinates: boolean
  id: number
  isHidden: boolean
  lotNum: string | null
  numberAndStreet: string
  state: string
  zipCode: string
}

export interface IAddress extends ILatLongAddress {
  addressableId: number
  addressableType: string
  city: string
  county: string
  createdAt: string
  updatedAt: string
  hasSearchedCoordinates: boolean
  id: number
  isHidden: boolean
  lotNum: number | null
  numberAndStreet: string
  state: string
  zipCode: string
}

export interface IMHBOListing {
  address: ILatLongAddress
  id: number
  entityType: IEntityType
  listingTypeId?: IListingTypeID
}

export interface IContact {
  name: string
  lastName: string
  daytimePhone: string
}

export interface IUnparsedMHBOListing {
  address: IUnparsedLatLongAddress
  id: number
  entityType: string
  listingTypeId: string
}

export interface IMobileHome extends IMHBOListing {
  address: IAddress
  askingPrice: number
  communityName: string
  communityId: number
  featured: boolean
  locationStatusId: ILocationStatusID
  manufacturerName: string
  modelType: string
  numBathrooms: number
  numBedrooms: number
  photoLarge: string
  rentalPrice: number | null
  sellerTypeId: ISellerTypeID
  totalFootage: number
  url: string
}

export interface IUnparsedMobileHome extends IUnparsedMHBOListing {
  address: IUnparsedAddress
  askingPrice: number
  featured: boolean
  locationStatusId: string
  manufacturerName: string
  modelType: string
  numBathrooms: number
  numBedrooms: number
  photoLarge: string
  sellerTypeId: ISellerTypeID
  rentalPrice: number | null
  totalFootage: number
  url: string
}

export interface ICommunity extends IMHBOListing {
  address: IAddress
  ageRestrictionType: null | IAgeRestrictionType
  createdAt: string
  contact: IContact
  description: string | null
  featured: boolean
  isPublished: boolean
  isDealer: boolean
  isMhrv: boolean
  isResidentOwned: boolean
  isTinyHouseCommunity: boolean
  withPetFriendly: boolean
  mobilehomes: IMHBOListing[]
  minSalePrice: null | number
  name: string
  numExistingPhotos: number
  photoLarge: string
  source: string
  url: string
  updatedAt: string
}

export interface IUnparsedCommunity extends IUnparsedMHBOListing {
  address: IUnparsedAddress
  ageRestrictionType: null | IAgeRestrictionType
  contact: IContact
  createdAt: string
  description: string | null
  featured: boolean
  isPublished: boolean
  isDealer: boolean
  isMhrv: boolean
  isResidentOwned: boolean
  isTinyHouseCommunity: boolean
  mobilehomes: IUnparsedMHBOListing[]
  minSalePrice: null | number
  name: string
  numExistingPhotos: number
  photoLarge: string
  source: string
  updatedAt: string
}

export interface IFavorite {
  entityType: number
  id: number
  userId: number
  watchableId: number
  watchableType: string
}

export interface IToken {
  userId?: number
}

export interface IRestResource<T> {
  byIds: (params: number[]) => Promise<T[]>
  search: (params: ISearchParams) => Promise<T[]>
  searchSummary: (params: ISearchParams) => Promise<T[]>
}

export interface IFavoritesResource<T> {
  getFavorites: (userId: number) => Promise<T[]>
  addFavorite: (
    id: number,
    type: "Community" | "MobileHome",
    userId: number
  ) => Promise<T>
  deleteFavorite: (id: number, userId: number) => Promise<any>
}

export interface ITokenResource<T> {
  getUserId: () => T
}

export interface IMHBOApiClient {
  homes: IRestResource<IMobileHome | IMHBOListing>
  communities: IRestResource<ICommunity | IMHBOListing>
  users: IFavoritesResource<IFavorite>
  token: ITokenResource<IToken>
}

export type IFetchExecutor = (
  input: RequestInfo,
  init?: RequestInit
) => Promise<Response>

export interface IFunctionsLookup {
  Community: (result: any) => ICommunity
  MHBOListing: (result: any) => IMHBOListing
  MobileHome: (result: any) => IMobileHome
  Favorites: (result: any) => IFavorite
}
