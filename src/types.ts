import type { BaseAuthUser } from "./runtime/server/model/auth"

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    editableContent: {
      storageKey?: string
      auth: {
        protectedRoutes: string[]
        initUsers: BaseAuthUser[]
      }
    }
  }
}

export { }
