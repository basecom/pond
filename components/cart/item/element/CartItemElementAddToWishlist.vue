<script setup lang="ts">
withDefaults(
    defineProps<{
      isInWishlist?: boolean,
      isLoading?: boolean
    }>(),
    {
        isInWishlist: false,
        isLoading: false,
    },
);

const emits = defineEmits<{
  removeProductFromWishlist: [];
  addProductToWishlist: [];
}>();

const removeProductFromWishlist = () => {
    emits('removeProductFromWishlist');
};

const addProductToWishlist = () => {
    emits('addProductToWishlist');
};
</script>
<template>
    <CartItemElementAddToWishlistInner
        :is-in-wishlist="isInWishlist"
        :is-loading="isLoading"
        @remove-product-from-wishlist="removeProductFromWishlist"
        @add-product-to-wishlist="addProductToWishlist"
    />

</template>
