import { LISTING_TYPES, MODEL_TYPES } from "./constants"
import homes from "./homes/index"

import {
  ICredentials,
  IEnvironment,
  IListingTypeID,
  IMHBOApiClient,
  IMobileHome,
  IModelTypeID,
  ISellerTypeID
} from "./types"

/**
 * Initializes a new instance of the MHBO API Client.
 *
 * @param {string} apiAccessKey The access key used to identify the account connecting to the API.
 * @param {string} apiSecret The secret key used to sign requests for this account.
 * @param {?IEnvironment} environment An optional override if a developer needs to test the client against a local development environment.
 * @returns {IMHBOApiClient} A wrapper for interacting with the MHBO API.
 */
function Client(
  apiAccessKey: string,
  apiSecret: string,
  environment?: IEnvironment
): IMHBOApiClient {
  const creds: ICredentials = { apiAccessKey, apiSecret }
  return { homes: homes(creds, environment) }
}

Client.MODEL_TYPES = MODEL_TYPES
Client.LISTING_TYPES = LISTING_TYPES

export {
  ICredentials,
  IEnvironment,
  IListingTypeID,
  IMHBOApiClient,
  IMobileHome,
  IModelTypeID,
  ISellerTypeID
}

export default Client
