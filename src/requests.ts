import "isomorphic-fetch"
import * as qs from "querystring"
import { IEnvironment, IFetchExecutor } from "./types"

/**
 * Retrieves the proper base url for the supplied environment.
 *
 * @param {?Environment} environment Used to determine the current base url.
 * @returns {string} A base URL for the supplied environment.
 */
function baseURL(environment?: IEnvironment): string {
  switch (environment) {
    case IEnvironment.Development:
      return "http://localhost:3000/api/"
    case IEnvironment.Staging:
      return "https://staging.mhbo.com/api/"
    default:
      return "https://mhbo.com/api/"
  }
}

/**
 * Creates a new fetch request utilizing the proper environment and
 * supplied credentials.
 *
 * @param {string} token A signed JWT for the current request.
 * @param {string} method The HTTP method to utilize for this request.
 * @param {string} uri The URI to the resource.
 * @param {?Environment} environment The current environment (defaults to production)
 * @param {?FetchExecutor} fetchExecutor An optional override to perform the HTTP request.
 * @returns {Promise<Response>} The result of the fetch call.
 */
export function authenticatedRequest(
  token: string,
  method: string,
  uri: string,
  environment?: IEnvironment,
  fetchExecutor?: IFetchExecutor,
  body?: any
): Promise<Response> {
  const request: IFetchExecutor = fetchExecutor || fetch
  const url = baseURL(environment) + uri
  return request(url, {
    body: method === "POST" ? qs.stringify(body) : null,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method
  })
}
