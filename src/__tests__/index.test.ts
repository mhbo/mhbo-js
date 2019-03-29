import Client, {
  IListingTypeID,
  IMobileHome,
  IModelTypeID,
  ISellerTypeID
} from "../index"

describe("the MHBO API Client", () => {
  it("should provide all supported API resources", () => {
    const client = Client("accessKey", "secret")
    expect(client.homes).toBeDefined()
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
      latitude: -45.51,
      longitude: -122.65,
      manufacturerName: "Craftsman",
      modelType: IModelTypeID.SingleWide.toString(),
      photoSmall: "",
      rentalPrice: 0,
      url: "https://mhbo.com/mobilehomes/"
    }
    expect(mobileHome).toBeDefined()
  })
})
