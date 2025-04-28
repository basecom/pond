<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import CartItemImage from '../CartItemImage.vue';
import CartItemTotalPrice from '../price/CartItemTotalPrice.vue';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
    }>(),
    {
        cartItem: undefined,
    },
);
const { cartItem } = toRefs(props);
const { getFormattedPrice } = usePrice();
const {
    itemTotalPrice,
    itemRegularPrice,
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
    </div>
    <div class="order-4 flex w-full justify-end"><CartItemTotalPrice :cart-item-total-price="getFormattedPrice(itemTotalPrice)" /></div>
</template>
