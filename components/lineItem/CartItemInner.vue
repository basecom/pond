<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import CartItemImage from "./element/CartItemImage.vue";
import CartItemRemove from "./element/CartItemRemove.vue";
import CartItemQuantity from "./element/CartItemQuantity.vue";
import CartItemOptions from "./element/CartItemOptions.vue";
import CartItemDeliveryPosition from "./element/CartItemDeliveryPosition.vue";
import CartItemTotalPrice from "./element/price/CartItemTotalPrice.vue";
import CartItemUnitPrice from "./element/price/CartItemUnitPrice.vue";
import CartItemAddToWishlist from "./element/CartItemAddToWishlist.vue";

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
const { getFormattedPrice } = usePrice();
const {
  itemOptions,
    itemTotalPrice,
    itemRegularPrice,
} = useCartItem(cartItem);

</script>
<template>
  <div class="flex flex-wrap py-4 border-b ">
    <div class="flex-col flex order-1 w-[83.33333333%]">
      <div class="w-fit">
        <CartItemImage :cart-item-image="cartItem.cover.url" />
      </div>
      <div>
        {{ cartItem.label }}
      </div>
      <div>
       <CartItemOptions :cart-item-options="itemOptions" />
      </div>
      <div>{{ cartItem.payload.productNumber }}</div>
      <div>
        <template v-if="cartDeliveryPosition">
          <CartItemDeliveryPosition :cart-item-delivery-position="cartDeliveryPosition" />
        </template>
      </div>
      <div>
        <CartItemAddToWishlist :referenced-id="cartItem.referencedId"/>
      </div>
    </div>
    <div class="order-3 flex justify-between items-center mb-4 w-full"><CartItemQuantity :cart-item="cartItem" /></div>
    <div class="order-5 w-full flex justify-end"><CartItemUnitPrice :cart-item-unit-price="getFormattedPrice(itemRegularPrice)"/></div>
    <div class="order-4 w-full flex justify-end"><CartItemTotalPrice :cart-item-total-price="getFormattedPrice(itemTotalPrice)"/></div>
    <div class="order-2 w-[16.66666667%] flex justify-end"><CartItemRemove :cart-item="cartItem" /></div>
  </div>
</template>