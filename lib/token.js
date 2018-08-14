//
const jwt = require("jsonwebtoken")

// The MHBO API only supports HS512 in it's V1 incarnation.
const SUPPORTED_ALG = "HS512"

/**
 * Generates a signed JWT that can be used to make authenticated
 * requests against the MHBO API.
 *
 * @param {Credentials} creds The access key and the secret to sign the token.
 * @returns {string} A signed JWT.
 */
function token(creds) {
  return jwt.sign(
    {
      mhbo_access_key: creds.apiAccessKey,
      iat: Date.now() - 5
    },
    creds.apiSecret,
    {
      algorithm: SUPPORTED_ALG
    }
  )
}

module.exports = {
  token
}