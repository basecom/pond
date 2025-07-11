<script setup lang="ts">

withDefaults(
    defineProps<{
      cartItemImage?: string,
      fallback?: string,
      productUrl?: string
    }>(),
    {
        cartItemImage: undefined,
        fallback: 'mdi:duck',
        productUrl: undefined,
    },
);
</script>
<template>

    <CartItemElementImageInner
        v-bind="$props"
    />

</template>
