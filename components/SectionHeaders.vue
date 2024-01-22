<script lang="ts" setup>
defineProps({
  subHeader: { type: String, required: false },
  mainHeader: { type: String, required: false },
})
</script>

<template>
  <h2 class="uppercase text-slate-600 font-semibold leading-4">
    {{ subHeader }}
  </h2>

  <h3 class="text-primary font-extrabold text-4xl italic">
    {{ mainHeader }}
  </h3>
</template>
