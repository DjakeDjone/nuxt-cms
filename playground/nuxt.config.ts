import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '../src/module',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  editableContent: {
    storageKey: 'data',
    auth: {
      protectedRoutes: ['/admin', '/dashboard'],
      initUsers: [
        {
          id: '1',
          username: 'admin',
          pwd: 'admin123',
          role: 'admin',
          tokens: [],
        },
      ]
    }
  },
})
