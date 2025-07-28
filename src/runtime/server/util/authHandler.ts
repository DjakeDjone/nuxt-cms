import { useAuthStorage } from './storage'
import type { AuthToken, BaseAuthUser, SanitizedUser, UserCredentials } from '../model/auth'
import { getCookie, setCookie, useRuntimeConfig } from '#imports'
import type { H3Event } from 'h3'

export const useAuthHandler = () => {
  const storage = useAuthStorage()

  const loginUser = async (credentials: UserCredentials): Promise<BaseAuthUser | null> => {
    const allUsers = await getAllUsers()
    if (!allUsers || allUsers.length === 0) {
      console.warn('No users found after initialization.')
      return null
    }
    const user = allUsers.find(u => u.username === credentials.username)

    if (!user || user.pwd !== credentials.password) {
      return null
    }
    return user
  }

  const updateUser = async (id: string, user: BaseAuthUser): Promise<void> => {
    console.log(`Updating user with ID: ${id}`, user)
    await storage.setItem(`${id}`, user)
  }

  const getUser = async (id: string): Promise<BaseAuthUser | null> => {
    return await storage.getItem<BaseAuthUser>(`${id}`)
  }

  const getAllUsers = async (): Promise<BaseAuthUser[]> => {
    const keys = await storage.getKeys()
    // const users = await storage.getItems<BaseAuthUser[]>()
    // if (!users || users.length === 0) {
    //   const initUsers = useRuntimeConfig().editableContent?.auth?.initUsers || []
    //   if (initUsers.length > 0) {
    //     await storage.setItem(`users`, initUsers)
    //     return initUsers
    //   }
    //   return []
    // }
    // return users || []
    const users: BaseAuthUser[] = []
    for (const key of keys) {
      const user = await storage.getItem<BaseAuthUser>(key)
      if (user) {
        users.push(user)
      }
    }

    if (users.length === 0) {
      const initUsers = useRuntimeConfig().editableContent?.auth?.initUsers || []
      if (initUsers.length > 0) {
        for (const user of initUsers) {
          await storage.setItem(`${user.id}`, user)
          users.push(user)
        }
      }
    }
    return users
  }

  const sanitizeUser = <PublicUserData, Roles extends string>(user: BaseAuthUser<PublicUserData, unknown, Roles>): SanitizedUser<PublicUserData, Roles> => {
    const { pwd, tokens, privateUserData, ...sanitized } = user
    return sanitized
  }

  // private helper function to generate a token
  const generateAuthToken = (): AuthToken => {
    const token = Math.random().toString(36).substring(2) // TODO: Use a more secure token generation method
    return {
      token,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token valid for 1 day
    }
  }

  const createUserSession = async <PublicUserData, Roles extends string>
  (creds: UserCredentials):
  Promise<{ user: SanitizedUser<PublicUserData, Roles>, token: AuthToken }> => {
    const user = await loginUser(creds)
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const token = generateAuthToken()
    const mutableUser = { ...user }
    mutableUser.tokens = [...(mutableUser.tokens || []), token]
    await updateUser(mutableUser.id, mutableUser)
    return { user: sanitizeUser<PublicUserData, Roles>(mutableUser), token: token }
  }

  const getUserByToken = async <PublicUserData, Roles extends string>(
    token: string,
  ): Promise<BaseAuthUser<PublicUserData, Roles> | null> => {
    const allUsers = await getAllUsers()
    if (!allUsers) {
      return null
    }

    const user = allUsers.find(u => u.tokens?.some(t => t.token === token))
    if (!user) {
      console.warn('No user found with the provided token')
      return null
    }
    return user
  }

  const setAuthTokenCookie = (event: H3Event, token: AuthToken) => {
    // set cookie with the token
    setCookie(event, 'auth_token', token.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 1 day
    })
  }

  const validateAuthToken = async <PublicUserData = undefined, Roles extends string = string>(event: H3Event): Promise<SanitizedUser<PublicUserData, Roles> | null> => {
    const token = getCookie(event, 'auth_token')
    console.log('Validating auth token:', token)
    if (!token) {
      console.warn('No auth token found in cookies')
      return null
    }
    const user = await getUserByToken<PublicUserData, Roles>(token)
    if (!user) {
      console.warn('No user found for the provided token')
      return null
    }
    // TODO: Check if token is expired
    // const currentTime = new Date()
    // const isTokenValid = user.tokens?.some(t => t.token === token && t.expires > currentTime)
    // if (!isTokenValid) {
    //   console.warn('Auth token is expired or invalid')
    //   return null
    // }
    return user
  }

  return {
    loginUser,
    updateUser,
    getUser,
    getAllUsers,
    sanitizeUser,
    createUserSession,
    getUserByToken,
    setAuthTokenCookie,
    validateAuthToken,
  }
}
