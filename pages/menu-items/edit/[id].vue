<script setup lang="ts">
import type { CategoryOrOptional, MenuItemType } from '~/types'

definePageMeta({
  middleware: 'unauthenticated',
})

const route = useRoute()
const itemId = route.params.id
const isAdmin = await useIsAdmin()

const { data: menuItem, pending } = await useFetch<MenuItemType>(
  `/api/menu-items/${itemId}`,
)
const { data: categories } = useFetch<CategoryOrOptional>('/api/categories')

const isLoading = ref(false)

const itemInfo = reactive<MenuItemType>({
  _id: menuItem!.value!._id || undefined,
  name: menuItem!.value!.name || '',
  description: menuItem!.value!.description || '',
  basePrice: menuItem!.value!.basePrice || 0,
  image: menuItem!.value!.image || '',
  sizes: menuItem?.value?.sizes || [],
  category: menuItem!.value?.category || '',
  extraIngredients: menuItem?.value?.extraIngredients || [],
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

async function handleDeleteMenuItem(menuItemId: string) {
  try {
    const res = await $fetch(`/api/menu-items/${menuItemId}`, {
      method: 'DELETE',
    })
    if (res) {
      navigateTo('/menu-items')
    }
  } catch (error) {
    console.error(error)
  }
}

watchEffect(async () => {
  if (!isAdmin) {
    await navigateTo('/')
  }
})
</script>

<template>
  <section class="mt-8 max-w-2xl mx-auto">
    <Title>{{ 'Menu Items | Edit' }}</Title>

    <UserTabs :isAdmin="isAdmin" />

    <Loader v-if="isLoading || pending" />

    <div class="max-w-xl mx-auto mt-8">
      <NuxtLink to="/menu-items" class="button"
        >Show all menu items
        <Icon class="h-6 w-6" name="material-symbols:arrow-circle-left-outline"
      /></NuxtLink>
    </div>

    <MenuItemForm
      :itemInfo="itemInfo"
      :categories="categories"
      :onSubmit="handleEditMenuItem" />

    <div class="ml-auto md:max-w-[392px] md:mr-12">
      <DeleteButton
        label="Delete"
        :_id="itemInfo._id"
        :onDelete="() => handleDeleteMenuItem(itemInfo._id)" />
    </div>
  </section>
</template>
