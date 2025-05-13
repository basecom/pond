<script setup lang="ts">
const props = withDefaults(
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
