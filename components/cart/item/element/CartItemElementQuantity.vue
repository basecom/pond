<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
      quantity?: number,
      itemQuantity?: number
    }>(),
    {
        cartItem: undefined,
        quantity: 1,
        itemQuantity: 1,
    },
);

const emits = defineEmits<{
  changeCartItemQuantity: [number]
}>();
</script>

<template>
    <CartItemElementQuantityInner
        v-bind="props"
        @change-cart-item-quantity="emits('changeCartItemQuantity', $event)"
    />
</template>
