import { authenticatedRequest } from "../requests"
import { token } from "../token"
import queryBuilder from "./queryBuilder"

import {
  Environment,
  FetchExecutor,
  Credentials,
  MobileHome,
  SearchParams,
  RestResource
} from "../types"

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
  environment?: Environment,
  fetchExecutor?: FetchExecutor
): Promise<MobileHome[]> {
  return authenticatedRequest(
    token(creds),
    "GET",
    `v1/mobile_homes/?${queryBuilder(params)}`,
    environment,
    fetchExecutor
  )
    .then((response: Response) => response.json())
    .then((json: any) => json || [])
}

const homes = (
  creds: Credentials,
  environment?: Environment,
  fetchExecutor?: FetchExecutor
): RestResource<MobileHome> => ({
  search: (params: SearchParams) =>
    search(params, creds, environment, fetchExecutor)
})

export default homes
