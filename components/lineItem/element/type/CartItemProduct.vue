<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemProductInner from "./CartItemProductInner.vue";
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
  <CartItemProductInner :cart-item="cartItem" :cart-delivery-position="cartDeliveryPosition"/>

</template>