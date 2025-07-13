<script setup lang="ts">
withDefaults(
    defineProps<{
      isInWishlist?: boolean;
      isLoading?: boolean;
    }>(),
    {
        isInWishlist: false,
        isLoading: false,
    },
);

defineEmits<{
  'remove-product-from-wishlist': [];
  'add-product-to-wishlist': [];
}>();
</script>

<template>
    <CartItemElementAddToWishlistInner
        v-bind="$props"
        @remove-product-from-wishlist="$emit('remove-product-from-wishlist')"
        @add-product-to-wishlist="$emit('add-product-to-wishlist')"
    />

</template>
