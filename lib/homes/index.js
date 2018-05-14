//
const { authenticatedRequest } = require("../requests")
const { token } = require("../token")

/**
 * Performs a search for mobile homes.
 *
 * @param {Credentials} creds
 * @param {?Environment} environment,
 * @param {?FetchExecutor} fetchExecutor
 * @returns {Promise<MobileHome[]>}
 */
function search(creds, environment, fetchExecutor) {
  return authenticatedRequest(
    token(creds),
    "GET",
    "v1/mobile_homes/",
    environment,
    fetchExecutor
  )
    .then(response => response.json())
    .then(json => json || [])
}

module.exports = (creds, environment, fetchExecutor) => ({
  search: () => search(creds, environment, fetchExecutor)
})
