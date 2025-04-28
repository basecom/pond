<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemContainerInner from './CartItemContainerInner.vue';
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
  <CartItemContainerInner :cart-item="cartItem" />

</template>
