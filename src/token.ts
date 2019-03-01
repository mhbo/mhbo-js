import * as jwt from "jsonwebtoken"
import { ICredentials } from "./types"

// The MHBO API only supports HS512 in it's V1 incarnation.
const SUPPORTED_ALG = "HS512"

/**
 * Generates a signed JWT that can be used to make authenticated
 * requests against the MHBO API.
 *
 * @param {ICredentials} creds The access key and the secret to sign the token.
 * @returns {string} A signed JWT.
 */
export function token(creds: ICredentials): string {
  return jwt.sign(
    {
      iat: Date.now() - 5,
      mhbo_access_key: creds.apiAccessKey
    },
    creds.apiSecret,
    {
      algorithm: SUPPORTED_ALG
    }
  )
}
