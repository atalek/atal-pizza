<script lang="ts" setup>
import type { UserData } from '~/types'
import { toast } from 'vue3-toastify'

definePageMeta({
  middleware: 'unauthenticated',
})

const isLoading = ref(false)
const erorr = ref('')

const { data, pending, error, refresh } = await useFetch<UserData>(
  '/api/profile'
)
const { data: isAdmin } = await useIsAdmin()

const userInfo = reactive({
  name: data?.value?.user?.name || '',
  image: data?.value?.user.image || '',
  email: data?.value?.user?.email || '',
  phoneNumber: data.value?.userInfo?.phone || undefined,
  streetAddress: data.value?.userInfo?.streetAddress || '',
  postalCode: data.value?.userInfo?.postalCode || '',
  city: data.value?.userInfo?.city || '',
  country: data.value?.userInfo?.country || '',
})

async function handleProfileInfoUpdate() {
  if (userInfo) {
    isLoading.value = true

    try {
      const res = await $fetch('/api/profile', {
        method: 'PUT',
        body: userInfo,
      })

      if (res) {
        refresh()
        toast.success('Profile info updated')
      }
    } catch (err: any) {
      error.value = err.data.message
    } finally {
      isLoading.value = false
    }
  } else {
    erorr.value = 'All fields are required'
  }
}
</script>

<template>
  <section class="mt-6">
    <Title>{{ 'Profile' }}</Title>

    <UserTabs :isAdmin="isAdmin" />

    <div class="max-w-xl mx-auto">
      <div v-if="isLoading" class="my-4"></div>
      <div v-if="pending">
        <Loader />
      </div>

      <div class="flex gap-4 mt-4 items-center justify-center">
        <UserForm
          :userInfo="userInfo"
          :isLoading="isLoading"
          :onSubmit="handleProfileInfoUpdate"
        />
      </div>

      <div v-if="error || erorr">
        <p class="text-center text-red-600">{{ error ? error : erorr }}</p>
      </div>
    </div>
  </section>
</template>
