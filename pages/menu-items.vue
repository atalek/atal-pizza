<script lang="ts" setup>
const isAdmin = await useIsAdmin()
</script>

<template>
  <section class="mt-8 max-w-lg mx-auto">
    <UserTabs v-if="isAdmin" />

    Menu Items
  </section>
</template>
