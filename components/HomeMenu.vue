<script lang="ts" setup>
import { MenuItem as MenuItemType } from '~/types'

const { data: menuItems } = await useFetch<MenuItemType[]>('/api/menu-items')

const bestSellers = ref<MenuItemType[]>(menuItems?.value?.slice(0, 3) || [])
</script>

<template>
  <section>
    <div class="absolute left-0 right-0 w-full justify-start">
      <div class="absolute left-0 -top-[70px] text-left -z-10">
        <img src="~/assets/images/sallad1.png" alt="salad" class="h-46" />
      </div>
      <div class="absolute -top-[100px] right-0 -z-10">
        <img src="~/assets/images/sallad2.png" alt="salad" class="h-48" />
      </div>
    </div>
    <section class="text-center my-16">
      <SectionHeaders subHeader="check out" mainHeader="Our Best Sellers" />
    </section>
    <div class="grid sm:grid-cols-3 gap-4" v-if="bestSellers.length > 0">
      <MenuItem
        v-for="menuItem in bestSellers"
        :key="menuItem._id"
        :menuItem="menuItem"
      />
    </div>
  </section>
</template>

<style scoped></style>
