<script lang="ts" setup>
const { signIn, data } = useAuth()

definePageMeta({
  middleware: 'auth',
})

const loginInfo = reactive({
  email: '',
  password: '',
})

const error = ref('')

const isLoading = ref(false)

async function handleLogin() {
  if (loginInfo.email.trim() && loginInfo.password.trim()) {
    isLoading.value = true
    try {
      const user = await signIn('credentials', loginInfo)
      console.log(user)

      if (user) {
        console.log(user)
        console.log(user?.error)
        navigateTo('/')
      } else {
        console.log('Invalid credentials')
      }
    } catch (err: any) {
      if (err.data && err.data.error) {
        error.value = err.data.error
      } else {
        console.log('Unexpected error:', err)
      }
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <section class="my-8 max-w-xs mx-auto">
    <h1 class="text-center text-primary text-4xl">Login</h1>
    <form class="block mt-8" @submit.prevent="handleLogin">
      <input
        type="text"
        name="email"
        placeholder="email"
        v-model="loginInfo.email"
        :disabled="isLoading"
      />

      <input
        type="password"
        name="password"
        placeholder="password"
        v-model="loginInfo.password"
        :disabled="isLoading"
      />
      <button
        :disabled="
          !loginInfo.email.trim() || !loginInfo.password.trim() || isLoading
        "
        type="submit"
        class="flex items-center"
      >
        <template v-if="isLoading">
          Logging in <Icon name="svg-spinners:180-ring" class="h-5" />
        </template>

        <template v-else>Login</template>
      </button>
      <div v-if="error" class="my-1 text-red-600 text-sm text-center">
        <p>{{ error }}</p>
      </div>
      <p class="my-2 text-center text-slate-600">or continue with google</p>
      <button class="flex items-center" @click="signIn('google')">
        <Icon name="logos:google-icon" /> Log in with google
      </button>
      <p class="text-slate-600 text-center mt-2">
        Don&lsquo;t have an account?<NuxtLink to="/register" class="underline">
          Register &raquo;</NuxtLink
        >
      </p>
    </form>
  </section>
</template>
