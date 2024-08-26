<script setup lang="ts">
const { loadCartFromLocalStorage } = useCart()

if (import.meta.client) {
  loadCartFromLocalStorage()
}

useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} | ATAL Pizza` : 'ATAL Pizza '
  },
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    {
      name: 'description',
      content:
        'Satisfy your pizza cravings with a click! Get piping-hot, mouthwatering pizza delivered straight to your door with ATAL Pizza.',
    },
    {
      name: 'keywords',
      content:
        'Pizza Delivery, Pizza Perfection, Hot and Fresh Pizza, Nuxt 3, Web Development',
    },
    { name: 'author', content: 'Aleksandar Atanasovski' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://atal-pizza.atalek.com' },
    {
      property: 'og:title',
      content: 'ATAL Pizza - Your Pizza Oasis',
    },
    {
      property: 'og:description',
      content:
        'Fuel your pizza dreams with ATAL Pizza! Order delicious, customizable pizzas for effortless delivery or pickup.',
    },
    {
      property: 'og:image',
      content: 'https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900',
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    { property: 'twitter:url', content: 'https://atal-pizza.atalek.com' },
    {
      property: 'twitter:title',
      content: 'ATAL Pizza: Your Pizza Dreams, Delivered ',
    },
    {
      property: 'twitter:description',
      content:
        'Craving pizza? ATAL Pizza is here to make your dreams a reality! Order now and get ready for a slice of heaven.',
    },
    {
      property: 'twitter:image',
      content: 'https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900',
    },
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import '~/assets/styles/index.css';
</style>
