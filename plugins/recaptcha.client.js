import { VueRecaptcha } from 'vue-recaptcha';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.component('VueRecaptcha', VueRecaptcha);
  nuxtApp.vueApp.provide('recaptchaSiteKey', config.public.recaptchaSiteKey);
});
