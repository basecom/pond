<script setup lang="ts">
import {toast} from '../../ui/toast';
import {ApiClientError} from '@shopware/api-client';

const props = withDefaults(
    defineProps<{
      isInWishlist: boolean,
      isLoading: boolean
    }>(),
    {
    },
);
const { t } = useI18n();

const emits = defineEmits<{
  removeProductFromWishlist: [];
  addProductToWishlist: [];
}>();

const removeProductFromWishlist = async () => {
  emits('removeProductFromWishlist');
};

const addProductToWishlist= async () => {
  emits('addProductToWishlist');
};
</script>
<template>
    <CartItemElementAddToWishlistInner :is-in-wishlist="isInWishlist"
                                       :is-loading="isLoading"
                                       @remove-product-from-wishlist="removeProductFromWishlist"
                                       @add-product-to-wishlist="addProductToWishlist"
    />

</template>
