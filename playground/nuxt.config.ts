import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    // plugins: [tailwindcss()],
  },
  
  editableContent: {
    storageKey: 'data',
    styled: true,
    suiProse: true,
    auth: {
      routeRules: [
        // {
        // allow everything that's not /api
        // roles: ['*'],
        // url: /^\/(?!api).*/,
        // },
        {
          // allow all get requests
          roles: ['*'],
          url: /^\/api\/editable\/.*/,
          method: 'GET',
        },
        {
          // editable route ('/api/editable/*')
          roles: ['admin'],
          url: /^\/api\/editable\/.*/,
          method: 'POST',
        },
      ],
      initUsers: [
        {
          id: '1',
          username: 'admin',
          pwd: 'admin123',
          role: 'admin',
          tokens: [],
        },
      ],
    },
  },
})
