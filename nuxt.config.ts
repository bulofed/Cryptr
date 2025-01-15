export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@formkit/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/image'
  ],
  devtools: { enabled: false },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    mongodbName: process.env.MONGODB_NAME,
    recaptchaSecret: process.env.RECAPTCHA_SECRET,
    public: {
      recaptchaSiteKey: process.env.RECAPTCHA_PUBLIC,
    },
  },
  plugins: [
    '~/plugins/recaptcha.client.js',
  ],
  compatibilityDate: '2024-04-03',
})
