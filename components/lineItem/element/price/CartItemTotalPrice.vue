<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemTotalPriceInner from './CartItemTotalPriceInner.vue';
const props = withDefaults(
    defineProps<{
      cartItemTotalPrice?: string
    }>(),
    {
        cartItemTotalPrice: undefined,
    },
);
</script>
<template>
    <CartItemTotalPriceInner :cart-item-total-price="cartItemTotalPrice" />

</template>
