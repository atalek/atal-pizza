<script lang="ts" setup>
import { User } from '~/types'
import { toast } from 'vue3-toastify'
import { Types } from 'mongoose'

const { data: isAdmin } = await useIsAdmin()

const { data: users, pending, refresh } = await useFetch<User[]>('/api/users')
const isLoading = ref(false)

// async function handleDeleteUser(_id: Types.ObjectId) {
//   isLoading.value = true
//   try {
//     const res = await $fetch('/api/users?_id=' + _id, {
//       method: 'DELETE',
//     })
//     if (res) {
//       console.log(res)
//       refresh()
//       toast.success('User deleted')
//     }
//   } catch (err: any) {
//     toast.error(err.data.message)
//   } finally {
//     isLoading.value = false
//   }
// }
</script>

<template>
  <section class="mt-8 max-w-2xl mx-auto">
    <UserTabs :isAdmin="isAdmin" />

    <Loader v-if="pending" />
    <div class="mt-8">
      <div
        v-if="users!.length > 0"
        v-for="user in users"
        class="bg-slate-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
        :key="user._id.toString()"
      >
        <div class="grid grid-cols-3 gap-4 grow items-center overflow-x-auto">
          <div class="text-slate-900">
            <span v-if="user.name" class="">{{ user.name }}</span>
            <span v-else class="italic">No name</span>
          </div>
          <span class="text-slate-500">{{ user.email }}</span>
        </div>
        <div class="flex gap-1">
          <NuxtLink :to="`/users/${user?._id}`" class="button">Edit</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
