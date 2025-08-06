<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
        cartItem: Schemas['LineItem'];
        isStackable?: boolean;
        itemQuantity?: number;
    }>(),
    {
        isStackable: false,
        itemQuantity: undefined,
    },
);

defineEmits<{
    'change-quantity': [quantity: number];
}>();
</script>

<template>
    <CheckoutLineItemQuantityInner v-if="isStackable" v-bind="$props" @change-quantity="quantity => $emit('change-quantity', quantity)" />
</template>
