import { defineNuxtModule, createResolver, addServerHandler, addImportsDir, addComponentsDir, installModule } from '@nuxt/kit'
import type { BaseAuthUser } from './runtime/server/model/auth'
import type { UrlRule } from './types'

// Define the module options interface
export interface ModuleOptions {
  storageKey?: string
  auth: {
    initUsers: BaseAuthUser[]
    routeRules: UrlRule[]
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'editable-content',
    configKey: 'editableContent',
  },
  defaults: {
    storageKey: 'editable-content',
    auth: {
      initUsers: [],
      routeRules: [
        {
          // allow everything that's not /api
          roles: ['*'],
          url: '^/(?!api).*',
        },
        {
          // editable route ('/api/editable/*')
          roles: ['admin'],
          url: '^/api/editable/.*',
          method: 'POST',
        },
      ],
    },
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    // Add runtime config for the storage key
    nuxt.options.runtimeConfig.editableContent = {
      storageKey: options.storageKey ?? '',
      auth: {
        initUsers: options.auth?.initUsers || [],
        routeRules: options.auth?.routeRules || [],
      },
    }

    await installModule('nuxt-tiptap-editor', {
    })

    await installModule('@nuxt/icon')

    addImportsDir(resolver.resolve('runtime/assets'))

    addComponentsDir({
      path: resolver.resolve('runtime/components'),
    })

    addServerHandler({
      route: '/api/editable/content/:id',
      handler: resolver.resolve('./runtime/server/api/editable/content/[id].get'),
    })

    addServerHandler({
      route: '/api/editable/content/:id',
      method: 'post',
      handler: resolver.resolve('./runtime/server/api/editable/content/[id].post'),
    })

    addServerHandler({
      route: '/api/auth/login',
      method: 'post',
      handler: resolver.resolve('./runtime/server/api/auth/login.post'),
    })

    addServerHandler({
      route: '/api/auth/users',
      method: 'get',
      handler: resolver.resolve('./runtime/server/api/auth/users.get'),
    })

    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware/auth'),
    })

    addImportsDir(resolver.resolve('runtime/server/util'))
    addImportsDir(resolver.resolve('runtime/shared'))
    addImportsDir(resolver.resolve('runtime/composables'))
  },
})
