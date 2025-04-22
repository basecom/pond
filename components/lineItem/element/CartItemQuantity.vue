<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemQuantityInner from "./CartItemQuantityInner.vue";
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas["LineItem"]
    }>(),
    {
      cartItem: undefined
    },
);
</script>
<template>
  <CartItemQuantityInner :cart-item="cartItem"/>
</template>