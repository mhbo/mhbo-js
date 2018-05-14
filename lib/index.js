//     
const homes = require("./homes")

                                                                              

const Client = (
  apiAccessKey        ,
  apiSecret        ,
  environment              
)                => {
  const creds              = { apiAccessKey, apiSecret }
  return { homes: homes(environment, creds) }
}

module.exports = {
  Client
}
