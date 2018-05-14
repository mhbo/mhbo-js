//
const { authenticatedRequest } = require("../requests")
const { token } = require("../token")

/**
 * Performs a search for
 *
 * @param {?Environment} environment
 * @param {Credentials} creds
 * @returns {Promise<MobileHome[]>}
 */
function search(environment, creds) {
  return authenticatedRequest(
    environment,
    token(creds),
    "GET",
    "v1/mobile_homes/"
  )
    .then(response => response.json())
    .then(json => json || [])
}

module.exports = (environment, creds) => ({
  search: () => search(environment, creds)
})
