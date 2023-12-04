<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { Types } from 'mongoose'

type Category = {
  _id: Types.ObjectId
  name: string
}

const { data: isAdmin } = await useIsAdmin()
const isLoading = ref(false)
const error = ref('')
const itemName = ref('')
const description = ref('')
const price = ref('')
const basePrice = ref('')
// const { data: categories, refresh } = await useFetch<Category[]>(
//   '/api/categories'
// )

// async function handleNewCategorySubmit() {
//   isLoading.value = true
//   try {
//     if (menuItem.value.trim()) {
//       const res = await $fetch('/api/categories', {
//         method: 'POST',
//         body: { name: menuItem.value },
//       })

//       if (res) {
//         menuItem.value = ''
//         refresh()
//         toast.success('Category added')
//       }
//     }
//   } catch (err: any) {
//     error.value = err.data.message
//   } finally {
//     isLoading.value = false
//   }
// }

// function handleEditCategory(category: Category) {
//   editingCategory.value = category._id
//   menuItem.value = category.name
// }
</script>

<template>
  <section class="mt-8 max-w-2xl mx-auto">
    <UserTabs v-if="isAdmin" />
    <Loader v-if="isLoading" />

    <form class="mt-8 max-w-md mx-auto" @submit.prevent="">
      <div class="flex gap-2 items-start">
        <NuxtImg
          provider="s3Provider"
          src="a581ee62-d415-4916-89e8-e2b247d9cb0b.webp"
          alt="menu item image"
        />

        <div class="grow">
          <label for="name">Item Name</label>
          <input type="text" id="name" v-model="itemName" />

          <label for="description"> Description</label>
          <input type="text" id="description" v-model="description" />

          <label for="price"> Price</label>
          <input type="text" id="price" v-model="price" />

          <label for="base-price"> Base Price</label>
          <input type="text" id="base-price" v-model="basePrice" />
        </div>
      </div>
      <div class="pb-2">
        <button class="border border-primary" type="submit">Save</button>
      </div>
    </form>
  </section>
</template>
