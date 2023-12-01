<script lang="ts" setup>
import { toast } from 'vue3-toastify'

definePageMeta({
  middleware: 'guest',
})

const isLoading = ref(false)
const erorr = ref('')
const { data: session } = useAuth()

const userInfo = reactive({
  phoneNumber: '',
  streetAddress: '',
  postalCode: '',
  city: '',
  country: '',
})

const { data: user, pending, error, refresh } = await useFetch('/api/profile')

async function handleProfileInfoUpdate() {
  if (user?.value?.name.trim()) {
    isLoading.value = true
    try {
      const res = await $fetch('/api/profile', {
        method: 'PUT',
        body: { name: user?.value?.name, userInfo },
      })
      if (res) {
        refresh()
        toast.success('Profile info updated')
      }
    } catch (err: any) {
      error.value = err.data.message
    } finally {
      isLoading.value = false
    }
  } else {
    erorr.value = 'All fields are required'
  }
}

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
        refresh()
        toast.success('Profile picture updated')
      }
    }
  } catch (err: any) {
    erorr.value = err.data.message
  } finally {
    isLoading.value = false
  }
}
const isAdmin = true
const googleImg = computed(() => user?.value?.image.startsWith('https://lh3.'))
</script>

<template>
  <section class="mt-6">
    <UserTabs v-if="isAdmin" />
    <div class="max-w-md mx-auto">
      <div v-if="isLoading">
        <InfoBox>Saving...</InfoBox>
      </div>

      <h1
        v-if="!isAdmin"
        class="text-center text-primary font-semibold text-4xl mb-4"
      >
        Profile
      </h1>
      <div class="flex gap-4 mt-4">
        <div class="p-2 rounded-lg">
          <template v-if="!googleImg">
            <NuxtImg
              :src="user?.image"
              provider="s3Provider"
              alt="avatar"
              class="rounded-lg h-28 max-h-full max-w-[120px] mb-1"
            />
          </template>
          <template v-else>
            <NuxtImg
              :src="session?.user?.picture"
              alt="avatar"
              class="rounded-lg h-28 max-h-full max-w-[120px] mb-1"
            />
          </template>

          <label>
            <input type="file" class="hidden" @change="handleFileChange" />
            <span
              class="block border border-gray-300 rounded-lg p-2 text-center text-black cursor-pointer"
              >Edit</span
            >
          </label>
        </div>
        <form class="grow" @submit.prevent="handleProfileInfoUpdate">
          <label for="name"> First and last name</label>
          <input
            type="text"
            id="name"
            placeholder="first and last name"
            v-model="user!.name"
          />
          <label for="name"> Email</label>
          <input id="email" type="email" :value="user?.email" disabled />

          <label for="phone"> Phone number</label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            v-model="userInfo.phoneNumber"
          />

          <label for="street">Street address</label>
          <input
            id="street"
            type="text"
            placeholder="Street address"
            v-model="userInfo.streetAddress"
          />

          <div class="flex gap-2">
            <div>
              <label for="postal-code"> Postal code</label>
              <input
                id="postal-code"
                type="text"
                placeholder="Postal Code"
                v-model="userInfo.postalCode"
              />
            </div>

            <div>
              <label for="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="City"
                v-model="userInfo.city"
              />
            </div>
          </div>

          <label for="country">Country</label>
          <input
            id="country"
            type="text"
            placeholder="Country"
            v-model="userInfo.country"
          />

          <template v-if="isLoading">
            <button type="submit" :disabled="isLoading">
              Saving...<Icon name="svg-spinners:180-ring" class="h-5" />
            </button>
          </template>
          <template v-else>
            <button type="submit">Save</button>
          </template>
        </form>
      </div>

      <div v-if="error || erorr">
        <p class="text-center text-red-600">{{ error ? error : erorr }}</p>
      </div>
    </div>
  </section>
</template>
