<script lang="ts" setup>
const { data, status, signOut } = useAuth()
const userData = ref(data?.value?.user)
const { totalItems } = useCart()

const userName = ref(userData?.value?.name || userData?.value?.email)

if (userName?.value?.includes(' ')) {
  userName.value = userName?.value?.split(' ')[0]
}
</script>

<template>
  <header class="flex items-center justify-between">
    <nav class="flex gap-6 text-slate-600 font-semibold items-center">
      <NuxtLink class="text-primary font-semibold text-2xl" href="/">
        YEP PIZZA</NuxtLink
      >
      <NuxtLink href="/">Home</NuxtLink>
      <NuxtLink href="/menu">Menu</NuxtLink>
      <NuxtLink href="/#about">About</NuxtLink>
      <NuxtLink href="/#contact">Contact</NuxtLink>
    </nav>

    <nav class="flex items-center gap-4 text-slate-600">
      <div v-if="status === 'unauthenticated'">
        <NuxtLink href="/login" class="px-8 py-2 font-semibold">Login</NuxtLink>
        <NuxtLink
          href="/register"
          class="bg-primary rounded-full text-white px-8 py-2"
          >Register</NuxtLink
        >
      </div>
      <div v-if="status === 'authenticated'">
        <NuxtLink
          href="/profile"
          class="px-4 py-2 font-semibold whitespace-nowrap hover:bg-slate-200"
          >Hello, {{ userName }}</NuxtLink
        >

        <NuxtLink to="/cart" class="relative px-2 py-2 mr-2 hover:bg-slate-200">
          <span
            v-if="totalItems > 0"
            class="absolute -top-1 -right-0 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3"
            >{{ totalItems }}
          </span>
          <Icon name="fa6-solid:cart-shopping" class="h-6 w-6" />
        </NuxtLink>
        <NuxtLink
          @click="signOut"
          class="bg-primary rounded-full text-white px-8 py-2 font-semibold cursor-pointer"
        >
          Logout
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
