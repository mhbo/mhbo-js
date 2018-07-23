//@flow
const { authenticatedRequest } = require("../requests")
const { token } = require("../token")
const snakecase = require("lodash.snakecase")
const qs = require("qs")

import type {
  Environment,
  FetchExecutor,
  Credentials,
  MobileHome,
  SearchParams,
  RestResource
} from "../types.flow"

/**
 * Performs a search for mobile homes.
 *
 * @param {Credentials} creds
 * @param {?Environment} environment,
 * @param {?FetchExecutor} fetchExecutor
 * @returns {Promise<MobileHome[]>}
 */
function search(
  params: SearchParams,
  creds: Credentials,
  environment: ?Environment,
  fetchExecutor: ?FetchExecutor
): Promise<MobileHome[]> {
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

module.exports = (
  creds: Credentials,
  environment: ?Environment,
  fetchExecutor: ?FetchExecutor
): RestResource<MobileHome> => ({
  search: params => search(params, creds, environment, fetchExecutor)
})
