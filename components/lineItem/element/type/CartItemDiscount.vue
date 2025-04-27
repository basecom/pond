<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemDiscountInner from './CartItemDiscountInner.vue';
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
    <CartItemDiscountInner :cart-item="cartItem" />

</template>
