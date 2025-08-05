<script setup lang="ts">

withDefaults(
    defineProps<{
      cartItemImage?: string;
      cartItemFallbackCover?: string;
      fallback?: string;
      productUrl?: string;
      altText?: string;
    }>(),
    {
        cartItemImage: undefined,
        cartItemFallbackCover: undefined,
        fallback: 'mdi:image',
        productUrl: undefined,
        altText: 'Product image',
    },
);
</script>

<template>
    <CartItemElementImageInner
        v-bind="$props"
    />
</template>
