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
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'ATAL Pizza the best place for pizza',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
    'nuxt-mongoose',
    'nuxt-vercel-analytics',
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

  routeRules: {
    '/profile': { ssr: false },
    '/cart': { ssr: false },
    '/menu-items/**': { ssr: false },
    '/orders/**': { ssr: false },
    '/categories': { ssr: false },
    '/users': { ssr: false },
  },
})
