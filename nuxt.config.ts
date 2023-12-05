// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
    'nuxt-mongoose',
  ],

  runtimeConfig: {
    public: {
      siteUrl: process.env.AWS_URL,
    },
  },

  mongoose: {
    uri: process.env.MONGODB_URI,
  },

  css: ['~/assets/styles/index.css'],

  googleFonts: {
    families: { Roboto: [400, 600, 700, 800] },
  },

  image: {
    providers: {
      s3Provider: {
        name: 's3Provider',
        provider: '~/providers/s3.ts',
        options: {
          baseURL: process.env.AWS_URL,
        },
      },
    },
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: { type: 'authjs' },
  },
})
