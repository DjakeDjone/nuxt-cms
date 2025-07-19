import { defineNuxtModule, addComponent, createResolver, addServerHandler } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // From the runtime directory
    addComponent({
      name: 'EditableContent', // name of the component to be used in vue templates
      filePath: resolver.resolve('runtime/components/editable/Content.vue')
    })

    addServerHandler({
      route: '/api/editable/content/:id',
      handler: resolver.resolve('./runtime/server/api/editable/content/[id].get')
    })
  }
})
