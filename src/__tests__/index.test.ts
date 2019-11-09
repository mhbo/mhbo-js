import Client, {
  ICommunity,
  IListingTypeID,
  IMobileHome,
  IModelTypeID,
  ISellerTypeID
} from "../index"
import { IHomeTypeID } from "../types"

describe("the MHBO API Client", () => {
  it("should provide all supported API resources using access keys", () => {
    const client = Client({ apiAccessKey: "accessKey", apiSecret: "secret" })
    expect(client.homes).toBeDefined()
    expect(client.communities).toBeDefined()
  })

  it("should provide all supported API resources using token", () => {
    const client = Client({ token: "apiToken" })
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
        addressableId: 198718,
        addressableType: "Mobilehome",
        city: "Lady Lake",
        county: "Lake",
        createdAt: "2019-06-30T15:52:24.000-07:00",
        hasSearchedCoordinates: false,
        id: 719739,
        isHidden: false,
        latitude: 28.9221659,
        longitude: -81.921264,
        lotNum: 2121,
        numberAndStreet: "604 Nicklaus Court",
        state: "FL",
        updatedAt: "2019-08-16T01:49:13.000-07:00",
        zipCode: "32159"
      },
      askingPrice: 124995,
      communityId: 21308,
      communityName: "Water Oak Country Club",
      entityType: 1,
      featured: false,
      id: 198718,
      listingTypeId: 1,
      locationStatusId: 2,
      manufacturerName: "Skyline",
      modelType: "Double wide",
      numBathrooms: 2,
      numBedrooms: 3,
      photoLarge:
        "https://www.suncommunities.com/wp-content/uploads/2017/11/01-Field-Cape-Coral.jpg",
      rentalPrice: null,
      sellerTypeId: 1,
      totalFootage: 408,
      url:
        "http://staging.mhbo.com/mobile-home/198718-604-nicklaus-court-lot-2121-lady-lake-fl-32159-double-wide"
    }
    expect(mobileHome).toBeDefined()
    const community: ICommunity = {
      address: {
        addressableId: 37475,
        addressableType: "Community",
        city: "Lady Lake",
        county: "Lake",
        createdAt: "2019-09-07T23:53:32.000-07:00",
        hasSearchedCoordinates: false,
        id: 722911,
        isHidden: false,
        latitude: 28.92363,
        longitude: -81.924338,
        lotNum: null,
        numberAndStreet: "106 Evergreen Lane",
        state: "FL",
        updatedAt: "2019-09-07T23:53:32.000-07:00",
        zipCode: "32159"
      },
      ageRestrictionType: null,
      contact: {
        daytimePhone: "(080) 888 9999",
        lastName: "Sutherland",
        name: "Buffy"
      },
      createdAt: "2013-09-22T03:27:48.000-07:00",
      description:
        "\u003Cp\u003EWater Oak Country Club Estates is a gated, age-restricted (55+) manufactured home community located in Lady Lake, FL. ",
      entityType: 2,
      featured: true,
      id: 37475,
      isDealer: false,
      isMhrv: false,
      isPublished: true,
      isResidentOwned: false,
      isTinyHouseCommunity: false,
      minSalePrice: 44000,
      mobilehomes: [
        {
          address: {
            latitude: 28.8751532,
            longitude: -81.8847011
          },
          entityType: 1,
          id: 335121,
          listingTypeId: 1
        }
      ],
      name: "Water Oak Country Club",
      numExistingPhotos: 19,
      photoLarge:
        "http://dth4n83exov4m.cloudfront.net/photos/images/004/371/787/large/water-oak-country-club-5.jpg?1555695939",
      source: "suncommunities",
      updatedAt: "2019-09-21T02:22:32.000-07:00",
      url:
        "http://staging.mhbo.com/mobile-home-park/37475-water-oak-country-club-106-evergreen-lane-lady-lake-fl-32159",
      withPetFriendly: false
    }
    expect(community).toBeDefined()
  })
})
