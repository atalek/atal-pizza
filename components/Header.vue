<script lang="ts" setup>
const { data, status, signOut } = useAuth()
console.log(status.value)

async function handleSignOut() {
  await signOut({ redirect: false })
  navigateTo('/')
}
</script>

<template>
  <header class="flex items-center justify-between">
    <nav class="flex gap-6 text-slate-600 font-semibold items-center">
      <NuxtLink class="text-primary font-semibold text-2xl" href="/">
        YEP PIZZA</NuxtLink
      >
      <NuxtLink href="/">Home</NuxtLink>
      <NuxtLink href="/">Menu</NuxtLink>
      <NuxtLink href="/">About</NuxtLink>
      <NuxtLink href="/">Contact</NuxtLink>
    </nav>
    {{ data }}
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
          @click.prevent="signOut"
          class="bg-primary rounded-full text-white px-8 py-2 font-semibold cursor-pointer"
        >
          Logout
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
