<script setup lang="ts">
import { CategoryOrOptional, MenuItem } from 'types'

const route = useRoute()
const itemId = route.params.id
const { data: isAdmin } = await useIsAdmin()
const { data: menuItem, pending } = await useFetch<MenuItem>(
  `/api/menu-items/${itemId}`
)
const { data: categories } = useFetch<CategoryOrOptional[]>('/api/categories')

const isLoading = ref(false)

const itemInfo = reactive({
  name: menuItem!.value!.name || '',
  description: menuItem!.value!.description || '',
  basePrice: menuItem!.value!.basePrice || 0,
  image: menuItem!.value!.image || '',
  sizes: menuItem!.value?.sizes || '',
  category: menuItem!.value?.category || '',
  extraIngredientPrices: menuItem!.value?.extraIngredientPrices || [],
})

async function handleEditMenuItem() {
  isLoading.value = true
  try {
    const res = await $fetch(`/api/menu-items/${itemId}`, {
      method: 'PUT',
      body: itemInfo,
    })
    if (res) {
      navigateTo('/menu-items')
    }
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="mt-8 max-w-2xl mx-auto">
    <UserTabs v-if="isAdmin" />
    <Loader v-if="isLoading || pending" />

    <div class="max-w-md mx-auto mt-8">
      <NuxtLink to="/menu-items" class="button"
        >Show all menu items
        <Icon class="h-6 w-6" name="material-symbols:arrow-circle-left-outline"
      /></NuxtLink>
    </div>

    <MenuItemForm
      :itemInfo="itemInfo"
      :categories="categories"
      :onSubmit="handleEditMenuItem"
    />
  </section>
</template>

<style scoped></style>
