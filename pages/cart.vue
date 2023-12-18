<script lang="ts" setup>
import { UserData } from '~/types'

const { cartItems, totalPrice, cartProductPrice, removeItemFromCart } =
  useCart()

const total = computed(() => {
  return totalPrice.value + 5
})
const isLoading = ref(false)
const { data, pending } = useFetch<UserData>('/api/profile')

const addressInfo = reactive({
  phoneNumber: data.value?.userInfo?.phone || undefined,
  streetAddress: data.value?.userInfo?.streetAddress || '',
  postalCode: data.value?.userInfo.postalCode || '',
  city: data.value?.userInfo.city || '',
  country: data.value?.userInfo.country || '',
})

async function proceedToCheckout() {
  const body = { addressInfo: addressInfo, orderItems: cartItems.value }
  isLoading.value = true
  try {
    const res = await $fetch('/api/checkout', {
      method: 'POST',
      body: body,
    })

    if (res) {
      const link = res
      window.location = link
    }
  } catch (error: any) {
    console.log(error.data.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="mt-8">
    <div class="text-center">
      <SectionHeaders mainHeader="Cart" />
    </div>

    <div class="mt-8 grid md:grid-cols-2 gap-8">
      <div>
        <div v-if="cartItems.length === 0">
          No products in your shopping cards
          <NuxtLink to="/menu">Start shopping</NuxtLink>
        </div>
        <div
          v-else
          v-for="(item, index) in cartItems"
          :key="item.product.name + index"
          class="flex items-center gap-4 mb-2 border-b py-4"
        >
          <div class="w-24">
            <NuxtImg
              provider="s3Provider"
              :src="item.product.image"
              :alt="item.product.name"
            />
          </div>
          <div class="grow">
            <h3 class="font-semibold">
              {{ item.product.name }}
            </h3>
            <div v-if="item.product.sizes">
              <span
                v-for="size in item.product.sizes"
                :key="size.name"
                class="text-sm"
              >
                Size: {{ size.name }} <br />
              </span>
            </div>
            <div v-if="item.product.extraIngredients">
              <div>
                <div
                  v-for="extra in item.product.extraIngredients"
                  :key="extra.name"
                  class="text-slate-500 text-sm"
                >
                  Extra {{ extra.name }} +${{ extra.extraPrice }} <br />
                </div>
              </div>
            </div>
          </div>
          <div class="text-lg font-semibold">
            ${{ cartProductPrice(item.product) }}
          </div>
          <div class="ml-2">
            <button type="button" @click="removeItemFromCart(item.product)">
              <Icon name="fa-solid:trash-alt" />
            </button>
          </div>
        </div>
        <div class="py-2 pr-16 flex justify-end items-center">
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
        <Loader v-if="isLoading || pending" />
        <form @submit.prevent="proceedToCheckout">
          <AddressInputs :addressInfo="addressInfo" />
          <button type="submit">Pay ${{ total }}</button>
        </form>
      </div>
    </div>
  </section>
</template>
