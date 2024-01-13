<script setup lang="ts">
const { status } = useAuth()
const { loadCartFromLocalStorage } = useCart()

if (process.client) {
  loadCartFromLocalStorage()
}

useSeoMeta({
  ogTitle: 'ATAL Pizza',
  ogDescription: 'Pizza ordering website example',
  ogImage: 'https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900',
  ogUrl: 'https://atal-pizza.vercel.app',
  twitterTitle: 'ATAL Pizza',
  twitterDescription: 'Pizza ordering website example built with Nuxt3',
  twitterImage:
    'https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900',
  twitterCard: 'summary',
})

useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} | ATAL Pizza` : 'ATAL Pizza'
  },
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <Loader v-if="status === 'loading'" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.Toastify__toast-body {
  white-space: nowrap;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
