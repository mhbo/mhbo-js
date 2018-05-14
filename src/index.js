//@flow
const homes = require("./homes")

import type { Environment, MHBOApiClient, Credentials } from "./types.flow.js"

const Client = (
  apiAccessKey: string,
  apiSecret: string,
  environment: ?Environment
): MHBOApiClient => {
  const creds: Credentials = { apiAccessKey, apiSecret }
  return { homes: homes(environment, creds) }
}

module.exports = {
  Client
}
