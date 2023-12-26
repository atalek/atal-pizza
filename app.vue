<script setup lang="ts">
const { status } = useAuth()
const { loadCartFromLocalStorage } = useCart()

if (process.client) {
  loadCartFromLocalStorage()
}
</script>

<template>
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
