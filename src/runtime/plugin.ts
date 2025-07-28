import { defineNuxtPlugin } from '#app'
import { useAuthHandler } from '#imports';

export default defineNuxtPlugin((_nuxtApp) => {
  console.log('Plugin injected by my-module!')
})
