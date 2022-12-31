import { IEnvironment } from "../../types"
import resource from "../index"
import jwt_decode from "jwt-decode"

const emptyPromise = (val: any) => new Promise((resolve, _) => resolve(val))
const mockFetch = jest.fn(() => emptyPromise(emptyPromise({}))) as jest.Mock
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxMDAsImlhdCI6MTU3NDA4NjEwOCwiZXhwIjoxNTg4NDg2MTA4LCJtaGJvX2FjY2Vzc19rZXkiOiJlODFlMzAwZDE3MWYwNjgxNzYxYjEzY2NhNGNkMjRlNyJ9.EyHqEJ2YerWmrbKPtDmUttrb6bnKvf3Ie0VbNjT4MDIrT9B8mQuEwbQ5ue3zvzJ9CvCuHUVXDHRVRFeaN6UhQg"

const users = resource(
  {
    token,
  },
  IEnvironment.Development,
  mockFetch
)

describe("the users resource #addFavorite community", () => {
  beforeEach(() => {
    users.addFavorite(6, "Community", 100)
  })

  it("should make 1 fetch request", () => {
    expect(mockFetch.mock.calls.length).toBe(1)
  })

  it("should call the add favorite endpoint with correct data in body", () => {
    expect(mockFetch.mock.calls[0][0]).toBe(
      "http://localhost:3000/api/v1/users/100/favorites"
    )
    expect(mockFetch.mock.calls[0][1].body).toBe("community_id=6")
  })

  it("should use the HTTP 'POST' verb", () => {
    expect(mockFetch.mock.calls[0][1].method).toBe("POST")
  })

  it("should be authenticated with a Bearer token for the correct user id", () => {
    const authHeader = mockFetch.mock.calls[0][1].headers.Authorization
    const authType = authHeader.split(" ")[0]
    const decoded: any = jwt_decode(authHeader.split(" ")[1])
    expect(authType).toBe("Bearer")
    expect(decoded.user_id).toBe(100)
  })
})
