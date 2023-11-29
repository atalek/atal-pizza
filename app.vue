<script setup lang="ts">
const { status } = useAuth()
</script>

<template>
  <NuxtLayout>
    <Loader v-if="status === 'loading'" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style></style>
