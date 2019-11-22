import communities from "./communities/index"
import { HOME_TYPE, LISTING_TYPES, MODEL_TYPES } from "./constants"
import homes from "./homes/index"
import token from "./token/index"
import users from "./users/index"

import {
  IAgeRestrictionType,
  ICommunity,
  ICredentials,
  IEntityType,
  IEnvironment,
  IFavorite,
  IListingTypeID,
  ILocationStatusID,
  IMHBOApiClient,
  IMHBOListing,
  IMobileHome,
  IModelTypeID,
  ISellerTypeID,
  IToken
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
  credentials: ICredentials,
  environment?: IEnvironment
): IMHBOApiClient {
  return {
    communities: communities(credentials, environment),
    homes: homes(credentials, environment),
    token: token(credentials),
    users: users(credentials, environment)
  }
}

Client.MODEL_TYPES = MODEL_TYPES
Client.LISTING_TYPES = LISTING_TYPES
Client.HOME_TYPE = HOME_TYPE

export {
  ICredentials,
  IEnvironment,
  IListingTypeID,
  IMHBOApiClient,
  IMobileHome,
  ICommunity,
  IModelTypeID,
  ISellerTypeID,
  IMHBOListing,
  IEntityType,
  IAgeRestrictionType,
  ILocationStatusID,
  IFavorite,
  IToken
}

export default Client
