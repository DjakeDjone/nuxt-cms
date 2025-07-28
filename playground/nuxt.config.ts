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
      routeRules: [
        {
          // allow everything that's not /api
          roles: ['*'],
          url: new RegExp('^/(?!api).*'),
        },
        {
          // allow all get requests
          roles: ['*'],
          url: new RegExp('^/api/editable/.*'),
          method: 'GET',
        },
        {
          // editable route ('/api/editable/*')
          roles: ['admin'],
          url: new RegExp('^/api/editable/.*'),
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
