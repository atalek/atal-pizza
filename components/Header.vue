<script lang="ts" setup></script>

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
    <nav class="flex items-center gap-4 text-slate-600">
      <NuxtLink href="/login" class="px-8 py-2 font-semibold">Login</NuxtLink>
      <NuxtLink
        href="/register"
        class="bg-primary rounded-full text-white px-8 py-2"
        >Register</NuxtLink
      >
    </nav>
  </header>
</template>

<style scoped></style>
