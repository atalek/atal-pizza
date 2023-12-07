<script lang="ts" setup>
const { data: isAdmin, pending } = await useIsAdmin()
</script>

<template>
  <section class="mt-8 max-w-xl mx-auto">
    <UserTabs v-if="isAdmin" />
    {{ isAdmin }}
    Orders
  </section>
</template>
