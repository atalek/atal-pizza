// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  nitro: {
    compressPublicAssets: true,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
    families: { Roboto: [400, 700] },
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

  routeRules: {
    '/profile': { ssr: false },
    '/cart': { ssr: false },
    '/menu-items/**': { ssr: false },
    '/orders/**': { ssr: false },
    '/categories': { ssr: false },
    '/users': { ssr: false },
  },
})
