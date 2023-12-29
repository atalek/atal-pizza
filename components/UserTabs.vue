<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
defineProps({
  isAdmin: {
    type: Boolean as PropType<boolean | null>,
    required: true,
    default: false,
  },
})

const isLinkActive = (to: string) =>
  computed(() =>
    to === '/menu-items' || to === '/users' || to === '/orders'
      ? route.path.startsWith(to)
      : route.path === to
  ).value
</script>

<template>
  <div class="flex justify-center gap-2 tabs mb-6 flex-wrap" v-if="isAdmin">
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
  <div v-if="!isAdmin" class="flex justify-center gap-2 tabs mb-6">
    <NuxtLink :class="{ active: isLinkActive('/profile') }" to="/profile"
      >Profile</NuxtLink
    >
    <NuxtLink :class="{ active: isLinkActive('/orders') }" to="/orders"
      >Orders</NuxtLink
    >
  </div>
</template>
