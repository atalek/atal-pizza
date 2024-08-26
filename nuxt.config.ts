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
    'nuxt-mongoose',
    '@sidebase/nuxt-auth',
  ],

  hooks: {
    'build:manifest': manifest => {
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css
      if (css) {
        for (let i = css.length - 1; i >= 0; i--) {
          if (css[i].startsWith('entry')) css.splice(i, 1)
        }
      }

      for (let key in manifest) {
        const cssFiles = manifest[key]?.css
        if (cssFiles) {
          for (let i = cssFiles.length - 1; i >= 0; i--) {
            if (/default\..*\.css/.test(cssFiles[i])) {
              cssFiles.splice(i, 1)
            }
          }
        }
      }
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.AWS_URL,
    },
  },

  mongoose: {
    uri: process.env.MONGODB_URI,
  },

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
    '/': { isr: 3600 * 24 },
    '/menu': { isr: 3600 * 24 },
    '/login': { isr: 3600 * 24 },
    '/register': { isr: 3600 * 24 },
    '/profile': { ssr: false },
    '/cart': { ssr: false },
    '/menu-items/**': { ssr: false },
    '/orders/**': { ssr: false },
    '/categories': { ssr: false },
    '/users': { ssr: false },
  },

  compatibilityDate: '2024-07-23',
})
