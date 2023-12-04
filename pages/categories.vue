<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { Types } from 'mongoose'

type Category = {
  _id?: Types.ObjectId
  name: string
}

const { data: isAdmin } = await useIsAdmin()
const categoryName = ref('')
const isLoading = ref(false)
const error = ref('')
const editingCategory = ref('')
const { data: categories, refresh } = await useFetch<Category[]>(
  '/api/categories'
)

async function handleCategorySubmit() {
  isLoading.value = true
  try {
    const data: Category = { name: categoryName.value }

    if (editingCategory.value) {
      data._id = editingCategory.value
      console.log(data)
      const res = await $fetch('/api/categories', {
        method: editingCategory.value ? 'PUT' : 'POST',
        body: data,
      })

      if (res) {
        categoryName.value = ''
        refresh()
        toast.success(
          editingCategory.value ? 'Category updated' : 'Category added'
        )
      }
    }
  } catch (err: any) {
    error.value = err.data.message
  } finally {
    isLoading.value = false
  }
}

function handleEditCategory(category: Category) {
  editingCategory.value = category._id
  categoryName.value = category.name
}
</script>

<template>
  <section class="mt-8 max-w-md mx-auto">
    <UserTabs v-if="isAdmin" />
    <Loader v-if="isLoading" />
    {{ editingCategory }}
    <form class="mt-8" @submit.prevent="handleCategorySubmit">
      <div class="flex gap-2 items-end">
        <div class="grow">
          <label for="name">{{
            editingCategory
              ? `Updating category ${categoryName}:`
              : 'New category nam'
          }}</label>
          <input type="text" id="name" v-model="categoryName" />
        </div>

        <div class="pb-2">
          <button class="border border-primary" type="submit">
            {{ editingCategory ? 'Update' : 'Create' }}
          </button>
        </div>
      </div>
    </form>

    <div>
      <h2 class="mt-8 text-sm text-slate-500">Edit category:</h2>
      <button
        v-if="categories!.length > 0 "
        v-for="category in categories"
        :key="category._id"
        @click="handleEditCategory(category)"
        class="bg-slate-200 rounded-xl p-2 px-4 flex gap-1 mb-1 cursor-pointer"
      >
        <span> {{ category.name }}</span>
      </button>
    </div>
  </section>
</template>
