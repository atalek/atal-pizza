<script lang="ts" setup>
const { data: isAdmin, pending } = await useIsAdmin()

const { data: categories, refresh } = await useFetch('/api/categories', {
  method: 'GET',
})
</script>

<template>
  <section class="mt-8 max-w-lg mx-auto">
    <UserTabs v-if="isAdmin" />
    {{ isAdmin }}
    Users
    {{ categories }}
  </section>
</template>
