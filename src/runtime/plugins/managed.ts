// ~/plugins/my-directives.ts
import { defineNuxtPlugin } from '#imports'
import { $fetch } from 'ofetch'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('managed', {
    // SSR: must be synchronous; avoid async fetch to prevent type errors and hydration issues
    getSSRProps(binding) {
      return {
        'data-managed-ssr': '1',
        'data-managed-id': String(binding.value ?? ''),
      } as any
    },

    // Client: do not clobber SSR HTML; update once data arrives
    mounted(el, binding) {
      if (import.meta.server) return

      const fetchAndRender = async (id: string) => {
        if (!id) return
        try {
          const data: any = await $fetch(`/api/editable/content/${id}`)
          const next = data?.content || ''
          if (el.innerHTML !== next) {
            el.innerHTML = next
          }
        }
        catch (e) {
          console.error('Error fetching content:', e)
          if (!el.innerHTML) {
            el.innerHTML = 'Error loading content.'
          }
        }
      }

      // Initial fetch; keeps SSR content until new data is ready
      const initialId = String(binding.value ?? el.getAttribute('data-managed-id') ?? '')
      fetchAndRender(initialId)
    },

    // Refetch when the directive value changes
    updated(el, binding) {
      if (import.meta.server) return
      if (binding.value !== binding.oldValue) {
        const id = String(binding.value ?? el.getAttribute('data-managed-id') ?? '')
        if (!id) return
        $fetch(`/api/editable/content/${id}`)
          .then((data: any) => {
            const next = data?.content || ''
            if (el.innerHTML !== next) el.innerHTML = next
          })
          .catch((e: any) => {
            console.error('Error fetching content:', e)
          })
      }
    },
  })
})
