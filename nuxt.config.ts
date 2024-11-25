export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@formkit/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    mongodbName: process.env.MONGODB_NAME,
  },
  compatibilityDate: '2024-04-03',
})
