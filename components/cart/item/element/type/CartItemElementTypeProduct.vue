<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
      cartDeliveryPosition?: Schemas['CartDeliveryPosition'],
      itemTotalPrice?: number,
      itemRegularPrice?: number,
      itemOptions?: Schemas['LineItem']['payload']['options'],
      quantity: number,
      itemQuantity: number,
      isInWishlist?: boolean,
      isLoading?: {
        wishlist: boolean,
        container: boolean
      }
      productUrl?: string

    }>(),
    {
        cartItem: undefined,
        cartDeliveryPosition: undefined,
        productUrl: undefined,
        itemTotalPrice: 0,
        itemRegularPrice: 0,
        itemOptions: undefined,
        isInWishlist: false,
        isLoading: () => ({
            wishlist: false,
            container: false,
        }),
    },
);

const emits = defineEmits<{
  isLoading: [boolean],
  changeCartItemQuantity: [number],
  removeProductFromWishlist: [],
  addProductToWishlist: [],
}>();


</script>
<template>

    <CartItemElementTypeProductInner
        :cart-item="cartItem"
        :cart-delivery-position="cartDeliveryPosition"
        :item-total-price="itemTotalPrice"
        :item-regular-price="itemRegularPrice"
        :item-options="itemOptions"
        :quantity="quantity"
        :item-quantity="itemQuantity"
        :is-loading="isLoading"
        :product-url="productUrl"
        :is-in-wishlist="isInWishlist"
        @is-loading="(isLoadingEmit: boolean) => {emits('isLoading', isLoadingEmit)}"
        @change-cart-item-quantity="(quantityInput: number) => emits('changeCartItemQuantity', quantityInput)"
        @remove-product-from-wishlist="emits('removeProductFromWishlist')"
        @add-product-to-wishlist="emits('addProductToWishlist')"
    />

</template>
