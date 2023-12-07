<script lang="ts" setup>
type UserInfoProps = {
  userInfo: {
    name: string
    image: string
    email: string
    phoneNumber: string
    streetAddress: string
    postalCode: string
    city: string
    country: string
    admin: boolean
  }

  isLoading: boolean
  isAdmin?: boolean
  onSubmit: () => Promise<void>
}

const { userInfo, isLoading } = defineProps<UserInfoProps>()

const handleImageUpload = (value: string) => {
  userInfo.image = value
}
</script>

<template>
  <div class="flex gap-4 mt-4">
    <!-- <div class="p-2 rounded-lg">
      <NuxtImg
        v-if="googleImg"
        :src="data?.user?.image"
        provider="s3Provider"
        alt="avatar"
        class="rounded-lg h-28 max-h-full max-w-[120px] mb-1"
      />

      <NuxtImg
        v-else
        :src="session?.user?.picture"
        alt="avatar"
        class="rounded-lg h-28 max-h-full max-w-[120px] mb-1"
      />

      <label>
        <input type="file" class="hidden" @change="handleFileChange" />
        <span
          class="block border border-gray-300 rounded-lg p-2 text-center text-black cursor-pointer"
          >Edit</span
        >
      </label>

    </div> -->

    <EditableImage :image="userInfo.image" @imageUpload="handleImageUpload" />
    <form class="grow" @submit.prevent="onSubmit" v-if="userInfo">
      <label for="name"> First and last name</label>
      <input
        type="text"
        id="name"
        placeholder="first and last name"
        v-model="userInfo.name"
      />
      <label for="name"> Email</label>
      <input id="email" type="email" :value="userInfo.email" disabled />

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
      <label
        v-if="isAdmin"
        for="admin"
        class="p-2 inline-flex items-center gap-2 mb-2"
        >Admin
        <input id="admin" type="checkbox" v-model="userInfo.admin" />
      </label>
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
</template>

<style scoped></style>
