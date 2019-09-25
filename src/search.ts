import parseResult from "./parseResult"
import { authenticatedRequest } from "./requests"
import { token } from "./token"
import {
  ICredentials,
  IEnvironment,
  IFetchExecutor,
  IMHBOListing,
  IUnparsedMHBOListing
} from "./types"

/**
 * Performs a search for mobile homes.
 *
 * @param creds The authentication credential for the API request.
 * @param environment An optional override of the environment to utilize.
 * @param fetchExecutor An instance of the request executor.
 * @returns An array of mobile home results.
 */
async function search<T extends IMHBOListing, U extends IUnparsedMHBOListing>(
  url: string,
  creds: ICredentials,
  environment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): Promise<T[]> {
  const response = await authenticatedRequest(
    token(creds),
    "GET",
    url,
    environment,
    fetchExecutor
  )
  return await parseResult<T, U>(response)
}

export default search
