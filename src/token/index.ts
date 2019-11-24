import jsonwebtoken from "jsonwebtoken"
import { ICredentials, IToken, ITokenResource } from "../types"

const token = (creds: ICredentials): ITokenResource<IToken> => ({
  getUserId: () => {
    const decoded: any = jsonwebtoken.decode(creds.token ? creds.token : "")
    if (!decoded) {
      return {} as IToken
    }
    return { userId: decoded.user_id } as IToken
  }
})

export default token
