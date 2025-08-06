<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    cartItem: Schemas['LineItem'];
}>();

const reactiveCartItem = toRef(props, 'cartItem');
const {
    itemOptions,
    removeItem,
    itemTotalPrice,
    itemQuantity,
    isPromotion,
    isRemovable,
    isStackable,
    changeItemQuantity,
} = useCartItem(reactiveCartItem);
</script>

<template>
    <CheckoutLineItemInner
        :cart-item="reactiveCartItem"
        :item-options="itemOptions"
        :is-removable="isRemovable"
        :is-stackable="isStackable"
        :item-quantity="itemQuantity"
        :item-total-price="itemTotalPrice"
        @remove-item="() => removeItem()"
        @change-quantity="quantity => changeItemQuantity(quantity)"
    />
</template>
