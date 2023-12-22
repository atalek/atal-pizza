<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
defineProps({
  isAdmin: {
    type: Boolean as PropType<boolean | null>,
    required: true,
  },
})

function isLinkActive(to: string) {
  if (to === '/menu-items' || to === '/users' || to === '/orders') {
    return computed(() => route.path.startsWith(to)).value
  }

  return computed(() => route.path === to).value
}
</script>

<template>
  <div class="flex justify-center gap-2 tabs mb-6" v-if="isAdmin">
    <NuxtLink :class="{ active: isLinkActive('/profile') }" to="/profile"
      >Profile</NuxtLink
    >
    <NuxtLink :class="{ active: isLinkActive('/categories') }" to="/categories"
      >Categories</NuxtLink
    >
    <NuxtLink :class="{ active: isLinkActive('/menu-items') }" to="/menu-items"
      >MenuItems</NuxtLink
    >
    <NuxtLink :class="{ active: isLinkActive('/users') }" to="/users"
      >Users</NuxtLink
    >
    <NuxtLink :class="{ active: isLinkActive('/orders') }" to="/orders"
      >Orders</NuxtLink
    >
  </div>
  <div v-else class="flex justify-center gap-2 tabs mb-6">
    <NuxtLink :class="{ active: isLinkActive('/profile') }" to="/profile"
      >Profile</NuxtLink
    >
    <NuxtLink :class="{ active: isLinkActive('/orders') }" to="/orders"
      >Orders</NuxtLink
    >
  </div>
</template>
