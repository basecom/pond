<script setup lang="ts">

const customerStore = useCustomerStore();
const { orders } = storeToRefs(customerStore);
</script>

<template>
  <AccountPageOrderInner v-if="orders" :orders="orders" />
</template>
