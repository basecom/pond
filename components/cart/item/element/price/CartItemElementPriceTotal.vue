<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemTotalPrice?: string;
    }>(),
    {
        cartItemTotalPrice: '',
    },
);
</script>

<template>
    <CartItemElementPriceTotalInner v-bind="$props" />
</template>
