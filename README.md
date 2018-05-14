# mhbo-js

A JS wrapper for interacting with the MHBO API via nodeJS. **This library is NOT intended for browser usage as it requires an embedded secret key.** This project should serve as a proof of concept for allowing third parties to interact with the MHBO api via other languages or platforms.

## Usage

Since this package is currently private, mhbo developers can install this library by running:

`yarn add https://github.com/mhbo/mhbo-js.git`

To use the client in your nodejs project you can initialize the client and make restful requests:

```js
const MHBOClient = require("mhbo-js")
const mhbo = MHBO(process.env.MHBO_ACCESS_KEY, process.env.MHBO_SECRET_KEY)

mhbo.homes.search().then(homes => {
  console.log(`Found ${homes.length} homes that match your search.`)
})
```