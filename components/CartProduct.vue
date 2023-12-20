<script lang="ts" setup>
import { Types } from 'mongoose'

type ExtraStuff = {
  name: string
  extraPrice: number
}

type ProductInfo = {
  item: {
    _id: Types.ObjectId
    image: string
    name: string
    description: string
    category: string
    basePrice: number
    sizes?: ExtraStuff[]
    extraIngredients?: ExtraStuff[]
  }
  remove?: boolean
}

const props = defineProps<ProductInfo>()
const item = props.item

const { cartProductPrice, removeItemFromCart } = useCart()
</script>

<template>
  <div class="flex items-center gap-4 mb-2 border-b py-4">
    <div class="w-24">
      <NuxtImg provider="s3Provider" :src="item.image" :alt="item.name" />
    </div>
    <div class="grow">
      <h3 class="font-semibold">
        {{ item.name }}
      </h3>
      <div v-if="item.sizes">
        <span v-for="size in item.sizes" :key="size.name" class="text-sm">
          Size: {{ size.name }} <br />
        </span>
      </div>
      <div v-if="item.extraIngredients">
        <div>
          <div
            v-for="extra in item.extraIngredients"
            :key="extra.name"
            class="text-slate-500 text-sm"
          >
            Extra {{ extra.name }} +${{ extra.extraPrice }} <br />
          </div>
        </div>
      </div>
    </div>
    <div class="text-lg font-semibold">${{ cartProductPrice(item) }}</div>
    <div class="ml-2" v-if="remove">
      <button type="button" @click="removeItemFromCart(item)">
        <Icon name="fa-solid:trash-alt" />
      </button>
    </div>
  </div>
</template>
