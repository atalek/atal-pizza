<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <main class="max-w-4xl p-4 mx-auto">
    <div>
      <Header />

      <div class="flex flex-col min-h-screen">
        <slot />
        <div
          class="fixed bg-gradient-to-tr from-white to-emerald-50 z-[-1] inset-0 opacity-50" />
      </div>
      <footer class="border-t p-4 text-center text-slate-600 mt-16">
        <NuxtLink to="https://github.com/atalek/atal-pizza" target="_blank"
          >&copy; Atal Pizza - {{ currentYear }} made by atalek
          <Icon name="fa6-brands:github" class="w-6 h-6"
        /></NuxtLink>
      </footer>
    </div>
  </main>
</template>

<style scoped></style>
