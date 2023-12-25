<script lang="ts" setup>
import { OrderType } from '~/types'
import formatDate from '~/utils/formatDate'

const { data: isAdmin } = await useIsAdmin()
const { data: orders, pending } = await useFetch<OrderType[]>('/api/orders')
</script>

<template>
  <section class="mt-8 max-w-2xl mx-auto">
    <UserTabs :isAdmin="isAdmin" />

    <Loader v-if="pending" />
    <div v-if="orders!.length > 0" class="mt-8">
      <div
        v-for="order in orders"
        :key="order._id.toString()"
        class="bg-slate-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6 overflow-x-auto"
      >
        <div class="grow flex flex-col md:flex-row items-center gap-6">
          <div>
            <div
              class="p-2 rounded-md text-white whitespace-nowrap w-[72px] text-center"
              :class="{
                'bg-green-500': order.isPaid,
                'bg-red-400': !order.isPaid,
              }"
            >
              {{ order.isPaid ? 'Paid' : 'Not paid' }}
            </div>
          </div>
          <div class="grow">
            <div class="flex gap-2 items-center mb-1">
              <div class="grow">{{ order.userEmail }}</div>
              <div class="text-gray-500 text-sm">
                {{ formatDate(order.createdAt) }}
              </div>
            </div>
            <div
              class="text-gray-500 text-xs"
              v-for="item in order.orderItems"
              :key="item._id.toString()"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="justify-end flex gap-2 items-center whitespace-nowrap">
          <NuxtLink :to="`/orders/${order._id}`" class="button"
            >View order</NuxtLink
          >
        </div>
      </div>
    </div>

    <div
      v-else
      class="bg-slate-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6 overflow-x-auto"
    >
      No orders yet...
    </div>
  </section>
</template>
