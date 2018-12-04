import Client from "../index"

describe("the MHBO API Client", () => {
  it("should provide all supported API resources", () => {
    const client = Client("accessKey", "secret")
    expect(client.homes).toBeDefined()
  })
})
