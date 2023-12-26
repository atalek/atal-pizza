<script lang="ts" setup>
defineProps({
  subHeader: { type: String, required: false },
  mainHeader: { type: String, required: false },
})
</script>

<template>
  <h3 class="uppercase text-slate-600 font-semibold leading-4">
    {{ subHeader }}
  </h3>

  <h2 class="text-primary font-extrabold text-4xl italic">
    {{ mainHeader }}
  </h2>
</template>

<style scoped></style>
