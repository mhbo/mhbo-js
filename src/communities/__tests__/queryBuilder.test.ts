import queryBuilder from "../queryBuilder"

describe("the query builder", () => {
  it("should map all attributes as an appropriate query string", () => {
    const query = queryBuilder({
      homeTypeId: 2,
      location: "Mesa, AZ"
    })
    expect(query).toEqual("display_location=Mesa%2C%20AZ")
  })

  it("should omit blank attributes as an appropriate query string", () => {
    const query = queryBuilder({
      homeTypeId: 2
    })
    expect(query).toEqual("")
  })
})
