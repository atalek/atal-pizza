<script setup lang="ts">
import { OrderType } from '~/types'

const route = useRoute()
const orderId = route.params.id

const { clearCart } = useCart()

const {
  data: order,
  pending,
  error,
} = useFetch<OrderType>(`/api/orders/${orderId}`)

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
</script>

<template>
  <section class="mt-8">
    <div class="text-center">
      <SectionHeaders mainHeader="Your Order" />
      <div class="my-8">
        <p>Thank you for ordering</p>
        <p>We will send you a message when your order goes out for delivery</p>
      </div>
      <Loader v-if="pending" />
    </div>

    <div v-if="order" class="grid md:grid-cols-2 gap-8">
      <div>
        <div v-for="item in order.orderItems">
          <CartProduct :item="item" :key="item._id.toString()" />
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
