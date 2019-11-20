import jsonwebtoken from "jsonwebtoken"
import { requestGet, requestPost, requestDelete } from "../entityRequest"
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
  addFavorite: (id: number, type: "Community" | "MobileHome") => {
    const decoded: any = jsonwebtoken.decode(creds.token ? creds.token : "")
    if (!decoded) {
      return new Promise(resolve => {
        resolve()
      })
    }
    const body =
      type === "Community" ? { community_id: id } : { mobilehome_id: id }
    return requestPost<IFavorite>(
      `v1/users/${decoded.user_id}/favorites`,
      creds,
      "Favorites",
      Ienvironment,
      fetchExecutor,
      body
    )
  },
  deleteFavorite: (id: number) => {
    const decoded: any = jsonwebtoken.decode(creds.token ? creds.token : "")
    if (!decoded) {
      return new Promise(resolve => {
        resolve([])
      })
    }
    return requestDelete<IFavorite>(
      `v1/users/${decoded.user_id}/favorites/${id}`,
      creds,
      Ienvironment,
      fetchExecutor
    )
  },
  getFavorites: () => {
    const decoded: any = jsonwebtoken.decode(creds.token ? creds.token : "")
    if (!decoded) {
      return new Promise(resolve => {
        resolve([])
      })
    }
    return requestGet<IFavorite>(
      `v1/users/${decoded.user_id}/favorites`,
      creds,
      "Favorites",
      Ienvironment,
      fetchExecutor
    )
  }
})

export default users
