<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
withDefaults(
    defineProps<{
      cartItem: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition'];
      itemTotalPrice?: number;
      itemRegularPrice?: number;
      itemOptions?: Schemas['LineItem']['payload']['options'];
      quantity?: number;
      itemQuantity?: number;
      isInWishlist?: boolean;
      isLoading?: {
        wishlist: boolean,
        container: boolean
      };
      productUrl?: string;

    }>(),
    {
        cartDeliveryPosition: undefined,
        itemTotalPrice: 0,
        itemRegularPrice: 0,
        quantity: 0,
        itemQuantity: 0,
        itemOptions: undefined,
        isInWishlist: false,
        isLoading: () => ({
            wishlist: false,
            container: false,
        }),
        productUrl: undefined,
    },
);

defineEmits<{
  changeCartItemQuantity: [number],
  removeProductFromWishlist: [],
  addProductToWishlist: [],
}>();
</script>

<template>
    <CartItemElementTypeProductInner
        v-bind="$props"
        @change-cart-item-quantity="(quantityInput: number) => $emit('changeCartItemQuantity', quantityInput)"
        @remove-product-from-wishlist="$emit('removeProductFromWishlist')"
        @add-product-to-wishlist="$emit('addProductToWishlist')"
    />
</template>
