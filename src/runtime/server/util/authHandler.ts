import { useAuthStorage } from './storage'
import { AuthToken, BaseAuthUser, SanitizedUser, UserCredentials } from '../model/auth'


export const useAuthHandler = () => {
  const storage = useAuthStorage()

  const loginUser = async (credentials: UserCredentials): Promise<BaseAuthUser | null> => {
    const allUsers = await getAllUsers()
    const user = allUsers.find(u => u.username === credentials.username)

    if (!user || user.pwd !== credentials.password) {
      return null
    }
    return user
  }

  const updateUser = async (id: string, user: BaseAuthUser): Promise<void> => {
    await storage.setItem(`users:${id}`, user)
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
    return users || []
  }

  const sanitizeUser = <PublicUserData = undefined, Roles = undefined>(user: BaseAuthUser<PublicUserData, any, Roles>): SanitizedUser<PublicUserData, Roles> => {
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

  const createUserSession = async <PublicUserData = undefined, Roles = undefined>
    (creds: UserCredentials):
    Promise<{ user: SanitizedUser<PublicUserData, Roles>, token: AuthToken }> => {
    const user = await loginUser(creds)
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const token = generateAuthToken()
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
