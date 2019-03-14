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

## API SPEC

### Authentication

The MHBO API utilizes an authentication schema requiring a JWT that is passed as a Bearer token:

```
curl https://mhbo.com/api/v1/mobile_homes \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
```

To generate a token you must obtain a `MHBO_ACCESS_KEY` and `MHBO_SECRET_KEY` from one of our network administrators. You can use those credentials as we do in this library. You can [review the source code](https://github.com/mhbo/mhbo-js/blob/master/src/token.ts#L14) for generating a token if you need to do so in another programming language. It is essential that a valid `iat` attribute is included in the payload and that `HS512` encryption is used.

### Communities

#### READ

To read communities you have added or can manage make the following request:

```
curl https://mhbo.com/api/v1/communities \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
```

#### CREATE

To create a new community:

```
curl https://mhbo.com/api/v1/communities \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
  -X POST
  -d '{"name":"MY Community"}'
```

#### UPDATE

To update a community:

```
curl https://mhbo.com/api/v1/communities/<COMMUNITY_ID> \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
  -X PUT
  -d '{"name":"MY Community"}'
```

### Mobilehomes

#### READ

To read mobilehome listings you have added or can manage make the following request:

```
curl https://mhbo.com/api/v1/mobile_homes \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
```

#### CREATE

To create a new mobile home:

```
curl https://mhbo.com/api/v1/mobile_homes \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
  -X POST
  -d '{"name":"MY Community"}'
```

#### UPDATE

To update a mobile home:

```
curl https://mhbo.com/api/v1/mobile_homes/<MOBILE_HOME_ID> \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
  -X PUT
  -d '{"name":"Mobile Home"}'
```

### Leads

#### READ

To access all available leads in our system available to your company make the following request:

```
curl https://mhbo.com/api/v1/leads \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
```
