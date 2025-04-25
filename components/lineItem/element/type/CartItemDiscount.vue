<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemDiscountInner from "./CartItemDiscountInner.vue";
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
      cartItem: undefined,
      cartDeliveryPosition: undefined
    },
);
</script>
<template>
  <CartItemDiscountInner />

</template>