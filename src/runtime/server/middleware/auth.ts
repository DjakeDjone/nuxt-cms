import { createError, useRuntimeConfig } from '#imports'
import { defineEventHandler, getRequestURL } from 'h3'
import { useAuthHandler } from '../util/authHandler'
import type { UrlRule } from '../../../types'

export default defineEventHandler(async (event) => {
  const requestUrl = getRequestURL(event)
  const method = event.method
  const rules: UrlRule[]
    = useRuntimeConfig(event).editableContent.auth.routeRules

  if (requestUrl.pathname.startsWith('/api/auth')) {
    return
  }

  // throw error if no rules match
  const matchedRule = rules.find((rule) => {
    const urlMatch
      = typeof rule.url === 'string'
        ? requestUrl.pathname.startsWith(rule.url)
        : new RegExp(rule.url).test(requestUrl.pathname)
    return (
      urlMatch
      && (!rule.method || rule.method.toUpperCase() === method.toUpperCase())
    )
  })

  if (!matchedRule) {
    // allow
    console.warn(
      `No matching rule for ${requestUrl.pathname} with method ${method}`,
    )
    return
  }

  if (matchedRule.roles.includes('*')) {
    // allow all roles
    (
      `✅ Access granted to ${requestUrl.pathname} with method ${method}`,
    )
    return
  }

  // check if user has any of the required roles
  const authHandler = useAuthHandler()
  const user = await authHandler.validateAuthToken(event)
  if (!user) {
    console.warn(
      `❌ User is not authenticated for ${requestUrl.pathname} with method ${method}`,
    )
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'User is not authenticated',
    })
  }

  if (!matchedRule.roles.includes(user.role)) {
    console.warn(
      `❌ User ${user.username} with role ${user.role} does not have permission to access ${requestUrl.pathname} with method ${method}`,
    )
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: `User does not have permission to access ${requestUrl.pathname}`,
    })
  }

  // allow access
  (
    `✅ User ${user.username} with role ${user.role} accessed ${requestUrl.pathname} with method ${method}`,
  )
  return
})
