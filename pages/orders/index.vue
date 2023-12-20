<script lang="ts" setup>
const { data: isAdmin } = await useIsAdmin()
const { data: orders, pending } = await useFetch('/api/orders')
</script>

<template>
  <section class="mt-8 max-w-xl mx-auto">
    <UserTabs v-if="isAdmin" />
    {{ isAdmin }}
    Orders
    {{ orders }}
  </section>
</template>
