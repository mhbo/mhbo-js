const { authenticatedRequest } = require("./requests")
const mockFetch = jest.fn()

// A simple example test
describe("authenticatedRequest()", () => {
  beforeEach(() => {
    authenticatedRequest(
      "testJWT",
      "POST",
      "v1/some/endpoint",
      "DEVELOPMENT",
      mockFetch
    )
  })

  it("should make a fetch request", () => {
    expect(mockFetch.mock.calls.length).toBe(1)
  })

  it("should call the supplied endpoint", () => {
    expect(mockFetch.mock.calls[0][0]).toBe(
      "http://localhost:3000/api/v1/some/endpoint"
    )
  })

  it("should use the supplied method request", () => {
    expect(mockFetch.mock.calls[0][1].method).toBe("POST")
  })

  it("should set the Bearer token", () => {
    expect(mockFetch.mock.calls[0][1].headers["Authorization"]).toBe(
      "Bearer testJWT"
    )
  })
})
