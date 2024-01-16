<script setup lang="ts">
type ImageProps = {
  image?: string
}

const { image } = defineProps<ImageProps>()
const changeImage = ref('')
const isLoading = ref(false)
const profilePic = ref(image || '')
const error = ref('')

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
    error.value = err.data.message
  } finally {
    isLoading.value = false
  }
}

const isGoogleImage = computed(() => {
  const googleImagePrefixes = ['https://lh3.google', 'https://www.google']
  return googleImagePrefixes.some(prefix => profilePic.value.startsWith(prefix))
})
</script>

<template>
  <div class="p-2 rounded-lg max-w-[140px]">
    <div
      v-if="image === ''"
      class="bg-slate-200 p-4 text-slate-500 rounded-md text-center">
      No image
    </div>
    <div v-if="image">
      <div v-if="isGoogleImage">
        <img :src="image" alt="avatar" class="rounded-lg h-32 w-full mb-1" />
      </div>
      <div v-else>
        <NuxtImg
          :src="image"
          provider="s3Provider"
          alt="avatar"
          class="rounded-lg h-32 w-full mb-1" />
      </div>
    </div>

    <label>
      <input type="file" class="hidden" @change="handleFileChange" />
      <span
        class="block border mt-2 border-gray-300 rounded-lg p-2 text-center text-black cursor-pointer"
        >Change image</span
      >
    </label>
    <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
  </div>
</template>
