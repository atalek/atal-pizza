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
        Imagine, a symphony of flavors dancing on your tongue. Warm dough,
        bubbling cheese, tangy sauce, all in perfect harmony. It's not just
        pizza, it's a culinary revelation. Come, join the chorus.
      </p>

      <div class="flex gap-6">
        <NuxtLink
          to="/menu"
          class="flex justify-center bg-primary w-32 uppercase items-center gap-2 text-white rounded-full text-sm p-2">
          Order now
          <Icon
            class="h-5 w-5"
            name="material-symbols:arrow-circle-right-outline" />
        </NuxtLink>
        <NuxtLink
          to="#about"
          class="flex items-center border-0 w-32 gap-2 p-2 text-slate-600 font-semibold">
          Learn more
          <Icon
            class="h-5 w-5"
            name="material-symbols:arrow-circle-right-outline" />
        </NuxtLink>
      </div>
    </div>
    <div class="hidden md:block w-full h-full">
      <img
        src="~/assets/images/pizza-webp.webp"
        class="object-fill"
        alt="pizza" />
    </div>
  </section>
</template>
