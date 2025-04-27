<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemUnitPriceInner from './CartItemUnitPriceInner.vue';
const props = withDefaults(
    defineProps<{
      cartItemUnitPrice?: string
    }>(),
    {
        cartItemUnitPrice: undefined,
    },
);
</script>
<template>
    <CartItemUnitPriceInner :cart-item-unit-price="cartItemUnitPrice" />

</template>
