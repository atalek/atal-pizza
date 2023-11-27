<script lang="ts" setup>
const { signIn } = useAuth()

definePageMeta({
  middleware: 'auth',
})

const registerInfo = reactive({
  email: '',
  password: '',
})

const confirmPassword = ref('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/

const error = reactive({
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
})

const isLoading = ref(false)

async function handleRegister() {
  error.emailError = ''
  error.passwordError = ''

  if (!registerInfo.email.trim()) {
    error.emailError = 'Email is required'
  } else if (!emailRegex.test(registerInfo.email.trim())) {
    error.emailError = 'Invalid email format'
  }

  if (!registerInfo.password.trim()) {
    error.passwordError = 'Password is required'
  } else if (!passwordRegex.test(registerInfo.password)) {
    error.passwordError =
      'Password must be at least 8 characters long with 1 number, 1 uppercase letter, and 1 symbol'
  }
  if (registerInfo.password.trim() !== confirmPassword.value.trim()) {
    error.confirmPasswordError = 'Passwords do not match'
  }

  if (
    !error.emailError &&
    !error.passwordError &&
    registerInfo.password.trim() === confirmPassword.value.trim()
  ) {
    isLoading.value = true
    try {
      const res = await $fetch('/api/register', {
        method: 'POST',
        body: registerInfo,
      })

      if (res) {
        navigateTo('/')
      }
    } catch (err: any) {
      if (err.data.message === 'User with that email already exists') {
        error.emailError = err.data.message
      } else {
        error.passwordError = err.data.message
      }
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <section class="my-8 max-w-xs mx-auto">
    <h1 class="text-center text-primary text-4xl">Register</h1>
    <form class="block mt-8" @submit.prevent="handleRegister">
      <input
        type="text"
        name="email"
        placeholder="email"
        v-model="registerInfo.email"
        :disabled="isLoading"
      />
      <div v-if="error.emailError" class="text-red-600 text-sm text-center">
        <p>{{ error.emailError }}</p>
      </div>

      <input
        type="password"
        placeholder="password"
        v-model="registerInfo.password"
        :disabled="isLoading"
      />
      <div
        v-if="error.passwordError"
        class="my-1 text-red-600 text-sm text-center"
      >
        <p>{{ error.passwordError }}</p>
      </div>
      <input
        type="password"
        placeholder="confirm password"
        v-model="confirmPassword"
        :disabled="isLoading"
      />
      <div
        v-if="error.passwordError"
        class="my-1 text-red-600 text-sm text-center"
      >
        <p>{{ error.confirmPasswordError }}</p>
      </div>
      <button
        :disabled="
          !registerInfo.email.trim() ||
          !registerInfo.password.trim() ||
          !confirmPassword.trim() ||
          isLoading
        "
        type="submit"
        class="flex items-center"
      >
        <template v-if="isLoading">
          Registering <Icon name="svg-spinners:180-ring" class="h-5" />
        </template>

        <template v-else>Register</template>
      </button>
    </form>
    <p class="my-2 text-center text-slate-600">or continue with google</p>
    <button class="flex items-center" @click="signIn('google')">
      <Icon name="logos:google-icon" /> Log in with google
    </button>
    <p class="text-slate-600 text-center mt-2">
      Already have an account?<NuxtLink to="/login" class="underline">
        Log in &raquo;</NuxtLink
      >
    </p>
  </section>
</template>
