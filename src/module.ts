import { defineNuxtModule, addComponent, createResolver, addServerHandler, addImportsDir, addComponentsDir } from '@nuxt/kit'

// Define the module options interface
export interface ModuleOptions {
  storageKey?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'editable-content',
    configKey: 'editableContent'
  },
  defaults: {
    storageKey: 'editable-content'
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add runtime config for the storage key
    nuxt.options.runtimeConfig.editableContent = {
      storageKey: options.storageKey ?? ""
    }

    // From the runtime directory
    // addComponent({
    //   name: 'EditableContent', // name of the component to be used in vue templates
    //   filePath: resolver.resolve('runtime/components/editable/Content.vue')
    // })
    addComponentsDir({
      path: resolver.resolve('runtime/components'),
    })


    addServerHandler({
      route: '/api/editable/content/:id',
      handler: resolver.resolve('./runtime/server/api/editable/content/[id].get')
    })

    addImportsDir(resolver.resolve('runtime/server/util'))
    addImportsDir(resolver.resolve('runtime/composables'))


    addServerHandler({
      route: '/api/editable/content/:id',
      method: 'post',
      handler: resolver.resolve('./runtime/server/api/editable/content/[id].post')
    })
  }
})
