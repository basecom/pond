<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props =
    defineProps<{
        cartItem: Schemas['LineItem'];
    }>();

console.log(props.cartItem);
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

console.log(itemOptions.value);
</script>

<template>
    <CheckoutLineItemInner
        :cart-item="reactiveCartItem"
        :item-options="itemOptions"
        :is-removable="isRemovable"
        @remove-item="() => removeItem()"
    />
</template>
