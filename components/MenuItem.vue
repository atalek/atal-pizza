<script lang="ts" setup>
import { Types } from 'mongoose'
import type { MenuItemType, ExtraStuff } from '~/types'

const { menuItem } = defineProps({
  menuItem: {
    type: Object as PropType<MenuItemType>,
    required: true,
  },
})

const showPopup = ref(false)
const selectedSize = ref(menuItem?.sizes?.[0] || null)
const selectedExtras = ref<ExtraStuff[]>([])

function handleOpenPopup(itemId: Types.ObjectId) {
  showPopup.value = true
}

const { addItemToCart } = useCart()

function addItem(item: MenuItemType) {
  if (item!.sizes!.length > 0) {
    const newItem = {
      ...item,
      sizes: [selectedSize.value],
    }
    if (item!.extraIngredients!.length > 0 && selectedExtras.value) {
      newItem.extraIngredients = selectedExtras.value
    }

    addItemToCart(newItem as MenuItemType)
  } else {
    addItemToCart(item)
  }
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
          :src="menuItem.image"
          class="h-72 w-64 mx-auto"
          :alt="menuItem.name"
        />
        <h2 class="text-lg font-bold text-center mb-2">
          {{ menuItem.name }}
        </h2>
        <p class="text-center text-slate-500 text-sm mb-2">
          {{ menuItem.description }}
        </p>

        <div v-if="menuItem!.sizes!.length > 0">
          <div class="py-2">
            <h3 class="text-center text-slate-700">Pick your size</h3>
            <label
              v-for="size in menuItem.sizes"
              :key="size.name"
              class="flex items-center gap-2 p-4 border rounded-md mb-1"
            >
              <input
                type="radio"
                name="size"
                :checked="selectedSize === size"
                @change="selectedSize = size"
                class="p-4"
              />
              <span
                >{{ size.name }} ${{
                  menuItem.basePrice! + size.extraPrice
                }}</span
              >
            </label>
          </div>
        </div>

        <div v-if="menuItem!.extraIngredients!.length > 0">
          <div class="py-2">
            <h3 class="text-center text-slate-700">Pick your extras</h3>
            <label
              v-for="extraStuff in menuItem.extraIngredients"
              :key="extraStuff.name"
              class="flex items-center gap-2 p-4 border rounded-md mb-1"
            >
              <input
                type="checkbox"
                :id="'checkbox-' + extraStuff.name"
                :value="extraStuff"
                v-model="selectedExtras"
              />
              <span>{{ extraStuff.name }} + ${{ extraStuff.extraPrice }} </span>
            </label>
          </div>
        </div>

        <button
          class="primary sticky bottom-2"
          @click="addItem(menuItem), (showPopup = false)"
        >
          Add to cart
        </button>
        <button class="mt-2" @click="showPopup = false">Cancel</button>
      </div>
    </div>
  </div>

  <MenuItemTile
    :menuItem="menuItem"
    @openPopup="handleOpenPopup(menuItem._id!)"
  />
</template>
