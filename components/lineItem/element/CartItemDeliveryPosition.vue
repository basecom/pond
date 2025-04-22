<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemDeliveryPositionInner from "./CartItemDeliveryPositionInner.vue";
const props = withDefaults(
    defineProps<{
      cartItemDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
      cartItemDeliveryPosition: undefined
    },
);
</script>
<template>
  <CartItemDeliveryPositionInner :cart-item-delivery-position="cartItemDeliveryPosition"/>

</template>