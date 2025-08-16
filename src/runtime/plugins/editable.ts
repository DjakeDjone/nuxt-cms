import { defineNuxtPlugin, useFetch, useSaveHandler, watchEffect } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('editable', {
    mounted(el, binding) {
      const saveHandler = useSaveHandler()

      el.innerHTML = 'Loading...'
      el.setAttribute('contenteditable', 'true')

      const {
        data: content,
        error,
      } = useFetch(`/api/editable/content/${binding.value}`, {
        watch: [() => binding.value],
      })

      watchEffect(() => {
        if (error.value) {
          console.error('Error fetching content:', error.value)
          el.innerHTML = 'Error loading content.'
          return
        }
        if (content.value !== null) {
          el.innerHTML = content.value?.content || ''
        }
      })
      const onSave = async () => {
        await $fetch(`/api/editable/content/${binding.value}`, {
          method: 'POST',
          body: { content: content.value!.content },
        })
      }
      el.addEventListener('input', () => {
        // const newContent = el.innerHTML;
        content.value!.content = el.innerText
        saveHandler.addSaveEventWrapper(binding.value, () => onSave())
      })
    },
    getSSRProps() {
      // Return props that should be rendered on the server.
      // We can return a placeholder or nothing.
      return {}
    },
  })

  // Register more directives as needed
})
