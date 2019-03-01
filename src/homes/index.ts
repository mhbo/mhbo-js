import { authenticatedRequest } from "../requests"
import { token } from "../token"
import queryBuilder from "./queryBuilder"

import {
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMobileHome,
  IRestResource,
  ISearchParams
} from "../types"

/**
 * Performs a search for mobile homes.
 *
 * @param {ICredentials} creds
 * @param {?IEnvironment} environment,
 * @param {?IFetchExecutor} fetchExecutor
 * @returns {Promise<MobileHome[]>}
 */
function search(
  params: ISearchParams,
  creds: ICredentials,
  environment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): Promise<IMobileHome[]> {
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
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IRestResource<IMobileHome> => ({
  search: (params: ISearchParams) =>
    search(params, creds, Ienvironment, fetchExecutor)
})

export default homes
