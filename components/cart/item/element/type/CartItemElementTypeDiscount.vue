<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
withDefaults(
    defineProps<{
      cartItem: Schemas['LineItem'];
      itemTotalPrice?: number;
    }>(),
    {
        itemTotalPrice: 0,
    },
);
</script>

<template>
    <CartItemElementTypeDiscountInner 
        v-bind="$props"
    />
</template>
