<script setup lang="ts">
import { UserData } from '~/types'

const { data: isAdmin } = await useIsAdmin()

const route = useRoute()
const userId = route.params.id
const { data, pending } = await useFetch<UserData>(`/api/users/${userId}`)
const isLoading = ref(false)
const error = ref('')

const userInfo = reactive({
  name: data?.value?.user?.name || '',
  image: data?.value?.user?.image || '',
  email: data?.value?.user?.email || '',
  admin: data?.value?.userInfo?.admin || false,
  phoneNumber: data.value?.userInfo?.phone || '',
  streetAddress: data.value?.userInfo?.streetAddress || '',
  postalCode: data.value?.userInfo?.postalCode || '',
  city: data.value?.userInfo?.city || '',
  country: data.value?.userInfo?.country || '',
})

async function handleUserInfoUpdate() {
  if (userInfo) {
    isLoading.value = true
    try {
      const res = await $fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: userInfo,
      })

      if (res) {
        console.log(res)
        navigateTo('/users')
      }
    } catch (err: any) {
      error.value = err.data.message
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <section class="mt-8 max-w-2xl mx-auto">
    <UserTabs v-if="isAdmin" />
    <Loader v-if="pending" />

    <NuxtLink to="/users" class="button"
      >Show all users
      <Icon class="h-6 w-6" name="material-symbols:arrow-circle-left-outline"
    /></NuxtLink>

    <div class="mt-8">
      <UserForm
        :userInfo="userInfo"
        :onSubmit="handleUserInfoUpdate"
        :isLoading="isLoading"
        :isAdmin="isAdmin"
      />
    </div>
  </section>
</template>

<style scoped></style>
