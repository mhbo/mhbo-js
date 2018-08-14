//@flow
const { authenticatedRequest } = require("../requests")
const { token } = require("../token")
const queryBuilder = require("./queryBuilder")

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

module.exports = (
  creds: Credentials,
  environment: ?Environment,
  fetchExecutor: ?FetchExecutor
): RestResource<MobileHome> => ({
  search: (params: SearchParams) =>
    search(params, creds, environment, fetchExecutor)
})
