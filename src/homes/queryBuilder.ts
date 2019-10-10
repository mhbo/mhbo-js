import communitiesQueryBuilder from "../communities/queryBuilder"
import { ISearchParams } from "../types"

// ?is_all_ages=yes&is_senior=yes&max_price=100000&model_type_id%5B%5D=3&model_type_id%5B%5D=4&model_type_id%5B%5D=5&sort=newest-listings&view_type=list

const queryBuilder = (params: ISearchParams) => {
  return communitiesQueryBuilder(params)
    .replace(/model_type_ids/g, "model_type_id%5B%5D")
    .replace(/listing_type_ids/g, "listing_type_id%5B%5D")
}

export default queryBuilder
