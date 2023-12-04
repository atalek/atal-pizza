<script lang="ts" setup>
const { data: isAdmin, pending } = await useIsAdmin()
</script>

<template>
  <section class="mt-8 max-w-lg mx-auto">
    <UserTabs v-if="isAdmin" />
    {{ isAdmin }}
    Users
  </section>
</template>
