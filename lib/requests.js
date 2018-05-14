//     
require("isomorphic-fetch")

                                                              

/**
 * Retrieves the proper base url for the supplied environment.
 *
 * @param {?Environment} environment Used to determine the current base url.
 * @returns {string} A base URL for the supplied environment.
 */
function baseURL(environment              )         {
  switch (environment) {
    case "DEVELOPMENT":
      return "http://localhost:3000/api/"
    case "STAGING":
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
function authenticatedRequest(
  token        ,
  method        ,
  uri        ,
  environment              ,
  fetchExecutor                
)                    {
  const request = fetchExecutor || fetch
  return request(baseURL(environment) + uri, {
    method,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

module.exports = {
  authenticatedRequest
}