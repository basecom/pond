<script setup lang="ts">

withDefaults(
    defineProps<{
      cartItemImage?: string;
      cartItemFallbackCover?: string;
      fallback?: string;
      productUrl?: string;
    }>(),
    {
        cartItemImage: undefined,
        cartItemFallbackCover: undefined,
        fallback: 'mdi:image',
        productUrl: undefined,
    },
);
</script>

<template>
    <CartItemElementImageInner
        v-bind="$props"
    />
</template>
