//@flow
const { authenticatedRequest } = require("../requests")
const { token } = require("../token")

import type {
  Environment,
  Credentials,
  MobileHome,
  RestResource
} from "../types.flow"

/**
 * Performs a search for
 *
 * @param {?Environment} environment
 * @param {Credentials} creds
 * @returns {Promise<MobileHome[]>}
 */
function search(
  environment: ?Environment,
  creds: Credentials
): Promise<MobileHome[]> {
  return authenticatedRequest(
    environment,
    token(creds),
    "GET",
    "v1/mobile_homes/"
  )
    .then(response => response.json())
    .then(json => json || [])
}

module.exports = (
  environment: ?Environment,
  creds: Credentials
): RestResource<MobileHome> => ({
  search: () => search(environment, creds)
})
