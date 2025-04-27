<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemImageInner from './CartItemImageInner.vue';
const props = withDefaults(
    defineProps<{
      cartItemImage?: string
    }>(),
    {
        cartItemImage: undefined,
    },
);
</script>
<template>
    <CartItemImageInner :cart-item-image="cartItemImage" />

</template>
