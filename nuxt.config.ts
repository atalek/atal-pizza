// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
  ],

  css: ['~/assets/styles/index.css'],

  googleFonts: {
    families: { Roboto: true },
  },
  auth: { provider: { type: 'authjs' } },
})
