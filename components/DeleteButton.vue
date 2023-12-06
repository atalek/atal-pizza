<script lang="ts" setup>
import { Types } from 'mongoose'

const { label, _id, onDelete } = defineProps<{
  label: string
  _id: Types.ObjectId
  onDelete: (_id) => Promise<void>
}>()

const showConfirm = ref(false)
</script>

<template>
  <button type="button" @click="showConfirm = true">{{ label }}</button>
  <div
    class="fixed bg-black/80 inset-0 flex items-center h-full justify-center"
    v-if="showConfirm"
  >
    <div class="bg-white p-4 rounded-lg">
      <div>Are you sure you want to delete?</div>
      <div class="flex gap-2 mt-1">
        <button type="button" @click="showConfirm = false">Cancel</button>
        <button
          @click="onDelete(_id), (showConfirm = false)"
          type="button"
          class="primary"
        >
          Yes,&nbsp;delete!
        </button>
      </div>
    </div>
  </div>
</template>
