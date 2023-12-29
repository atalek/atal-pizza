<script lang="ts" setup>
import type { UserType } from '~/types'

const { data: isAdmin } = await useIsAdmin()

const { data: users, pending } = await useFetch<UserType[]>('/api/users')

watchEffect(() => {
  if (!isAdmin.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <section class="mt-8 max-w-2xl mx-auto">
    <Title>{{ 'Users' }}</Title>

    <UserTabs :isAdmin="isAdmin" />

    <Loader v-if="pending" />
    <div class="mt-8">
      <div v-if="users?.length > 0">
        <div
          v-for="user in users"
          class="bg-slate-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
          :key="user!._id!.toString()"
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
    </div>
  </section>
</template>
