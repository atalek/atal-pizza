<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
})

const { data, signIn } = useAuth()
const userImg = data.value?.user?.image
const userName = ref(data.value?.user?.name || '')
const error = ref('')
const image = ref('')
const isLoading = ref(false)

async function handleProfileInfoUpdate() {
  if (userName.value.trim()) {
    isLoading.value = true
    try {
      const res = await $fetch('/api/profile', {
        method: 'PUT',
        body: { name: userName.value },
      })

      if (res) {
        location.reload()
      }
    } catch (err: any) {
      console.log(err)
      error.value = err.data.message
    } finally {
      isLoading.value = false
    }
  } else {
    error.value = 'All fields are required'
  }
}

async function handleFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files as FileList

  if (files && files.length > 0) {
    const data = new FormData()
    data.set('file', files[0])
    const res = await $fetch('/api/upload', {
      method: 'POST',
      body: data,
      'Content-Type': 'multipart/form-data',
    })
    if (res) {
      image.value = res
    }
  }
}
</script>

<template>
  <section class="mt-8">
    <Loader v-if="isLoading" />
    <h1 class="text-center text-primary font-semibold text-4xl mb-4">
      Profile
    </h1>
    <div class="max-w-md mx-auto">
      <div class="flex gap-4 items-center">
        <div class="p-2 rounded-lg">
          {{ data?.user.picture }}
          <NuxtImg
            v-if="userImg"
            :src="data!.user!.picture"
            alt="avatar"
            class="rounded-lg object-contain mb-1"
          />
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
            v-model="userName"
          />
          <input type="email" :value="data?.user?.email" disabled />
          <button type="submit">Save</button>
        </form>
      </div>
      <div v-if="error">
        <p class="text-center text-red-600">{{ error }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
