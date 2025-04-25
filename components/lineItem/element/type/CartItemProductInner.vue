<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import CartItemAddToWishlist from "../CartItemAddToWishlist.vue";
import CartItemDeliveryPosition from "../CartItemDeliveryPosition.vue";
import CartItemImage from "../CartItemImage.vue";
import CartItemOptions from "../CartItemOptions.vue";

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
      cartItem: undefined,
      cartDeliveryPosition: undefined
    },
);
const { cartItem } = toRefs(props);
const {
  itemOptions,
} = useCartItem(cartItem);
</script>
<template>
  <div class="flex flex-col order-1 mb-4 w-5/6">
    <div class="w-auto mb-2">
      <CartItemImage :cart-item-image="cartItem.cover?.url" />
    </div>
    <div class="font-bold">
      <NuxtLinkLocale to="/">
        {{ cartItem.label }}
      </NuxtLinkLocale>
    </div>
    <div class="text-xs my-2">
      <CartItemOptions :cart-item-options="itemOptions" />
    </div>
    <div class="text-xs mb-2">
      {{$t('checkout.cartItemInfoId')}}: {{ cartItem.payload.productNumber }}
    </div>
    <div class="text-xs">
      <CartItemDeliveryPosition :cart-item-delivery-position="cartDeliveryPosition" />
    </div>
    <div class="text-xs mt-2">
      <CartItemAddToWishlist :referenced-id="cartItem.referencedId"/>
    </div>
  </div>
</template>