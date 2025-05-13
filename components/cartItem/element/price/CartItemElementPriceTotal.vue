<script setup lang="ts">
withDefaults(
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
