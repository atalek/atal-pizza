<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { Types } from 'mongoose'

type Category = {
  _id: Types.ObjectId
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
    }
    const res = await $fetch('/api/categories', {
      method: editingCategory.value ? 'PUT' : 'POST',
      body: data,
    })

    if (res) {
      categoryName.value = ''
      editingCategory.value = ''
      refresh()
      toast.success(
        editingCategory.value ? 'Category updated' : 'Category added'
      )
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

async function handleDeleteCategory(_id: Types.ObjectId) {
  isLoading.value = true
  try {
    const res = await $fetch('/api/categories?_id=' + _id, {
      method: 'DELETE',
    })
    if (res) {

      refresh()
      toast.success('Category deleted')
    }
  } catch (err: any) {
    toast.error(err.data.message)
  } finally {
    isLoading.value = false
  }
}



watchEffect(() => {
  if (!isAdmin.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <section class="mt-8 max-w-xl mx-auto">
    <UserTabs :isAdmin="isAdmin" />

    <Loader v-if="isLoading" />

    <form class="mt-8" @submit.prevent="handleCategorySubmit">
      <div class="flex gap-2 items-end">
        <div class="grow">
          <label for="name">{{
            editingCategory
              ? `Updating category ${categoryName}:`
              : 'New category name'
          }}</label>
          <input type="text" id="name" v-model="categoryName" />
        </div>

        <div class="flex gap-1 pb-2">
          <button class="border border-primary" type="submit">
            {{ editingCategory ? 'Update' : 'Create' }}
          </button>
          <button
            v-if="editingCategory"
            @click=";(editingCategory = ''), (categoryName = '')"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>

    <div>
      <h2 class="mt-8 text-sm text-slate-500">Edit category:</h2>
      <div
        v-if="categories!.length > 0 "
        v-for="category in categories"
        :key="category._id.toString()"
        class="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
      >
        <div class="grow">
          {{ category.name }}
        </div>
        <div class="flex gap-1">
          <button type="button" @click="handleEditCategory(category)">
            Edit
          </button>
          <DeleteButton
            label="Delete"
            :_id="category._id"
            :onDelete="() => handleDeleteCategory(category._id)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
