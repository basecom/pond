<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItem: Schemas['LineItem'];
      quantity?: number;
      itemQuantity?: number;
    }>(),
    {
        quantity: 1,
        itemQuantity: 1,
    },
);

defineEmits<{
  'change-cart-item-quantity': [number]
}>();
</script>

<template>
    <CartItemElementQuantityInner
        v-bind="props"
        @change-cart-item-quantity="$emit('change-cart-item-quantity', $event)"
    />
</template>
