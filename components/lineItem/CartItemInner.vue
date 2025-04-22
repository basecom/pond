<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import CartItemImage from "./element/CartItemImage.vue";
import CartItemRemove from "./element/CartItemRemove.vue";
import CartItemQuantity from "./element/CartItemQuantity.vue";
import CartItemOptions from "./element/CartItemOptions.vue";

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
  itemOptions
} = useCartItem(cartItem);

</script>
<template>
  <div class="flex flex-wrap">
    <div class="flex-col flex order-1 w-[83.33333333%]">
      <div>
        <CartItemImage :cart-item-image="cartItem.cover.url"></CartItemImage>
      </div>
      <div>
        {{ cartItem.label }}
      </div>
      <div>
       <CartItemOptions :cart-item-options="itemOptions">

       </CartItemOptions>
      </div>
      <div>{{ cartItem.payload.productNumber }}</div>
      <div class="line-item-delivery-date">
        <template v-if="cartDeliveryPosition">
          {{ cartDeliveryPosition.deliveryDate.earliest }} - {{ cartDeliveryPosition.deliveryDate.latest }}
        </template>
      </div>
      <div>add-to-wishlist</div>
    </div>
    <div class="order-3"> <CartItemQuantity :cart-item="cartItem"></CartItemQuantity> </div>
    <div class="order-5 w-full">{{ cartItem.price.unitPrice }}</div>
    <div class="order-4 w-full">{{ cartItem.price.totalPrice }}</div>
    <div class="order-2 w-[16.66666667%]"><CartItemRemove :cart-item="cartItem"></CartItemRemove></div>
  </div>
</template>