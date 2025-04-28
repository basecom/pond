<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemGenericInner from './CartItemGenericInner.vue';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
    }>(),
    {
      cartItem: undefined,
    },
);
</script>
<template>
  <CartItemGenericInner :cart-item="cartItem" />

</template>
