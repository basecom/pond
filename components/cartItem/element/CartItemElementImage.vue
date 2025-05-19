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

    <CartItemElementImageInner :cart-item-image="cartItemImage" :product-url="productUrl" />

</template>
