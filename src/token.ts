import * as jwt from "jsonwebtoken"
import { ICredentials } from "./types"

// The MHBO API only supports HS512 in it's V1 incarnation.
const SUPPORTED_ALG = "HS512"

/**
 * Generates the current time in seconds and applies an offset which
 * can be useful in ensuring the request is not considered to be created
 * from the future if the client machine's time is slightly off from
 * the server.
 * @param offset An offset in seconds from the current time.
 */
const issueTimestamp = (offset: number): number =>
  Math.round(new Date().getTime() / 1000) + offset

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
      iat: issueTimestamp(-5),
      mhbo_access_key: creds.apiAccessKey
    },
    creds.apiSecret,
    {
      algorithm: SUPPORTED_ALG
    }
  )
}
