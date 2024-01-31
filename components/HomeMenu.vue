<script lang="ts" setup>
import type { MenuItemType } from '~/types'

const { data: menuItems } = await useFetch<MenuItemType[]>('/api/menu-items')

const bestSellers = ref<MenuItemType[]>(menuItems?.value?.slice(0, 3) || [])
</script>

<template>
  <section>
    <div class="absolute left-0 right-0 w-full justify-start">
      <div class="absolute left-0 -top-[70px] text-left -z-10">
        <img
          src="~/assets/images/sallad1.webp"
          alt="salad"
          class="w-[109px] h-[189px]" />
      </div>
      <div class="absolute -top-[100px] right-0 -z-10">
        <img
          src="~/assets/images/sallad2.webp"
          class="w-[109px] h-[189px]"
          alt="salad" />
      </div>
    </div>
    <section class="text-center my-16">
      <SectionHeaders subHeader="check out" mainHeader="Our Best Sellers" />
    </section>
    <div class="grid sm:grid-cols-3 gap-4" v-if="bestSellers.length > 0">
      <MenuItem
        v-for="menuItem in bestSellers"
        :key="menuItem?._id?.toString()"
        :menuItem="menuItem" />
    </div>
  </section>
</template>

<style scoped></style>
