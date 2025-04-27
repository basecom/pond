<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemImageInner from './CartItemImageInner.vue';
const props = withDefaults(
    defineProps<{
      cartItemImage?: string,
      fallback?: string
    }>(),
    {
        cartItemImage: undefined,
        fallback: 'mdi:duck'
    },
);
</script>
<template>
    <CartItemImageInner :cart-item-image="cartItemImage" />

</template>
