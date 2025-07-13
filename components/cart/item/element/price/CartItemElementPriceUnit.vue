<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemUnitPrice?: string;
    }>(),
    {
        cartItemUnitPrice: undefined,
    },
);
</script>

<template>
    <CartItemElementPriceUnitInner v-bind="$props" />
</template>
