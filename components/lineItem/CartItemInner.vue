<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import CartItemRemove from "./element/CartItemRemove.vue";
import CartItemQuantity from "./element/CartItemQuantity.vue";
import CartItemTotalPrice from "./element/price/CartItemTotalPrice.vue";
import CartItemUnitPrice from "./element/price/CartItemUnitPrice.vue";
import CartItemProduct from "./element/type/CartItemProduct.vue";

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
const { cartItem, cartDeliveryPosition } = toRefs(props);
const { getFormattedPrice } = usePrice();
const {
    itemTotalPrice,
    itemRegularPrice,
} = useCartItem(cartItem);

</script>
<template>
  <div class="flex flex-wrap py-4 border-b">
    <CartItemProduct :cart-item="cartItem" :cart-delivery-position="cartDeliveryPosition" />
    <div class="order-3 flex justify-between items-center mb-4 w-full"><CartItemQuantity :cart-item="cartItem" /></div>
    <div class="order-5 w-full flex justify-end text-xs"><CartItemUnitPrice :cart-item-unit-price="getFormattedPrice(itemRegularPrice)"/></div>
    <div class="order-4 w-full flex justify-end"><CartItemTotalPrice :cart-item-total-price="getFormattedPrice(itemTotalPrice)"/></div>
    <div class="order-2 w-1/6 flex justify-end"><CartItemRemove :cart-item="cartItem" /></div>
  </div>
</template>