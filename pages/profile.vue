<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
})

const { data, signIn, getSession } = useAuth()
const userImg = data.value?.user?.image
const userName = ref(data.value?.user?.name || '')
const error = ref('')

async function handleProfileInfoUpdate() {
  try {
    const res = await $fetch('/api/profile', {
      method: 'PUT',
      body: { name: userName.value },
    })

    if (res) {
      signIn('refresh', { callbackUrl: '/profile' })
    }
  } catch (err: any) {
    error.value = err.data.message
  }
}
</script>

<template>
  <section class="mt-8">
    <h1 class="text-center text-primary font-semibold text-4xl mb-4">
      Profile
    </h1>
    <div class="max-w-md mx-auto">
      <div class="flex gap-4 items-center">
        <div class="p-2 rounded-lg">
          <NuxtImg
            v-if="userImg"
            :src="userImg"
            alt="avatar"
            class="rounded-lg w-full object-contain mb-1"
          />
          <button type="button">Edit</button>
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
        <div v-if="error">
          <p class="text-center text-red-600">{{ error }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
