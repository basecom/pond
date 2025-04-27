<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import CartItemRemove from './element/CartItemRemove.vue';
import CartItemQuantity from './element/CartItemQuantity.vue';
import CartItemTotalPrice from './element/price/CartItemTotalPrice.vue';
import CartItemUnitPrice from './element/price/CartItemUnitPrice.vue';
import CartItemProduct from './element/type/CartItemProduct.vue';

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
const { cartItem, cartDeliveryPosition } = toRefs(props);
const { getFormattedPrice } = usePrice();
const {
    itemTotalPrice,
    itemRegularPrice,
} = useCartItem(cartItem);

</script>
<template>
    <div class="flex flex-wrap border-b py-4">
        <CartItemProduct :cart-item="cartItem" :cart-delivery-position="cartDeliveryPosition" />
        <div class="order-3 mb-4 flex w-full items-center justify-between"><CartItemQuantity :cart-item="cartItem" /></div>
        <div class="order-5 flex w-full justify-end text-xs"><CartItemUnitPrice :cart-item-unit-price="getFormattedPrice(itemRegularPrice)" /></div>
        <div class="order-4 flex w-full justify-end"><CartItemTotalPrice :cart-item-total-price="getFormattedPrice(itemTotalPrice)" /></div>
        <div class="order-2 flex w-1/6 justify-end"><CartItemRemove :cart-item="cartItem" /></div>
    </div>
</template>
