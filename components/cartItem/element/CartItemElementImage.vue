<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      cartItemImage?: string,
      fallback?: string
    }>(),
    {
        cartItemImage: undefined,
        fallback: 'mdi:duck',
    },
);
</script>
<template>
    <CartItemElementImageInner :cart-item-image="cartItemImage" />

</template>
