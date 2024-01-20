export default defineAppConfig({
  vercelAnalytics: {
    mode: 'auto',
    debug: true,
    beforeSend: event => {
      if (event.url.includes('/admin')) return null

      return event
    },
  },
})
