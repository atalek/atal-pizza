<script lang="ts" setup>
type MenuItemProps = {
  name?: string
  addLabel: string
  props?: {
    name: string
    extraPrice: number
  }
  addExtra: () => void
}

const { props } = defineProps<MenuItemProps>()

const isOpen = ref(false)

const emit = defineEmits()
function removeExtra(index: number) {
  emit('removeExtra', index)
}
</script>

<template>
  <div class="bg-gray-200 p-2 rounded-md mb-2">
    <button
      @click="() => (isOpen = !isOpen)"
      class="inline-flex p-1 border-0 justify-start"
      type="button"
    >
      <Icon v-if="isOpen" name="fa-solid:chevron-up" />
      <Icon v-if="!isOpen" name="fa-solid:chevron-down" />
      <span>{{ name }} </span>
      <span>{{ props?.length > 0 ? props?.length : '' }}</span>
    </button>

    <div :class="{ block: isOpen, hidden: !isOpen }">
      <div
        class="flex items-end gap-2"
        v-if="props?.length > 0"
        v-for="(prop, index) in props"
        key="index"
      >
        <div>
          <label>Name </label>
          <input type="text" placeholder="Size name" v-model="prop.name" />
        </div>
        <div>
          <label>Extra price</label>
          <input
            type="text"
            placeholder="Extra price"
            v-model="prop.extraPrice"
          />
        </div>
        <div>
          <button
            type="button"
            class="bg-white mb-2 px-2"
            @click="removeExtra(index)"
          >
            <Icon name="fa-solid:trash-alt" />
          </button>
        </div>
      </div>

      <button type="button" class="bg-white items-center" @click="addExtra">
        <Icon name="fa-solid:plus" class="w-4 h-4" />
        <span>{{ addLabel }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
