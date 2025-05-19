<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
    }>(),
    {
        cartItem: undefined,
    },
);
const {cartItem} = toRefs(props);
const {
    itemTotalPrice,
} = useCartItem(cartItem);
</script>
<template>
    <CartItemElementTypeDiscountInner :cart-item="cartItem" :item-total-price="itemTotalPrice" />
</template>
