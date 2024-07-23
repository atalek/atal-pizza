<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import type { UserData } from '~/types'
const { status } = useAuth()

const route = useRoute()

const { cartItems, totalPrice } = useCart()

const total = computed(() => {
  return totalPrice.value + 5
})
const isLoading = ref(false)

const addressInfo = reactive({
  phoneNumber: undefined,
  streetAddress: '',
  postalCode: '',
  city: '',
  country: '',
})

if (status.value === 'authenticated') {
  const data = await $fetch<UserData>('/api/profile')

  if (data) {
    Object.assign(addressInfo, {
      phoneNumber: data.userInfo?.phone,
      streetAddress: data.userInfo?.streetAddress,
      postalCode: data.userInfo?.postalCode,
      city: data.userInfo?.city,
      country: data.userInfo?.country,
    })
  }
}

const isAddressComplete = computed(() => {
  return (
    addressInfo.phoneNumber &&
    addressInfo.streetAddress &&
    addressInfo.postalCode &&
    addressInfo.city &&
    addressInfo.country
  )
})

async function proceedToCheckout() {
  const body = { addressInfo: addressInfo, orderItems: cartItems.value }
  isLoading.value = true
  try {
    const res = await $fetch('/api/stripe/checkout', {
      method: 'POST',
      body: body,
    })

    if (res) {
      const link = res
      window.location.href = link
    }
  } catch (error: any) {
    console.error(error.data.message)
  } finally {
    isLoading.value = false
  }
}

if (import.meta.client) {
  if (route.fullPath.endsWith('canceled=1')) {
    toast.error('Payment failed')
  }
}
</script>

<template>
  <div>
    <Title>{{ 'Cart' }}</Title>
    <div
      v-if="cartItems.length === 0"
      class="mt-8 text-center max-w-md mx-auto">
      <SectionHeaders mainHeader="Cart" />
      <p class="mt-8">No products in your shopping cards</p>
      <NuxtLink
        to="/menu"
        class="button mt-4"
        >Start shopping</NuxtLink
      >
    </div>
    <section
      class="mt-8"
      v-else>
      <div class="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>

      <div class="mt-8 grid md:grid-cols-2 gap-8">
        <div class="p-4">
          <CartProduct
            v-for="item in cartItems"
            :key="item._id?.toString()"
            :item="item"
            :remove="true" />

          <div class="py-2 flex justify-end items-center">
            <div class="text-slate-500">
              Subtotal:<br />
              Delivery:<br />
              Total:
            </div>
            <div class="font-semibold pl-2 text-right">
              ${{ totalPrice }}<br />
              $5<br />
              ${{ totalPrice + 5 }}
            </div>
          </div>
        </div>
        <div class="bg-slate-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <Loader v-if="isLoading" />
          <form @submit.prevent="proceedToCheckout">
            <AddressInputs
              :addressInfo="addressInfo"
              :disabled="status !== 'authenticated'" />
            <NuxtLink
              to="/login?redirect=/cart"
              class="button bg-primary hover:bg-primary/80 transition !text-white"
              v-if="status === 'unauthenticated'"
              >Sign in to pay</NuxtLink
            >
            <button
              v-else
              type="submit"
              class="bg-primary hover:bg-primary/80 transition"
              :disabled="!isAddressComplete">
              Pay ${{ total }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
