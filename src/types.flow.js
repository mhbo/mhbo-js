//@flow

export type Environment = "PRODUCTION" | "STAGING" | "DEVELOPMENT"

export type Credentials = {
  apiAccessKey: string,
  apiSecret: string
}

export type MobileHome = {
  id: string,
  photos?: string[]
}

export type RestResource<T> = {
  search: () => Promise<T[]>
}

export type MHBOApiClient = {
  homes: RestResource<MobileHome>
}
