const queryBuilder = require("./queryBuilder")

describe("the query builder", () => {
  it("should map all attributes as an appropriate query string", () => {
    const query = queryBuilder({
      modelTypeIds: [1, 2],
      listingTypeIds: [1],
      isAllAges: true,
      isSenior: false,
      numBedrooms: 3,
      numBathrooms: 2,
      maxPrice: 5000,
      minPrice: 0,
      location: "Mesa, AZ"
    })
    expect(query).toEqual(
      "model_type_id%5B%5D=1&model_type_id%5B%5D=2&listing_type_id%5B%5D=1&is_all_ages=yes&is_senior=no&num_bedrooms%5B%5D=3&num_bathrooms%5B%5D=2&max_price=5000&min_price=0&display_location=Mesa%2C%20AZ"
    )
  })

  it("should omit blank attributes as an appropriate query string", () => {
    const query = queryBuilder({
      modelTypeIds: [],
      listingTypeIds: [],
      isAllAges: true,
      isSenior: false,
      numBedrooms: 3,
      numBathrooms: 2,
      maxPrice: 5000,
      minPrice: 0,
      location: "Mesa, AZ"
    })
    expect(query).toEqual(
      "is_all_ages=yes&is_senior=no&num_bedrooms%5B%5D=3&num_bathrooms%5B%5D=2&max_price=5000&min_price=0&display_location=Mesa%2C%20AZ"
    )
  })
})
