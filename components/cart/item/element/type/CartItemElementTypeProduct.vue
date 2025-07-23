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
      isLoggedIn?: boolean;
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
        itemOptions: undefined,
        quantity: 1,
        itemQuantity: 1,
        isInWishlist: false,
        isLoggedIn: false,
        isLoading: () => ({
            wishlist: false,
            container: false,
        }),
        productUrl: undefined,
    },
);

defineEmits<{
  'change-cart-item-quantity': [number],
  'remove-product-from-wishlist': [],
  'add-product-to-wishlist': [],
}>();
</script>

<template>
    <CartItemElementTypeProductInner
        v-bind="$props"
        @change-cart-item-quantity="(quantityInput: number) => $emit('change-cart-item-quantity', quantityInput)"
        @remove-product-from-wishlist="$emit('remove-product-from-wishlist')"
        @add-product-to-wishlist="$emit('add-product-to-wishlist')"
    />
</template>
