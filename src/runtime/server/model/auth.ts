export type BaseAuthUserRoles = 'admin' | 'user'

export type UserCredentials = {
  username: string
  password: string
}

export type AuthToken = {
  token: string
  expires: Date
}

export type SanitizedUser<
  PublicUserData = undefined,
  Roles extends string = never,
> = {
  id: string
  username: string
  role: BaseAuthUserRoles | Roles
  publicUserData?: PublicUserData
}

export type BaseAuthUser<
  PublicUserData = undefined,
  PrivateUserData = undefined,
  Roles extends string = never,
> = SanitizedUser<PublicUserData, Roles> & {
  pwd: string
  tokens: AuthToken[]
  privateUserData?: PrivateUserData
}
