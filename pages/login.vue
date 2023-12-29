<script lang="ts" setup>
const { signIn } = useAuth()

definePageMeta({
  middleware: 'authenticated',
})

const route = useRoute()
const errorMessage = route.query.error

const loginInfo = reactive({
  email: '',
  password: '',
})

const isLoading = ref(false)

async function handleLogin() {
  if (loginInfo.email.trim() && loginInfo.password.trim()) {
    isLoading.value = true
    try {
      await signIn('credentials', {
        ...loginInfo,
        callbackUrl: '/',
      })
    } catch (err: any) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <section class="my-8 max-w-xs mx-auto">
    <Title>{{ 'Log in' }}</Title>

    <h1 class="text-center text-primary text-4xl">Log in</h1>
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

        <template v-else>Log in</template>
      </button>
      <div v-if="errorMessage" class="my-1 text-red-600 text-center">
        <p>{{ errorMessage }}</p>
      </div>
      <p class="my-2 text-center text-slate-600">or continue with google</p>
    </form>
    <button
      class="flex items-center"
      @click.prevent="signIn('google', { callbackUrl: '/' })"
    >
      <Icon name="logos:google-icon" /> Log in with google
    </button>
    <p class="text-slate-600 text-center mt-2">
      Don&lsquo;t have an account?<NuxtLink to="/register" class="underline">
        Register &raquo;</NuxtLink
      >
    </p>
  </section>
</template>
