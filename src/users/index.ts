import { requestDelete, requestGet, requestPost } from "../entityRequest"
import {
  ICredentials,
  IEnvironment,
  IFavorite,
  IFavoritesResource,
  IFetchExecutor
} from "../types"

const users = (
  creds: ICredentials,
  Ienvironment?: IEnvironment,
  fetchExecutor?: IFetchExecutor
): IFavoritesResource<IFavorite> => ({
  addFavorite: (
    id: number,
    type: "Community" | "MobileHome",
    userId: number
  ) => {
    const body =
      type === "Community" ? { community_id: id } : { mobilehome_id: id }
    return requestPost<IFavorite>(
      `v1/users/${userId}/favorites`,
      creds,
      "Favorites",
      Ienvironment,
      fetchExecutor,
      body
    )
  },
  deleteFavorite: (id: number, userId: number) => {
    return requestDelete<IFavorite>(
      `v1/users/${userId}/favorites/${id}`,
      creds,
      Ienvironment,
      fetchExecutor
    )
  },
  getFavorites: (userId: number) => {
    return requestGet<IFavorite>(
      `v1/users/${userId}/favorites`,
      creds,
      "Favorites",
      Ienvironment,
      fetchExecutor
    )
  }
})

export default users
