//
const homes = require("./homes")

/**
 * Initializes a new instance of the MHBO API Client.
 *
 * @param {string} apiAccessKey The access key used to identify the account connecting to the API.
 * @param {string} apiSecret The secret key used to sign requests for this account.
 * @param {?Environment} environment An optional override if a developer needs to test the client against a local development environment.
 * @returns {MHBOApiClient} A wrapper for interacting with the MHBO API.
 */
function Client(apiAccessKey, apiSecret, environment) {
  const creds = { apiAccessKey, apiSecret }
  return { homes: homes(creds, environment) }
}

module.exports = Client
