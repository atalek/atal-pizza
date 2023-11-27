<script lang="ts" setup></script>

<template>
  <section class="grid hero md:mt-4">
    <div class="py-8 md:py-12">
      <h1 class="text-6xl font-semibold">
        Everything <br />
        is better <br />
        with a&nbsp; <span class="text-primary">Pizza</span>
      </h1>
      <p class="my-6 text-slate-600">
        Pizza is the missing piece that makes every day complete,a simple yet
        delicious joy in life
      </p>

      <div class="flex gap-3">
        <button
          class="flex bg-primary uppercase items-center gap-2 text-white rounded-full text-sm"
        >
          Order now
          <Icon
            class="h-6 w-6"
            name="material-symbols:arrow-circle-right-outline"
          />
        </button>
        <button
          class="flex items-center border-0 gap-2 py-2 text-slate-600 font-semibold"
        >
          Learn more
          <Icon
            class="h-6 w-6"
            name="material-symbols:arrow-circle-right-outline"
          />
        </button>
      </div>
    </div>
    <div class="hidden md:block w-full h-full">
      <img src="~/assets/images/pizza.png" class="object-fill" alt="pizza" />
    </div>
  </section>
</template>

<style scoped></style>
