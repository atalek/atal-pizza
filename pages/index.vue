<script lang="ts" setup></script>

<template>
  <main>
    <Hero />
    <HomeMenu />
    <section
      class="my-32"
      id="about">
      <div class="text-center mt-8">
        <SectionHeaders
          subHeader="our story"
          mainHeader="About us" />
      </div>

      <div class="mx-auto w-full mt-8">
        <div class="grid gap-4 lg:grid-cols-2">
          <div class="flex flex-col items-start gap-2">
            <p class="text-balance">
              At our pizzeria, we believe in crafting more than just pizza. We're
              dedicated to creating an experience. From the first bite of our artisanal
              crust to the last lingering flavor, we promise a journey of taste like no
              other.
            </p>
            <p class="text-balance">
              Our passion for quality ingredients and authentic flavors is evident in
              every slice we serve. From handpicked toppings to our secret family sauce
              recipe, each element is carefully chosen to ensure a burst of satisfaction
              in every bite. We invite you to savor the essence of tradition with a modern
              twist.
            </p>
            <p class="text-balance">
              Beyond the pizza, our pizzeria is a place where friends and families come
              together. We take pride in providing a warm and inviting atmosphere, making
              every visit an opportunity to connect over a shared love for great food.
              Join us in creating moments that linger on your taste buds and in your
              memories.
            </p>
          </div>
          <div class="min-h-[530px] overflow-hidden rounded-md">
            <img
              src="~/assets/images/about-us.webp"
              alt="about us"
              loading="lazy"
              class="w-full h-full object-center object-cover bg-cover bg-center" />
          </div>
        </div>
      </div>
    </section>
    <section class="text-center my-16">
      <SectionHeaders
        subHeader="Don't hesitate"
        mainHeader="Contact us" />
      <div
        class="mt-8"
        id="contact">
        <a
          class="text-4xl underline text-slate-600"
          href="tel:+12345678910"
          >+123 45 678 910</a
        >
      </div>
    </section>
  </main>
</template>

<style scoped></style>
