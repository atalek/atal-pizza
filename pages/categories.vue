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
const editingCategory = ref(null)
const { data: categories, refresh } = await useFetch<Category[]>(
  '/api/categories'
)

async function handleNewCategorySubmit() {
  isLoading.value = true
  try {
    if (categoryName.value.trim()) {
      const res = await $fetch('/api/categories', {
        method: 'POST',
        body: { name: categoryName.value },
      })

      if (res) {
        categoryName.value = ''
        refresh()
        toast.success('Category added')
      }
    }
  } catch (err: any) {
    error.value = err.data.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="mt-8 max-w-md mx-auto">
    <UserTabs v-if="isAdmin" />
    <Loader v-if="isLoading" />

    <form class="mt-8" @submit.prevent="handleNewCategorySubmit">
      <div class="flex gap-2 items-end">
        <div class="grow">
          <label for="name"
            >{{
              editingCategory ? 'Update category' : 'New category nam'
            }}e</label
          >
          <input type="text" id="name" v-model="categoryName" />
        </div>
        {{ editingCategory }}
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
        @click=""
        class="bg-slate-200 rounded-xl p-2 px-4 flex gap-1 mb-1 cursor-pointer"
      >
        <span> {{ category.name }}</span>
      </button>
    </div>
  </section>
</template>
