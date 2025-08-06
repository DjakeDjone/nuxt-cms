import { createError, defineEventHandler, readBody } from 'h3'
import { useAuthHandler } from '../../util/authHandler'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const credentials = body

  if (!credentials || !credentials.username || !credentials.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request data',
    })
  }

  const authHandler = useAuthHandler()
  const { user, token } = await authHandler.createUserSession(credentials)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  authHandler.setAuthTokenCookie(event, token)

  return {
    user: user,
    token,
  }
})
