import Client, {
  IListingTypeID,
  IMobileHome,
  IModelTypeID,
  ISellerTypeID,
  ICommunity
} from "../index"
import { IHomeTypeID } from "../types"

describe("the MHBO API Client", () => {
  it("should provide all supported API resources", () => {
    const client = Client("accessKey", "secret")
    expect(client.homes).toBeDefined()
    expect(client.communities).toBeDefined()
  })

  it("should expose applicable types for usage", () => {
    expect(IModelTypeID.SingleWide).toBeDefined()
    expect(IModelTypeID.DoubleWide).toBeDefined()
    expect(IModelTypeID.TripleWide).toBeDefined()
    expect(IModelTypeID.ParkModel).toBeDefined()
    expect(IModelTypeID.Unspecified).toBeDefined()
    expect(IListingTypeID.ForSale).toBeDefined()
    expect(IListingTypeID.ForRent).toBeDefined()
    expect(IListingTypeID.ForRentAndToOwn).toBeDefined()
    expect(IListingTypeID.ForRentOrForSale).toBeDefined()
    expect(ISellerTypeID.Owner).toBeDefined()
    expect(ISellerTypeID.Agent).toBeDefined()
    expect(ISellerTypeID.Dealer).toBeDefined()
    expect(ISellerTypeID.Repo).toBeDefined()
    expect(IHomeTypeID.MobileHome).toBeDefined()
    expect(IHomeTypeID.Community).toBeDefined()
    const mobileHome: IMobileHome = {
      address: {
        addressableId: 123,
        addressableType: "MobileHome",
        city: "Portland",
        county: "Multnomah",
        createdAt: "",
        hasSearchedCoordinates: false,
        id: 12345,
        isHidden: false,
        latitude: -45.51,
        longitude: -122.65,
        lotNum: 0,
        numberAndStreet: "555 SE Belmont",
        state: "OR",
        updatedAt: "",
        zipCode: "97214"
      },
      askingPrice: 500,
      id: 123,
      isCommunity: false,
      latitude: -45.51,
      longitude: -122.65,
      manufacturerName: "Craftsman",
      modelType: IModelTypeID.SingleWide.toString(),
      photoLarge: "",
      photoSmall: "",
      rentalPrice: 0,
      url: "https://mhbo.com/mobilehomes/"
    }
    expect(mobileHome).toBeDefined()
    const community: ICommunity = {
      address: {
        addressableId: 8490,
        addressableType: "Community",
        city: "Texarkana",
        county: "Bowie",
        createdAt: "2013-02-05T14:26:21.000-08:00",
        hasSearchedCoordinates: true,
        id: 134932,
        isHidden: false,
        latitude: 33.4174897,
        longitude: -94.1059232,
        lotNum: null,
        numberAndStreet: "200 Parkview Dr",
        state: "TX",
        updatedAt: "2014-10-07T20:51:18.000-07:00",
        zipCode: "75501"
      },
      createdAt: "2013-02-05T14:26:21.000-08:00",
      description: null,
      featured: false,
      id: 8490,
      isCommunity: true,
      isPublished: true,
      name: "Park View Mobile Home Park",
      numExistingPhotos: 1,
      photoLarge:
        "http://dth4n83exov4m.cloudfront.net/photos/images/000/078/690/large/200-parkview-dr-texarkana-tx-75501.?1488031506",
      source: "scrapinghub",
      updatedAt: "2014-05-08T23:01:25.000-07:00",
      url:
        "http://staging.mhbo.com/mobile-home-park/8490-park-view-mobile-home-park-200-parkview-dr-texarkana-tx-75501"
    }
    expect(community).toBeDefined()
  })
})
