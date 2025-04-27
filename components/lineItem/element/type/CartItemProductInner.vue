<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import CartItemAddToWishlist from '../CartItemAddToWishlist.vue';
import CartItemDeliveryPosition from '../CartItemDeliveryPosition.vue';
import CartItemImage from '../CartItemImage.vue';
import CartItemOptions from '../CartItemOptions.vue';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
        cartItem: undefined,
        cartDeliveryPosition: undefined,
    },
);
const { cartItem } = toRefs(props);
const {
    itemOptions,
} = useCartItem(cartItem);
</script>
<template>
    <div class="order-1 mb-4 flex w-5/6 flex-col">
        <div class="mb-2 w-auto">
            <CartItemImage :cart-item-image="cartItem.cover?.url" />
        </div>
        <div class="font-bold">
            <NuxtLinkLocale to="/">
                {{ cartItem.label }}
            </NuxtLinkLocale>
        </div>
        <div class="my-2 text-xs">
            <CartItemOptions :cart-item-options="itemOptions" />
        </div>
        <div class="mb-2 text-xs">
            {{ $t('checkout.cartItemInfoId') }}: {{ cartItem.payload.productNumber }}
        </div>
        <div class="text-xs">
            <CartItemDeliveryPosition :cart-item-delivery-position="cartDeliveryPosition" />
        </div>
        <div class="mt-2 text-xs">
            <CartItemAddToWishlist :referenced-id="cartItem.referencedId" />
        </div>
    </div>
</template>
