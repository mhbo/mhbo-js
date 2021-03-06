import * as jwt from "jsonwebtoken"

import { IEnvironment } from "../../types"
import resource from "../index"

const emptyPromise = (val: any) => new Promise((resolve, _) => resolve(val))
const mockFetch = jest.fn(() => emptyPromise(emptyPromise({})))
const apiAccessKey = "TestID"
const apiSecret = "TestSecret"

const homes = resource(
  {
    apiAccessKey,
    apiSecret
  },
  IEnvironment.Development,
  mockFetch
)

describe("the homes resource #details", () => {
  beforeEach(() => {
    homes.byIds([234, 2345])
  })

  it("should make 1 fetch request", () => {
    expect(mockFetch.mock.calls.length).toBe(1)
  })

  it("should call the search endpoint", () => {
    expect(mockFetch.mock.calls[0][0]).toBe(
      "http://localhost:3000/api/v1/mobile_homes/234,2345?detail_level=FULL"
    )
  })

  it("should use the HTTP 'GET' verb", () => {
    expect(mockFetch.mock.calls[0][1].method).toBe("GET")
  })

  it("should be authenticated with a Bearer token assigned to the correct access key", () => {
    const authHeader = mockFetch.mock.calls[0][1].headers.Authorization
    const authType = authHeader.split(" ")[0]
    const decoded: any = jwt.verify(authHeader.split(" ")[1], apiSecret)
    expect(authType).toBe("Bearer")
    expect(decoded.mhbo_access_key).toBe(apiAccessKey)
  })
})
