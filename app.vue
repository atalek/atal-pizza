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
</style>
