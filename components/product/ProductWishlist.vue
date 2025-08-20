<script setup lang="ts">
const props = defineProps<{
    productId: string;
}>();

const { isInWishlist, addToWishlist, removeFromWishlist } = useProductWishlist(props.productId);
</script>

<template>
    <ProductWishlistInner
        :is-in-wishlist="isInWishlist"
        @add-to-wishlist="addToWishlist"
        @remove-from-wishlist="removeFromWishlist"
    />
</template>
