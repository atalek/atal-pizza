<script setup lang="ts">
import type { OrderType } from '~/types'
const { data } = useAuth()

definePageMeta({
  middleware: 'unauthenticated',
})

const route = useRoute()
const orderId = route.params.id
const isAdmin = await useIsAdmin()

const { clearCart } = useCart()

const order = ref<OrderType>()
const pending = ref(false)

try {
  pending.value = true
  const res = await $fetch<OrderType>(`/api/orders/${orderId}`)
  if (res) {
    order.value = res
  }
} catch (error) {
  console.error(error)
} finally {
  pending.value = false
}

if (process.client) {
  if (route.fullPath.includes('clear-cart=1')) {
    clearCart()
  }
}

const addressInfo = reactive({
  phoneNumber: order?.value?.phoneNumber || undefined,
  streetAddress: order?.value?.streetAddress || '',
  postalCode: order?.value?.postalCode || '',
  city: order?.value?.city || '',
  country: order?.value?.country || '',
})

console.log(isAdmin)

watchEffect(async () => {
  if (!isAdmin && data.value?.user?.email !== order.value?.userEmail) {
    await navigateTo('/')
  }
})
</script>

<template>
  <section class="mt-8">
    <Title>{{ `Order ${orderId}` }}</Title>

    <div class="text-center">
      <SectionHeaders mainHeader="Your Order" />
      <div class="my-8">
        <p>Thanks for your order.</p>
        <p>We will call you when your order will be on the way.</p>
        <Loader v-if="pending" />
      </div>
    </div>

    <div v-if="order" class="grid md:grid-cols-2 gap-8">
      <div>
        <div v-for="item in order.orderItems">
          <CartProduct :item="item" :key="item?._id?.toString()" />
        </div>
        <div class="text-right py-2 text-slate-500">
          Subtotal:
          <span class="text-black inline-block w-8 font-bold"
            >${{ order.subtotal }}</span
          >
          <br />
          Delivery:
          <span class="text-black inline-block w-8 font-bold">$5</span>
          <br />
          Total:
          <span class="text-black inline-block w-8 font-bold"
            >${{ order.total }}</span
          >
          <br />
        </div>
      </div>
      <div class="bg-slate-100 p-4 rounded-lg">
        <AddressInputs :addressInfo="addressInfo" :disabled="true" />
      </div>
    </div>
  </section>
</template>
