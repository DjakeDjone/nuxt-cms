import { defineNuxtModule, createResolver, addServerHandler, addImportsDir, addComponentsDir, installModule } from '@nuxt/kit'

// Define the module options interface
export interface ModuleOptions {
  storageKey?: string
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
    }

    await installModule('nuxt-tiptap-editor', {
    })

    addImportsDir(resolver.resolve('runtime/assets'))

    addComponentsDir({
      path: resolver.resolve('runtime/components'),
    })

    addServerHandler({
      route: '/api/editable/content/:id',
      handler: resolver.resolve('./runtime/server/api/editable/content/[id].get'),
    })

    addImportsDir(resolver.resolve('runtime/server/util'))
    addImportsDir(resolver.resolve('runtime/composables'))

    addServerHandler({
      route: '/api/editable/content/:id',
      method: 'post',
      handler: resolver.resolve('./runtime/server/api/editable/content/[id].post'),
    })
  },
})
