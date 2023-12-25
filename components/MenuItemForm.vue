<script lang="ts" setup>
import { CategoryOrOptional, ExtraStuff } from '~/types'

type ItemInfoProps = {
  categories?: CategoryOrOptional[] | null
  itemInfo: {
    image?: string
    name: string
    description: string
    basePrice: number
    sizes?: ExtraStuff[]
    category?: string
    extraIngredients?: ExtraStuff[]
  }
  onSubmit: () => void
}

const { itemInfo, onSubmit } = defineProps<ItemInfoProps>()
const sizes = ref(itemInfo?.sizes || [])
const extraIngredient = ref(itemInfo?.extraIngredients || [])

function addSizes() {
  sizes.value.push({ name: '', extraPrice: 0 })
}
function removeSizes(index: number) {
  sizes.value = sizes.value.filter((_, idx) => idx !== index)
}

function addExtraIngredient() {
  extraIngredient.value.push({ name: '', extraPrice: 0 })
}

function removeExtraIngredient(index: number) {
  extraIngredient.value = extraIngredient.value.filter(
    (_, idx) => idx !== index
  )
}

const handleImageUpload = (value: string) => {
  itemInfo.image = value
}
</script>

<template>
  <form class="mt-8 max-w-xl mx-auto" @submit.prevent="onSubmit">
    <div class="md:grid items-start gap-4 gridd">
      <div>
        <EditableImage
          :image="itemInfo.image"
          @imageUpload="handleImageUpload"
        />
      </div>

      <div class="grow">
        <label for="name">Item Name</label>
        <input type="text" id="name" v-model="itemInfo.name" />

        <label for="description"> Description</label>
        <input type="text" id="description" v-model="itemInfo.description" />
        <label for="category">Category</label>
        <select
          v-if="categories!.length > 0"
          name="category"
          id="category"
          v-model="itemInfo.category"
        >
          <option
            v-for="category in categories"
            :key="category?._id.toString()"
            :value="category?._id"
          >
            {{ category?.name }}
          </option>
        </select>
        <label for="base-price"> Base Price</label>
        <input type="text" id="base-price" v-model="itemInfo.basePrice" />

        <MenuItemPriceProps
          name="Sizes"
          addLabel="Add item size"
          :props="sizes"
          :addExtra="addSizes"
          @removeExtra="removeSizes"
        />
        <MenuItemPriceProps
          name="Extra ingredients"
          addLabel="Add ingredients prices"
          :props="extraIngredient"
          :addExtra="addExtraIngredient"
          @removeExtra="removeExtraIngredient"
        />
        <div class="pb-2">
          <button class="border border-primary" type="submit">Save</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.gridd {
  grid-template-columns: 0.3fr 0.7fr;
}
</style>
