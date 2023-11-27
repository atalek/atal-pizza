// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
    'nuxt-mongoose',
  ],

  mongoose: {
    uri: process.env.MONGODB_URI,
  },

  css: ['~/assets/styles/index.css'],

  googleFonts: {
    families: { Roboto: true },
  },
  auth: { baseURL: process.env.AUTH_ORIGIN, provider: { type: 'authjs' } },
})
