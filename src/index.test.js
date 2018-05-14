const Client = require("./index")

describe("the MHBO API Client", () => {
  it("should provide all supported API resources", () => {
    client = Client("accessKey", "secret")
    expect(client.homes).toBeDefined()
  })
})
