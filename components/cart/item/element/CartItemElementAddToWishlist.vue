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
  removeProductFromWishlist: [];
  addProductToWishlist: [];
}>();
</script>

<template>
    <CartItemElementAddToWishlistInner
        v-bind="$props"
        @remove-product-from-wishlist="$emit('removeProductFromWishlist')"
        @add-product-to-wishlist="$emit('addProductToWishlist')"
    />

</template>
