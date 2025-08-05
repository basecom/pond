<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemUnitPrice?: number;
    }>(),
    {
        cartItemUnitPrice: 0,
    },
);
</script>

<template>
    <CartItemElementPriceUnitInner v-bind="$props" />
</template>
