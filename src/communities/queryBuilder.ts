import { snakeCase } from "lodash"
import * as qs from "querystring"
import { ISearchParams } from "../types"

// ?is_all_ages=yes&is_senior=yes&max_price=100000&model_type_id%5B%5D=3&model_type_id%5B%5D=4&model_type_id%5B%5D=5&sort=newest-listings&view_type=list

const queryBuilder = (params: ISearchParams) => {
  const query: { [name: string]: any } = Object.assign({}, params)
  return qs
    .stringify(
      Object.keys(query)
        .filter(k => typeof query[k] !== undefined)
        .filter(k => query[k] !== "")
        .filter(k => k !== "homeTypeId")
        .reduce(
          (p, k) => Object.assign({}, p, { [snakeCase(k)]: query[k] }),
          {}
        )
    )
    .replace("location", "display_location")
    .replace(/age_restriction_type/g, "age_restriction_type%5B%5D")
}

export default queryBuilder
