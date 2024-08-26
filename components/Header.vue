<script lang="ts" setup>
const { data, status, signOut } = useAuth()
const userData = ref(data?.value?.user)
const { totalItems } = useCart()

const userName = ref(userData?.value?.name || userData?.value?.email)

if (userName?.value?.includes(' ')) {
  userName.value = userName?.value?.split(' ')[0]
}

const mobileNavOpen = ref(false)

const y = ref(0)
onMounted(() => {
  const updateScroll = () => {
    y.value = window.scrollY
  }

  window.addEventListener('scroll', updateScroll)
  window.addEventListener('resize', updateScroll)
})

function goTop() {
  document.body.scrollIntoView()
}
</script>

<template>
  <header>
    <div
      class="flex md:hidden justify-between items-center border-b border-solid border-primary">
      <NuxtLink
        class="text-primary font-semibold text-2xl"
        href="/">
        ATAL PIZZA</NuxtLink
      >

      <div class="flex gap-2 items-center">
        <NuxtLink
          to="/cart"
          class="relative px-2 py-2 mr-2"
          aria-label="View Cart">
          <span
            v-if="totalItems > 0"
            class="absolute -top-1 -right-0 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3"
            >{{ totalItems }}
          </span>
          <Icon
            name="fa6-solid:cart-shopping"
            class="h-6 w-6" />
        </NuxtLink>
        <button
          class="p-2"
          @click="mobileNavOpen = !mobileNavOpen"
          aria-label="Toggle Mobile Navigation">
          <Icon
            name="fa-solid:bars"
            class="h-6 w-6" />
        </button>
      </div>
    </div>
    <Transition name="slide-fade">
      <div
        v-if="mobileNavOpen"
        class="md:hidden p-4 bg-slate-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        @click="() => (mobileNavOpen = false)">
        <NuxtLink href="/">Home</NuxtLink>
        <NuxtLink href="/menu">Menu</NuxtLink>
        <NuxtLink href="/#about">About</NuxtLink>
        <NuxtLink href="/#contact">Contact</NuxtLink>

        <div
          v-if="status === 'unauthenticated'"
          class="flex items-center justify-center gap-8">
          <NuxtLink
            href="/login"
            class="px-8 py-2 font-semibold border border-primary rounded-full"
            >Login</NuxtLink
          >
          <NuxtLink
            href="/register"
            class="bg-primary rounded-full text-white px-8 py-2"
            >Register</NuxtLink
          >
        </div>
        <div
          v-if="status === 'authenticated'"
          class="flex flex-col">
          <NuxtLink
            href="/profile"
            class="px-4 py-2 font-semibold whitespace-nowrap"
            >Hello, {{ userName }}</NuxtLink
          >
          <NuxtLink
            @click="signOut"
            class="bg-primary rounded-full text-white px-8 py-2 font-semibold cursor-pointer"
            aria-label="Logout">
            Logout
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <div
      class="hidden md:flex items-center justify-between border-b border-solid border-primary">
      <nav class="flex gap-6 text-slate-600 font-semibold items-center">
        <NuxtLink
          class="text-primary font-semibold text-2xl"
          href="/">
          ATAL PIZZA</NuxtLink
        >
        <NuxtLink href="/">Home</NuxtLink>
        <NuxtLink href="/menu">Menu</NuxtLink>
        <NuxtLink href="/#about">About</NuxtLink>
        <NuxtLink href="/#contact">Contact</NuxtLink>
      </nav>

      <nav class="flex items-center gap-2 text-slate-600">
        <div v-if="status === 'unauthenticated'">
          <NuxtLink
            href="/login"
            class="px-8 py-2 font-semibold border border-primary rounded-full mr-4"
            >Login</NuxtLink
          >
          <NuxtLink
            href="/register"
            class="bg-primary rounded-full text-white px-8 py-2"
            >Register</NuxtLink
          >
        </div>

        <div v-if="status === 'authenticated'">
          <NuxtLink
            href="/profile"
            class="px-4 py-2 font-semibold whitespace-nowrap"
            >Hello, {{ userName }}</NuxtLink
          >

          <NuxtLink
            @click="signOut"
            to="/"
            class="bg-primary hover:bg-primary/80 transition rounded-full text-white px-8 py-2 font-semibold cursor-pointer"
            aria-label="Logout">
            Logout
          </NuxtLink>
        </div>
        <NuxtLink
          to="/cart"
          class="relative px-2 py-2 mr-2"
          aria-label="View Cart">
          <span
            v-if="totalItems > 0"
            class="absolute -top-1 -right-0 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3"
            >{{ totalItems }}
          </span>
          <Icon
            name="fa6-solid:cart-shopping"
            class="h-6 w-6" />
        </NuxtLink>
      </nav>
    </div>

    <div class="fixed bottom-0 right-0 p-10 z-[10]">
      <button
        @click="goTop"
        aria-label="go to top button"
        class="rounded-full bg-primary text-white px-3 sm:px-4 hover:bg-green-500 cursor-pointer aspect-square grid place-items-center"
        :class="{ hidden: y < 20 }">
        <Icon name="fa-solid:arrow-up" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
