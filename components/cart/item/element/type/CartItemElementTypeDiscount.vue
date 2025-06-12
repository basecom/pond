<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const props = defineProps<{
      cartItem: Schemas['LineItem']; }>();
const {cartItem} = toRefs(props);
const {
    itemTotalPrice,
} = useCartItem(cartItem);
</script>
<template>
    <CartItemElementTypeDiscountInner :cart-item="cartItem" :item-total-price="itemTotalPrice" />
</template>
