<script lang="ts" setup>
const { signIn, data } = useAuth()
</script>

<template>
  <section class="my-8">
    <h1 class="text-center text-primary text-4xl">Register</h1>
    <form class="block max-w-xs mx-auto mt-8">
      <input type="email" name="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <button type="submit">Register</button>
      <p class="my-4 text-center text-slate-600">or login with google</p>
      <button class="flex items-center" @click="signIn('google')">
        <Icon name="logos:google-icon" /> Log in with google
      </button>
    </form>
  </section>
</template>

<style scoped></style>
