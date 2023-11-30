<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
})

const isLoading = ref(false)
const erorr = ref('')
const { data: session } = useAuth()

const { data: user, pending, error, refresh } = await useFetch('/api/profile')

async function handleProfileInfoUpdate() {
  if (user?.value?.name.trim()) {
    isLoading.value = true
    try {
      const res = await $fetch('/api/profile', {
        method: 'PUT',
        body: { name: user?.value?.name },
      })
      if (res) {
        refresh()
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
        refresh()
      }
    }
  } catch (err: any) {
    erorr.value = err.data.message
  } finally {
    isLoading.value = false
  }
}
const googleImg = computed(() => user?.value?.image.startsWith('https://lh3.'))
</script>

<template>
  <section class="mt-8">
    <h1 class="text-center text-primary font-semibold text-4xl mb-4">
      Profile
    </h1>
    <div class="max-w-md mx-auto">
      <div v-if="isLoading || pending">
        <Loader />
        <InfoBox>Saving...</InfoBox>
      </div>

      <div class="flex gap-4 items-center">
        <div class="p-2 rounded-lg">
          <template v-if="!googleImg">
            <NuxtImg
              :src="user?.image"
              provider="s3Provider"
              alt="avatar"
              class="rounded-lg h-28 max-h-full max-w-[120px] mb-1"
            />
          </template>
          <template v-else>
            <NuxtImg
              :src="session?.user?.picture"
              alt="avatar"
              class="rounded-lg h-28 max-h-full max-w-[120px] mb-1"
            />
          </template>

          <label>
            <input type="file" class="hidden" @change="handleFileChange" />
            <span
              class="block border border-gray-300 rounded-lg p-2 text-center text-black cursor-pointer"
              >Edit</span
            >
          </label>
        </div>
        <form class="grow" @submit.prevent="handleProfileInfoUpdate">
          <input
            type="text"
            placeholder="first and last name"
            v-model="user!.name"
          />
          <input type="email" :value="user?.email" disabled />
          <button type="submit">Save</button>
        </form>
      </div>

      <div v-if="error || erorr">
        <p class="text-center text-red-600">{{ error ? error : erorr }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
