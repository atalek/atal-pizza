<script lang="ts" setup>
import { UserData } from '~/types'
import { toast } from 'vue3-toastify'
definePageMeta({
  middleware: 'guest',
})

const isLoading = ref(false)
const erorr = ref('')

const { data, pending, error, refresh } = await useFetch<UserData>(
  '/api/profile'
)

const userInfo = reactive({
  name: data?.value?.user?.name || '',
  image: data?.value?.user.image || '',
  email: data?.value?.user?.email || '',
  phoneNumber: data.value?.userInfo?.phone || '',
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

async function handleFileChange(e: Event) {
  isLoading.value = true
  try {
    const files = (e.target as HTMLInputElement).files as FileList

    if (files && files.length > 0) {
      const fileData = new FormData()
      fileData.set('file', files[0])
      const res = await $fetch('/api/upload', {
        method: 'POST',
        body: fileData,
        'Content-Type': 'multipart/form-data',
      })
      if (res) {
        userInfo.image = res
        refresh()
        toast.success('Profile picture updated')
      }
    }
  } catch (err: any) {
    erorr.value = err.data.message
  } finally {
    isLoading.value = false
  }
}

const googleImg = ref(false)

if (data?.value?.user) {
  googleImg.value = computed(async () =>
    data?.value?.user?.image.startsWith('https://lh3.googleusercontent.com/')
  )
}
</script>

<template>
  <section class="mt-6">
    <UserTabs v-if="data?.userInfo?.admin" />
    <div class="max-w-xl mx-auto">
      <div v-if="isLoading" class="my-4">
        <InfoBox>Saving...</InfoBox>
      </div>
      <div v-if="pending">
        <Loader />
      </div>
      <h1
        v-if="!data?.userInfo?.admin"
        class="text-center text-primary font-semibold text-4xl mb-4"
      >
        Profile
      </h1>
      <div class="flex gap-4 mt-4">
        <!-- <div class="p-2 rounded-lg">
          <NuxtImg
            v-if="googleImg"
            :src="userInfo?.image"
            provider="s3Provider"
            alt="avatar"
            class="rounded-lg h-28 max-h-full max-w-[120px] mb-1"
          />

          <NuxtImg
            v-else
            :src="session?.user?.picture"
            alt="avatar"
            class="rounded-lg h-28 max-h-full max-w-[120px] mb-1"
          />
          <label>
            <input type="file" class="hidden" @change="handleFileChange" />
            <span
              class="block border border-gray-300 rounded-lg p-2 text-center text-black cursor-pointer"
              >Edit</span
            >
          </label>

          <EditableImage
            :image="data?.user?.image"
            :googleImg="session?.user?.picture"
          />
        </div> -->

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
