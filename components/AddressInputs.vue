<script lang="ts" setup>
type AddressInfo = {
  addressInfo: {
    phoneNumber?: number
    streetAddress?: string
    postalCode?: string
    city?: string
    country?: string
  }
  disabled?: boolean
}

const props = defineProps<AddressInfo>()
</script>

<template>
  <label for="phone"> Phone number</label>
  <input
    :disabled="props.disabled"
    id="phone"
    type="tel"
    placeholder="Phone Number"
    v-model="props.addressInfo.phoneNumber"
  />

  <label for="street">Street address</label>
  <input
    :disabled="props.disabled"
    id="street"
    type="text"
    placeholder="Street address"
    v-model="props.addressInfo.streetAddress"
  />

  <div class="flex gap-2">
    <div>
      <label for="postal-code"> Postal code</label>
      <input
        :disabled="props.disabled"
        id="postal-code"
        type="text"
        placeholder="Postal Code"
        v-model="props.addressInfo.postalCode"
      />
    </div>

    <div>
      <label for="city">City</label>
      <input
        :disabled="props.disabled"
        id="city"
        type="text"
        placeholder="City"
        v-model="props.addressInfo.city"
      />
    </div>
  </div>

  <label for="country">Country</label>
  <input
    :disabled="props.disabled"
    id="country"
    type="text"
    placeholder="Country"
    v-model="props.addressInfo.country"
  />
</template>

<style scoped></style>
