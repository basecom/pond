<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      cartItemTotalPrice?: string
    }>(),
    {
        cartItemTotalPrice: undefined,
    },
);
</script>
<template>
    <CartItemElementPriceTotalInner :cart-item-total-price="cartItemTotalPrice" />

</template>
