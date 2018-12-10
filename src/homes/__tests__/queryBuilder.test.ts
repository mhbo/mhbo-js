import queryBuilder from "../queryBuilder"

describe("the query builder", () => {
  it("should map all attributes as an appropriate query string", () => {
    const query = queryBuilder({
      ageRestrictionType: 1,
      listingTypeIds: [1],
      location: "Mesa, AZ",
      maxPrice: 5000,
      minPrice: 0,
      modelTypeIds: [1, 2],
      numBathrooms: 2,
      numBedrooms: 3,
      sellerTypeIds: [3]
    })
    expect(query).toEqual(
      "age_restriction_type%5B%5D=1&listing_type_id%5B%5D=1&display_location=Mesa%2C%20AZ&max_price=5000&min_price=0&model_type_id%5B%5D=1&model_type_id%5B%5D=2&num_bathrooms%5B%5D=2&num_bedrooms%5B%5D=3&seller_type_id%5B%5D=3"
    )
  })

  it("should exclude bathrooms and bedrooms if not included", () => {
    const query = queryBuilder({
      ageRestrictionType: 1,
      listingTypeIds: [1],
      location: "Mesa, AZ",
      maxPrice: 5000,
      minPrice: 0,
      modelTypeIds: [1, 2]
    })
    expect(query).toEqual(
      "age_restriction_type%5B%5D=1&listing_type_id%5B%5D=1&display_location=Mesa%2C%20AZ&max_price=5000&min_price=0&model_type_id%5B%5D=1&model_type_id%5B%5D=2"
    )
  })

  it("should omit blank attributes as an appropriate query string", () => {
    const query = queryBuilder({
      ageRestrictionType: 1,
      listingTypeIds: [],
      location: "Mesa, AZ",
      maxPrice: 5000,
      minPrice: 0,
      modelTypeIds: [],
      numBathrooms: 2,
      numBedrooms: 3
    })
    expect(query).toEqual(
      "age_restriction_type%5B%5D=1&display_location=Mesa%2C%20AZ&max_price=5000&min_price=0&num_bathrooms%5B%5D=2&num_bedrooms%5B%5D=3"
    )
  })
})
