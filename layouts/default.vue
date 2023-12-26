<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <main class="max-w-4xl p-4 mx-auto">
    <div>
      <Header />

      <slot />
      <footer class="border-t p-8 text-center text-slate-600 mt-16">
        &copy; {{ currentYear }} All rights reserved
      </footer>
      <div
        class="fixed bg-gradient-to-tr from-white to-emerald-50 z-[-1] inset-0 opacity-50"
      />
    </div>
  </main>
</template>

<style scoped></style>
