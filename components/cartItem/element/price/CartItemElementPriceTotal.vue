<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemTotalPrice?: number;
    }>(),
    {
        cartItemTotalPrice: 0,
    },
);
</script>

<template>
    <CartItemElementPriceTotalInner v-bind="$props" />
</template>
