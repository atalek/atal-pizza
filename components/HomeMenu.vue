<script lang="ts" setup></script>

<template>
  <section>
    <div class="absolute left-0 right-0 w-full justify-start">
      <div class="absolute left-0 -top-[70px] text-left -z-10">
        <img src="/sallad1.png" alt="salad" class="h-46" />
      </div>
      <div class="absolute -top-[100px] right-0 -z-10">
        <img src="/sallad2.png" alt="salad" class="h-48" />
      </div>
    </div>
    <section class="text-center my-16">
      <SectionHeaders subHeader="check out" mainHeader="MENU" />
    </section>
    <div class="grid sm:grid-cols-3 gap-4">
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </div>
  </section>
</template>

<style scoped></style>
