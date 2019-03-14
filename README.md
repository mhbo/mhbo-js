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

Which will resolve with the following output:

```json
[
  {
    "id": 379824,
    "name": "Imperial Manor Mobile Home Park",
    "address": {
      "id": 1,
      "number_and_street": "4618 Dick Wilson Road",
      "city": "Denver",
      "state": "NC",
      "zip_code": "28037",
      "latitude": "35.542743",
      "longitude": "-80.997491",
      "created_at": "2012-10-03T16:05:21.000-07:00",
      "updated_at": "2014-09-28T19:04:08.000-07:00",
      "lot_num": "",
      "is_hidden": false,
      "county": "Lincoln"
    },
    "external_id": null,
    "source": null,
    "county": "USA",
    "county": "Lincoln",
    "description": "Imperial Manor Mobile Home Park is a manufactured mobile home community.",
    "is_published": true,
    "search_priority": null,
    "num_existing_photos": 1,
    "featured": false,
    "created_at": "2012-05-17T15:32:32.000-07:00",
    "updated_at": "2014-05-08T20:20:37.000-07:00",
  }
  ...
]
```

#### CREATE

To create a new community:

```
curl https://mhbo.com/api/v1/communities \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
  -X POST
  -d '{"name":"MY Community", address:{}, contact:{}, ...}'
```

An acceptable format for the JSON body would be as follows:

```json
{
  "name": "Imperial Manor Mobile Home Park",
  "description": "Imperial Manor Mobile Home Park is a manufactured mobile home community.",
  "external_id": "<An Optional ID Arbitrary to Your Own System>",
  "address": {
    "number_and_street": "4618 Dick Wilson Road",
    "city": "Denver",
    "state": "NC",
    "zip_code": "28037",
    "lot_num": "",
    "county": "Lincoln"
  },
  "country": "USA",
  "contact": {
    "name": "Mike Carey",
    "email": "nccareys3@aol.com",
    "daytime_phone": "7045350218",
    "evening_phone": "7042816072",
    "website": "",
    "fax": null,
    "last_name": null,
    "alt_website": null
  },
  "photos": [
    "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_3_4.jpg",
    "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_5_6.jpg"
  ]
}
```

#### UPDATE

To update a community:

```
curl https://mhbo.com/api/v1/communities/<COMMUNITY_ID> \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
  -X PUT
  -d '{"name":"MY Community", ...}'
```

An acceptable format for the JSON body would be as follows:

```json
{
  "name": "Imperial Manor Mobile Home Park",
  "description": "Imperial Manor Mobile Home Park is a manufactured mobile home community.",
  "external_id": "<An Optional ID Arbitrary to Your Own System>",
  "address": {
    "number_and_street": "4618 Dick Wilson Road",
    "city": "Denver",
    "state": "NC",
    "zip_code": "28037",
    "lot_num": "",
    "county": "Lincoln"
  },
  "country": "USA",
  "contact": {
    "name": "Mike Carey",
    "email": "nccareys3@aol.com",
    "daytime_phone": "7045350218",
    "evening_phone": "7042816072",
    "website": "",
    "fax": null,
    "last_name": null,
    "alt_website": null
  },
  "photos": [
    "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_3_4.jpg",
    "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_5_6.jpg"
  ]
}
```

### Mobilehomes

#### READ

To read mobilehome listings you have added make the following request:

```
curl https://mhbo.com/api/v1/mobile_homes \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
```

Which will resolve with the following output:

