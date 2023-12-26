<script lang="ts" setup>
import type { MenuItemType } from '~/types'

const { menuItem } = defineProps({
  menuItem: { type: Object as PropType<MenuItemType>, required: true },
})
const emit = defineEmits()

const hasExtras = computed(() => {
  return (
    (menuItem?.extraIngredients?.length ?? 0) > 0 ||
    (menuItem?.sizes?.length ?? 0) > 1
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
        :src="menuItem.image"
        class="block mx-auto"
        alt="pizza"
      />
    </div>
    <h4 class="font-semibold text-xl my-3">{{ menuItem.name }}</h4>
    <p class="text-slate-600 text-sm line-clamp-3">
      {{ menuItem.description }}
    </p>
    <button
      class="mt-4 bg-primary text-white rounded-full px-8 py-2"
      @click="$emit('openPopup', menuItem._id)"
    >
      {{
        hasExtras
          ? `Add to cart (from $${menuItem.basePrice})`
          : `Add to cart $${menuItem.basePrice}`
      }}
    </button>
  </div>
</template>
