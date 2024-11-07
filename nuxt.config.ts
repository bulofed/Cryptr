// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    'nuxt-lodash',
    '@formkit/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-mongoose'
  ]
})