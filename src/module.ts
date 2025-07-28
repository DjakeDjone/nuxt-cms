import { defineNuxtModule, createResolver, addServerHandler, addImportsDir, addComponentsDir, installModule, addPlugin } from '@nuxt/kit'
import type { BaseAuthUser } from './runtime/server/model/auth'
import { useAuthHandler } from './runtime/server/util/authHandler'

// Define the module options interface
export interface ModuleOptions {
  storageKey?: string
  auth: {
    protectedRoutes: string[]
    initUsers: BaseAuthUser[]
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'editable-content',
    configKey: 'editableContent',
  },
  defaults: {
    storageKey: 'editable-content',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    // Add runtime config for the storage key
    nuxt.options.runtimeConfig.editableContent = {
      storageKey: options.storageKey ?? '',
      auth: {
        protectedRoutes: options.auth?.protectedRoutes || [],
        initUsers: options.auth?.initUsers || [],
      },
    } as ModuleOptions

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
