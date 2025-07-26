import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    '../src/module',
  ],
  devtools: { enabled: true },
  editableContent: {
    storageKey: 'data',
  },
    css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  }
})
