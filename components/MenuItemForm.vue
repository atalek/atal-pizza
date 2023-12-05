<script lang="ts" setup>
type ItemInfoProps = {
  itemInfo: {
    image: string
    name: string
    description: string
    basePrice: number
  }
  onSubmit: () => void
}
type Sizes = {
  name: string
  price: number
}
const { itemInfo, onSubmit } = defineProps<ItemInfoProps>()
const sizes = ref<Sizes[]>([])

function addSize() {
  sizes.value = sizes.value.push({ name: '', price: 0 })
}

const handleImageUpload = (value: string) => {
  itemInfo.image = value
}
</script>

<template>
  <form class="mt-8 max-w-md mx-auto" @submit.prevent="onSubmit">
    <div class="grid items-start gap-4 gridd">
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

        <label for="base-price"> Base Price</label>
        <input type="text" id="base-price" v-model="itemInfo.basePrice" />
        <div class="bg-slate-200 p-2 rounded-md mb-2">
          <label for="sizes">Sizes</label>
          <div v-if="sizes.length" v-for="size in sizes">
            <input type="text" placeholder="Size name" />
            <input type="number" placeholder="Extra price" />
          </div>
          <button @click="addSize" type="button" class="bg-white">
            Add size(medium or large)
          </button>
        </div>
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
