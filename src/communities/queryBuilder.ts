import { snakeCase } from "lodash"
import * as qs from "querystring"
import { ISearchParams } from "../types"

// ?is_all_ages=yes&is_senior=yes&max_price=100000&model_type_id%5B%5D=3&model_type_id%5B%5D=4&model_type_id%5B%5D=5&sort=newest-listings&view_type=list

const queryBuilder = (params: ISearchParams) => {
  const query: { [name: string]: any } = Object.assign({}, params)
  const querystring = qs
    .stringify(
      Object.keys(query)
        .filter(k => typeof query[k] !== undefined)
        .filter(k => query[k] !== "")
        .filter(k => k !== "homeTypeId")
        .filter(k => k !== "listingIds")
        .reduce(
          (p, k) => Object.assign({}, p, { [snakeCase(k)]: query[k] }),
          {}
        )
    )
    .replace("location", "display_location")
  return `${
    params.listingIds ? `${params.listingIds.toString()}&` : ""
  }${querystring}`
}

export default queryBuilder
