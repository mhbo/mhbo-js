//
const { authenticatedRequest } = require("../requests")
const { token } = require("../token")
const queryBuilder = require("./queryBuilder")

/**
 * Performs a search for mobile homes.
 *
 * @param {Credentials} creds
 * @param {?Environment} environment,
 * @param {?FetchExecutor} fetchExecutor
 * @returns {Promise<MobileHome[]>}
 */
function search(params, creds, environment, fetchExecutor) {
  return authenticatedRequest(
    token(creds),
    "GET",
    `v1/mobile_homes/?${queryBuilder(params)}`,
    environment,
    fetchExecutor
  )
    .then(response => response.json())
    .then(json => json || [])
}

module.exports = (creds, environment, fetchExecutor) => ({
  search: params => search(params, creds, environment, fetchExecutor)
})
