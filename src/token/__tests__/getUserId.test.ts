import { IToken } from "../../types"
import resource from "../index"

const jsonwebtoken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxMDAsImlhdCI6MTU3NDA4NjEwOCwiZXhwIjoxNTg4NDg2MTA4LCJtaGJvX2FjY2Vzc19rZXkiOiJlODFlMzAwZDE3MWYwNjgxNzYxYjEzY2NhNGNkMjRlNyJ9.EyHqEJ2YerWmrbKPtDmUttrb6bnKvf3Ie0VbNjT4MDIrT9B8mQuEwbQ5ue3zvzJ9CvCuHUVXDHRVRFeaN6UhQg"

const token = resource({
  token: jsonwebtoken
})

describe("the users resource #addFavorite community", () => {
  let userToken: IToken = {}
  beforeEach(() => {
    userToken = token.getUserId()
  })

  it("should call return correct user Id", () => {
    expect(userToken.userId).toBeDefined()
    expect(userToken.userId).toBe(100)
  })
})
