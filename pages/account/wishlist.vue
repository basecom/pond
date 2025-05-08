<script setup lang="ts">
definePageMeta({
    layout: 'wishlist',
});

const { get } = useConfigStore();
const isWishlistEnabled = get('core.cart.wishlistEnabled');

if (!isWishlistEnabled) {
    throw createError({
        statusCode: '404',
    });
}
</script>

<template>
    <AccountWishlist />
</template>
