export type BaseAuthUserRoles = 'admin' | 'user'

export type UserCredentials = {
    username: string
    password: string
}

export type AuthToken = {
    token: string
    expires: Date
}

export type SanitizedUser<T = undefined, Roles = undefined> = {
    id: string
    username: string
    role: BaseAuthUserRoles & Roles
    publicUserData?: T
}

export type BaseAuthUser<PublicUserData = undefined, PrivateUserData = undefined, Roles = undefined> = SanitizedUser<PublicUserData, Roles> & {
    pwd: string
    tokens: AuthToken[]
    privateUserData?: PrivateUserData
}
