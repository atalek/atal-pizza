<script setup lang="ts">
import { toast } from 'vue3-toastify'

const { data: isAdmin } = await useIsAdmin()
const isLoading = ref(false)

const itemInfo = reactive({
  name: '',
  description: '',
  basePrice: 0,
  image: '',
})

async function handleCreateMenuItem() {
  isLoading.value = true
  try {
    const res = await $fetch('/api/menu-items', {
      method: 'POST',
      body: itemInfo,
    })

    if (res) {
      navigateTo('/menu-items')
    }
  } catch (err: any) {
    toast.error(err.data.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="mt-8 max-w-2xl mx-auto">
    <UserTabs v-if="isAdmin" />
    <Loader v-if="isLoading" />

    <div class="max-w-md mx-auto mt-8">
      <NuxtLink to="/menu-items" class="button"
        >Show all menu items
        <Icon class="h-6 w-6" name="material-symbols:arrow-circle-left-outline"
      /></NuxtLink>
    </div>
    <MenuItemForm :itemInfo="itemInfo" :onSubmit="handleCreateMenuItem" />
  </section>
</template>
