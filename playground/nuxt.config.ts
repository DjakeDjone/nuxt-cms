export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxtjs/tailwindcss',
  ],
  editableContent: {
    storageKey: ''
  },
  devtools: { enabled: true },
})