import { useState } from '#app'
import { readonly } from 'vue'
import type { AuthToken, SanitizedUser } from '../server/model/auth'
import { simpleCookieRef } from '../util/cookieHandler'

export const useUserHandler = <T extends SanitizedUser = SanitizedUser>() => {
  const user = useState<T>('user')
  const loggedIn = simpleCookieRef<boolean>('loggedIn', false)

  const loginUser = (newUser: T, _token: AuthToken) => {
    user.value = newUser
    loggedIn.value = true
  }

  const logoutUser = () => {
    user.value = undefined as any
    loggedIn.value = false
  }

  return {
    user,
    loggedIn: readonly(loggedIn),
    loginUser,
    logoutUser,
  }
}
