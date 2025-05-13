<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
    }>(),
    {
        cartItem: undefined,
    },
);
</script>
<template>
    <CartItemElementTypeDiscountInner :cart-item="cartItem" />
</template>
