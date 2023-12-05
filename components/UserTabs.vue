<script lang="ts" setup>
const route = useRoute()

function isLinkActive(to: string) {
  return computed(() => route.path === to).value
}
</script>

<template>
  <div class="flex justify-center gap-2 tabs mb-6">
    <NuxtLink :class="{ active: isLinkActive('/profile') }" to="/profile"
      >Profile</NuxtLink
    >
    <NuxtLink :class="{ active: isLinkActive('/categories') }" to="/categories"
      >Categories</NuxtLink
    >
    <NuxtLink
      :class="{
        active: isLinkActive('/menu-items') || isLinkActive('/menu-items/new'),
      }"
      to="/menu-items"
      >MenuItems</NuxtLink
    >
    <NuxtLink :class="{ active: isLinkActive('/users') }" to="/users"
      >Users</NuxtLink
    >
  </div>
</template>

<style scoped></style>
