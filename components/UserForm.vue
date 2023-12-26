<script lang="ts" setup>
import type { UserDataType } from '~/types'

const { userInfo } = defineProps({
  userInfo: { type: Object as PropType<UserDataType>, required: true },
  isLoading: { type: Boolean as PropType<boolean>, required: true },
  isAdmin: { type: Boolean as PropType<boolean | null>, required: false },
  onSubmit: { type: Function as PropType<(payload: Event) => void> },
})

const handleImageUpload = (value: string) => {
  userInfo.image = value
}
</script>

<template>
  <div class="md:flex gap-4 mt-4">
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

      <AddressInputs :addressInfo="userInfo" />

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
