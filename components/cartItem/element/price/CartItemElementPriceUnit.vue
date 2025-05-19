<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemUnitPrice?: string
    }>(),
    {
        cartItemUnitPrice: undefined,
    },
);
</script>
<template>
    <CartItemElementPriceUnitInner :cart-item-unit-price="cartItemUnitPrice" />

</template>
