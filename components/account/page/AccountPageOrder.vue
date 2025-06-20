<script setup lang="ts">

import {onMounted} from "vue";

const {loadOrders, orders} = useCustomerOrders();

onMounted(async () => {
  await loadOrders();
  console.log('orders', orders);
})
</script>

<template>
  <AccountPageOrderInner v-if="orders" :orders="orders"  />
</template>
