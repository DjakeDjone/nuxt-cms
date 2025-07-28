import { createError } from "#imports"
import { defineEventHandler, getRequestURL } from "h3"
import { useAuthHandler } from '../util/authHandler'

export type UrlRule = {
    roles: string[],
    url: string | RegExp,
    method?: string,
}

export const getRouteRules = () => {
    return [
        {
            // allow everything that's not /api
            roles: ['*'],
            url: /^\/(?!api).*/,
        },
        {
            // editable route ('/api/editable/*')
            roles: ['admin'],
            url: /^\/api\/editable\/.*/,
            method: 'POST',
        },
    ]
}

export default defineEventHandler(async (event) => {
    const requestUrl = getRequestURL(event)
    const method = event.method
    const rules = getRouteRules()

    // throw error if no rules match
    const matchedRule = rules.find(rule => {
        const urlMatch = typeof rule.url === 'string'
            ? requestUrl.pathname.startsWith(rule.url)
            : rule.url.test(requestUrl.pathname)
        return urlMatch && (!rule.method || rule.method.toUpperCase() === method.toUpperCase())
    })

    if (!matchedRule) {
        // allow
        console.warn(`No matching rule for ${requestUrl.pathname} with method ${method}`)
        return;
    }

    if (matchedRule.roles.includes('*')) {
        // allow all roles
        console.log(`✅ Access granted to ${requestUrl.pathname} with method ${method}`)
        return;
    }

    // check if user has any of the required roles
    const authHandler = useAuthHandler()
    const user = await authHandler.validateAuthToken(event);
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'User is not authenticated',
        })
    }

    if (!user || !matchedRule.roles.some(role => user.role === role)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
            message: `User does not have permission to access ${requestUrl.pathname}`,
        })
    }

    // allow access
    console.log(`✅ User ${user.username} with role ${user.role} accessed ${requestUrl.pathname} with method ${method}`)
    return
})
