<script lang="ts" setup>
import { Types } from 'mongoose'
import { MenuItem } from 'types'

type ExtraStuff = {
  name: string
  extraPrice: number
}

export type MenuItemProps = {
  menuItem: {
    _id: Types.ObjectId
    image: string
    name: string
    description: string
    category: string
    basePrice: number
    sizes?: ExtraStuff[]
    extraIngredients?: ExtraStuff[]
  }
}

const props = defineProps<MenuItemProps>()
const showPopup = ref(false)
const selectedSize = ref(props.menuItem?.sizes?.[0] || null)
const selectedExtras = ref<ExtraStuff>()

function handleOpenPopup(itemId: Types.ObjectId) {
  showPopup.value = true
}

const { cartItems, addItemToCart } = useCart()

function addItem(item: MenuItem) {
  console.log(selectedExtras.value)
}
</script>

<template>
  <div
    v-if="showPopup"
    @click="showPopup = false"
    class="fixed inset-0 bg-black/80 flex items-center justify-center"
  >
    <div
      @click="e => e.stopPropagation()"
      class="my-8 bg-white p-2 rounded-lg max-w-md"
    >
      <div
        class="overflow-y-scroll p-2"
        style="max-height: calc(100vh - 100px)"
      >
        <NuxtImg
          provider="s3Provider"
          :src="props.menuItem.image"
          class="h-72 w-64 mx-auto"
          :alt="props.menuItem.name"
        />
        <h2 class="text-lg font-bold text-center mb-2">
          {{ props.menuItem.name }}
        </h2>
        <p class="text-center text-slate-500 text-sm mb-2">
          {{ props.menuItem.description }}
        </p>

        <div class="py-2" v-if="props?.menuItem?.sizes.length > 0">
          <h3 class="text-center text-slate-700">Pick your size</h3>
          <label
            v-for="size in props.menuItem.sizes"
            :key="size.name"
            class="flex items-center gap-2 p-4 border rounded-md mb-1"
          >
            <input
              type="radio"
              name="size"
              :checked="selectedSize === size"
              @click="selectedSize = size"
              class="p-4"
            />
            <span
              >{{ size.name }} ${{
                props.menuItem.basePrice + size.extraPrice
              }}</span
            >
          </label>
        </div>
        <div class="py-2" v-if="props?.menuItem?.extraIngredients.length > 0">
          <h3 class="text-center text-slate-700">Pick your size</h3>
          <label
            v-for="extraStuff in props.menuItem.extraIngredients"
            :key="extraStuff.name"
            class="flex items-center gap-2 p-4 border rounded-md mb-1"
          >
            <input
              type="checkbox"
              :id="'checkbox-' + extraStuff.name"
              :value="extraStuff"
              v-model="selectedExtras"
            />
            <span
              >{{ extraStuff.name }} ${{
                props.menuItem.basePrice + extraStuff.extraPrice
              }}
              {{ selectedExtras }}
            </span>
          </label>
        </div>
        <button
          class="primary sticky bottom-2"
          @click="addItem(props.menuItem), (showPopup = false)"
        >
          Add to cart
        </button>
        <button class="mt-2" @click="showPopup = false">Cancel</button>
      </div>
    </div>
  </div>

  <MenuItemTile
    :menuItem="props.menuItem"
    @openPopup="handleOpenPopup(props.menuItem._id)"
  />
</template>
