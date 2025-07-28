import { useAuthStorage } from './storage'
import type { AuthToken, BaseAuthUser, SanitizedUser, UserCredentials } from '../model/auth'
import { useRuntimeConfig } from '#imports'

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
    await storage.setItem(`${id}`, user)
  }

  const getUser = async (id: string): Promise<BaseAuthUser | null> => {
    return await storage.getItem<BaseAuthUser>(`users:${id}`)
  }

  const deleteUser = async (id: string): Promise<void> => {
    // don't remove if user is the last admin
    const allUsers = await storage.getItem<BaseAuthUser[]>(`users`)
    if (allUsers && allUsers.length === 1 && allUsers[0].role === 'admin') {
      throw new Error('Cannot delete the last admin user.')
    }
    await storage.removeItem(`users:${id}`)
  }

  const getAllUsers = async (): Promise<BaseAuthUser[]> => {
    const users = await storage.getItem<BaseAuthUser[]>(`users`)
    if (!users || users.length === 0) {
      const initUsers = useRuntimeConfig().editableContent?.auth?.initUsers || []
      if (initUsers.length > 0) {
        await storage.setItem(`users`, initUsers)
        return initUsers
      }
      return []
    }
    return users || []
  }

  const sanitizeUser = <PublicUserData = undefined, Roles extends string = string>(user: BaseAuthUser<PublicUserData, any, Roles>): SanitizedUser<PublicUserData, Roles> => {
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

  const createUserSession = async <PublicUserData = undefined, Roles extends string = string>
  (creds: UserCredentials):
  Promise<{ user: SanitizedUser<PublicUserData, Roles>, token: AuthToken }> => {
    const user = await loginUser(creds)
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const token = generateAuthToken()
    if (!user.tokens) {
      user.tokens = []
    }
    user.tokens.push(token)
    await updateUser(user.id, user)
    return { user: sanitizeUser<PublicUserData, Roles>(user), token: token }
  }

  return {
    loginUser,
    updateUser,
    getUser,
    deleteUser,
    getAllUsers,
    sanitizeUser,
    createUserSession,
  }
}
