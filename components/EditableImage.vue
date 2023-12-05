<script setup lang="ts">
type ImageProps = {
  image?: string
}

const { image } = defineProps<ImageProps>()
const changeImage = ref('')
const isLoading = ref(false)

const emit = defineEmits()

async function handleFileChange(e: Event) {
  isLoading.value = true
  try {
    const files = (e.target as HTMLInputElement).files as FileList

    if (files && files.length > 0) {
      const fileData = new FormData()
      fileData.set('file', files[0])
      const res = await $fetch('/api/upload', {
        method: 'POST',
        body: fileData,
        'Content-Type': 'multipart/form-data',
      })

      if (res) {
        changeImage.value = res
        emit('imageUpload', changeImage.value)
      }
    }
  } catch (err: any) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="p-2 rounded-lg">
    <NuxtImg
      v-if="image"
      :src="image"
      provider="s3Provider"
      alt="avatar"
      class="rounded-lg h-28 w-28 mb-1"
    />

    <div v-else class="bg-slate-200 p-4 text-slate-500 rounded-md text-center">
      No image
    </div>

    <label>
      <input type="file" class="hidden" @change="handleFileChange" />
      <span
        class="block border mt-2 border-gray-300 rounded-lg p-2 text-center text-black cursor-pointer"
        >Edit</span
      >
    </label>
  </div>
</template>
