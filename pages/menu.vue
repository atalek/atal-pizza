<script lang="ts" setup>
import type { CategoryType, MenuItemType } from '~/types'

const { data: categories } = await useFetch<CategoryType[]>('/api/categories')
const { data: menuItems } = await useFetch<MenuItemType[]>('/api/menu-items')

const filteredCategories = computed(() => {
  return (
    categories.value?.map(category => {
      const filteredItems = menuItems.value?.filter(
        menuItem => menuItem.category === category._id
      )
      return {
        ...category,
        items: filteredItems,
      }
    }) || []
  )
})
</script>

<template>
  <section class="mt-8">
    <div v-for="category in filteredCategories" :key="category._id.toString()">
      <div class="text-center">
        <SectionHeaders :mainHeader="category.name" />
      </div>
      <div
        v-if="category.items && category?.items.length > 0"
        class="grid sm:grid-cols-3 gap-4 mt-6 mb-12"
      >
        <MenuItem
          v-for="item in category.items"
          :key="item._id.toString()"
          :menuItem="item"
        />
      </div>
    </div>
  </section>
</template>
