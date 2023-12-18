<script lang="ts" setup>
import { Types } from 'mongoose'

type ExtraStuff = {
  name: string
  extraPrice: number
}

type MenuItemProps = {
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
const emit = defineEmits()

const hasExtras = computed(() => {
  return (
    (props.menuItem?.extraIngredients?.length ?? 0) > 0 ||
    (props.menuItem?.sizes?.length ?? 0) > 1
  )
})
</script>

<template>
  <div
    class="bg-slate-200 p-4 rounded-lg text-center hover:bg-slate-100 hover:shadow-md hover:shadow-black/25 transition-all"
  >
    <div class="text-center">
      <NuxtImg
        provider="s3Provider"
        :src="props.menuItem.image"
        class="max-h-auto max-h-24 block mx-auto"
        alt="pizza"
      />
    </div>
    <h4 class="font-semibold text-xl my-3">{{ props.menuItem.name }}</h4>
    <p class="text-slate-600 text-sm line-clamp-3">
      {{ props.menuItem.description }}
    </p>
    <button
      class="mt-4 bg-primary text-white rounded-full px-8 py-2"
      @click="$emit('openPopup', props.menuItem._id)"
    >
      {{
        hasExtras
          ? `Add to cart (from $${menuItem.basePrice})`
          : `Add to cart $${menuItem.basePrice}`
      }}
    </button>
  </div>
</template>
