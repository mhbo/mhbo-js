//
const { authenticatedRequest } = require("../requests")
const { token } = require("../token")
const snakecase = require("lodash.snakecase")
const qs = require("qs")

/**
 * Performs a search for mobile homes.
 *
 * @param {Credentials} creds
 * @param {?Environment} environment,
 * @param {?FetchExecutor} fetchExecutor
 * @returns {Promise<MobileHome[]>}
 */
function search(params, creds, environment, fetchExecutor) {
  const searchAttributes = Object.keys(params).reduce(
    (p, k) => Object.assign({}, p, { [snakecase(k)]: params[k] }),
    {}
  )
  return authenticatedRequest(
    token(creds),
    "GET",
    `v1/mobile_homes/?${qs.stringify(searchAttributes)}`,
    environment,
    fetchExecutor
  )
    .then(response => response.json())
    .then(json => json || [])
}

module.exports = (creds, environment, fetchExecutor) => ({
  search: params => search(params, creds, environment, fetchExecutor)
})
