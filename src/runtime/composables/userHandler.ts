import { useState } from '#app'
import { readonly } from 'vue'
import type { AuthToken, SanitizedUser } from '../server/model/auth'

export const useUserHandler = <T extends SanitizedUser = SanitizedUser>() => {
  const user = useState<T>('user')
  const loggedIn = useState<boolean>('loggedIn', () => false)

  const loginUser = (newUser: T, _token: AuthToken) => {
    user.value = newUser
    loggedIn.value = true
  }

  return {
    user,
    loggedIn: readonly(loggedIn),
    loginUser,
  }
}