```json
[
  {
    "address": {
      "id": 1,
      "number_and_street": "4618 Dick Wilson Road",
      "city": "Denver",
      "state": "NC",
      "zip_code": "28037",
      "latitude": "35.542743",
      "longitude": "-80.997491",
      "created_at": "2012-10-03T16:05:21.000-07:00",
      "updated_at": "2014-09-28T19:04:08.000-07:00",
      "lot_num": "",
      "is_hidden": false,
      "county": "Lincoln"
    },
    "contact": {
      "id": 1,
      "name": "Mike Carey",
      "email": "nccareys3@aol.com",
      "daytime_phone": "7045350218",
      "evening_phone": "7042816072",
      "website": "",
      "created_at": "2012-12-26T08:25:45.000-08:00",
      "updated_at": "2013-04-25T11:04:01.000-07:00",
      "fax": null,
      "last_name": null,
      "alt_website": null
    },
    "num_bathrooms": 1,
    "num_bedrooms": 1,
    "manufacturer_name": "Champion",
    "asking_price": 35000,
    "rental_price": null,
    "model_type": "Double wide",
    "photos": [
      {"id": 4782, "url": "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_3_4.jpg"},
      {"id": 4785, "url": "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_5_6.jpg"}
    ],
    "url": "http://localhost:3000/mobile-home/2-4618-dick-wilson-road-denver-nc-28037-double-wide"
  },
  ...
]
```

#### CREATE

To create a new mobile home:

```
curl https://mhbo.com/api/v1/mobile_homes \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
  -X POST
  -d '{"address":{}, "contact":{}, "num_bathrooms: 1, ...}'
```

An acceptable JSON body to POST a new property:

```json
{
  "address": {
    "number_and_street": "4618 Dick Wilson Road",
    "city": "Denver",
    "state": "NC",
    "zip_code": "28037",
    "lot_num": "",
    "county": "Lincoln"
  },
  "contact": {
    "name": "Mike Carey",
    "email": "nccareys3@aol.com",
    "daytime_phone": "7045350218",
    "evening_phone": "7042816072",
    "website": "",
    "fax": null,
    "last_name": null,
    "alt_website": null
  },
  "num_bathrooms": 1,
  "num_bedrooms": 1,
  "manufacturer_name": "Champion",
  "asking_price": 35000,
  "rental_price": null,
  "model_type": "Double wide",
  "photos": [
    "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_3_4.jpg",
    "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_5_6.jpg"
  ]
}
```


#### UPDATE

To update a mobile home:

```
curl https://mhbo.com/api/v1/mobile_homes/<MOBILE_HOME_ID> \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
  -X PUT
  -d '{"name":"Mobile Home"}'
```

An acceptable JSON body to POST a new property:

```json
{
  "address": {
    "number_and_street": "4618 Dick Wilson Road",
    "city": "Denver",
    "state": "NC",
    "zip_code": "28037",
    "lot_num": "",
    "county": "Lincoln"
  },
  "contact": {
    "name": "Mike Carey",
    "email": "nccareys3@aol.com",
    "daytime_phone": "7045350218",
    "evening_phone": "7042816072",
    "website": "",
    "fax": null,
    "last_name": null,
    "alt_website": null
  },
  "num_bathrooms": 1,
  "num_bedrooms": 1,
  "manufacturer_name": "Champion",
  "asking_price": 35000,
  "rental_price": null,
  "model_type": "Double wide",
  "photos": [
    "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_3_4.jpg",
    "https://d3b9rakn43rtha.cloudfront.net/photos/images/005/049/274/large/DSC07672_5_6.jpg"
  ]
}
```

### Leads

#### READ

To access all available leads in our system available to your company make the following request:

```
curl https://mhbo.com/api/v1/leads \
  -H "Authorization: Bearer <GENERATED_JWT_TOKEN>"
```

Which will return output in the following format:

```json
[
  {
    "id": 676,
    "form": "Acme Leads",
    "full_name": "Merick Goldman",
    "email": "redacted@gmail.com",
    "phone_number": "+14323528961",
    "min_price": 10000,
    "max_price": 20000,
    "address": "Abilene Tx 79606",
    "latitude": "32.3560371",
    "longitude": "-99.8348146",
    "status": false,
    "mobilehome_id": null,
    "created_at": "2019-01-24T08:12:43.000-08:00",
    "updated_at": "2019-01-24T08:12:43.000-08:00",
    "customer_is_notified": false,
    "is_email_read": false,
    "is_enqueued": false
  },
  ...
]
```
