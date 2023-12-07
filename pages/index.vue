<script lang="ts" setup></script>

<template>
  <Hero />
  <HomeMenu />
  <section class="text-center my-16">
    <SectionHeaders subHeader="our story" mainHeader="About us" />
    <div
      class="max-w-md mx-auto text-slate-600 mt-4 flex flex-col gap-4"
      id="about"
    >
      <p>
        At our pizzeria, we believe in crafting more than just pizza. We're
        dedicated to creating an experience. From the first bite of our
        artisanal crust to the last lingering flavor, we promise a journey of
        taste like no other.
      </p>
      <p>
        Our passion for quality ingredients and authentic flavors is evident in
        every slice we serve. From handpicked toppings to our secret family
        sauce recipe, each element is carefully chosen to ensure a burst of
        satisfaction in every bite. We invite you to savor the essence of
        tradition with a modern twist.
      </p>
      <p>
        Beyond the pizza, our pizzeria is a place where friends and families
        come together. We take pride in providing a warm and inviting
        atmosphere, making every visit an opportunity to connect over a shared
        love for great food. Join us in creating moments that linger on your
        taste buds and in your memories.
      </p>
    </div>
  </section>
  <section class="text-center my-8">
    <SectionHeaders subHeader="Don't hesitate" mainHeader="Contact us" />
    <div class="mt-8" id="contact">
      <a class="text-4xl underline text-slate-600" href="tel:+389123456"
        >+389 72 123 456</a
      >
    </div>
  </section>
</template>

<style scoped></style>
