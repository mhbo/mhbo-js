import { ICredentials } from "./types"

/**
 *
 * @param {ICredentials} creds The token from server
 * @returns {string} A signed JWT.
 */
export function token(creds: ICredentials): string {
  if (creds.token) {
    return creds.token
  }
  return ""
}
