<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemRemoveInner from "./CartItemRemoveInner.vue";
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
  <CartItemRemoveInner :cart-item="cartItem"/>
</template>