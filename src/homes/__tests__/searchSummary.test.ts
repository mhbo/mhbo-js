import jwt_decode from "jwt-decode"
import { IEnvironment, IListingTypeID } from "../../types"
import resource from "../index"

const emptyPromise = (val: any) => new Promise((resolve, _) => resolve(val))
const mockFetch = jest.fn(() => emptyPromise(emptyPromise({}))) as jest.Mock

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxMDAsImlhdCI6MTU3NDA4NjEwOCwiZXhwIjoxNTg4NDg2MTA4LCJtaGJvX2FjY2Vzc19rZXkiOiJlODFlMzAwZDE3MWYwNjgxNzYxYjEzY2NhNGNkMjRlNyJ9.EyHqEJ2YerWmrbKPtDmUttrb6bnKvf3Ie0VbNjT4MDIrT9B8mQuEwbQ5ue3zvzJ9CvCuHUVXDHRVRFeaN6UhQg"

const homes = resource(
  {
    token,
  },
  IEnvironment.Development,
  mockFetch
)

describe("the homes resource #summary", () => {
  beforeEach(() => {
    homes.searchSummary({
      homeTypeId: 1,
      listingTypeIds: [IListingTypeID.ForSale],
      maxPrice: 100000,
      minPrice: 50000,
      numBathrooms: [2],
      numBedrooms: [3],
    })
  })

  it("should make 1 fetch request", () => {
    expect(mockFetch.mock.calls.length).toBe(1)
  })

  it("should call the search endpoint", () => {
    expect(mockFetch.mock.calls[0][0]).toBe(
      "http://localhost:3000/api/v1/mobile_homes/?detail_level=SUMMARY&listing_type_id%5B%5D=1&max_price=100000&min_price=50000&num_bathrooms%5B%5D=2&num_bedrooms%5B%5D=3"
    )
  })

  it("should use the HTTP 'GET' verb", () => {
    expect(mockFetch.mock.calls[0][1].method).toBe("GET")
  })

  it("should be authenticated with a Bearer token for the correct user id", () => {
    const authHeader = mockFetch.mock.calls[0][1].headers.Authorization
    const authType = authHeader.split(" ")[0]
    const decoded: any = jwt_decode(authHeader.split(" ")[1])
    expect(authType).toBe("Bearer")
    expect(decoded.user_id).toBe(100)
  })
})
