//
const snakecase = require("lodash.snakecase")
const qs = require("querystring")

// ?is_all_ages=yes&is_senior=yes&max_price=100000&model_type_id%5B%5D=3&model_type_id%5B%5D=4&model_type_id%5B%5D=5&sort=newest-listings&view_type=list

const queryBuilder = params => {
  const query = Object.assign({}, params, {
    isAllAges: params.isAllAges ? "yes" : "no",
    isSenior: params.isSenior ? "yes" : "no"
  })
  return qs
    .stringify(
      Object.keys(query)
        .filter(k => query[k] !== "")
        .reduce(
          (p, k) => Object.assign({}, p, { [snakecase(k)]: query[k] }),
          {}
        )
    )
    .replace("location", "display_location")
    .replace(/num_bathrooms/g, "num_bathrooms%5B%5D")
    .replace(/num_bedrooms/g, "num_bedrooms%5B%5D")
    .replace(/model_type_ids/g, "model_type_id%5B%5D")
    .replace(/listing_type_ids/g, "listing_type_id%5B%5D")
}

module.exports = queryBuilder
