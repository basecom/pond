<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import CartItemAddToWishlist from '../CartItemAddToWishlist.vue';
import CartItemDeliveryPosition from '../CartItemDeliveryPosition.vue';
import CartItemImage from '../CartItemImage.vue';
import CartItemOptions from '../CartItemOptions.vue';
import CartItemUnitPrice from '../price/CartItemUnitPrice.vue';
import CartItemTotalPrice from '../price/CartItemTotalPrice.vue';
import CartItemQuantity from '../CartItemQuantity.vue';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition'],
      isLoading?: boolean
    }>(),
    {
      cartItem: undefined,
      cartDeliveryPosition: undefined,
      isLoading: false,
    },
);
const {cartItem, isLoading} = toRefs(props);
const {
  itemOptions,
} = useCartItem(cartItem);
const {getFormattedPrice} = usePrice();
const {
  itemTotalPrice,
  itemRegularPrice,
} = useCartItem(cartItem);
const configStore = useConfigStore();
const showDeliveryTime = configStore.get('core.cart.showDeliveryTime') as boolean;

const emits = defineEmits<{
  isLoading: [boolean]
}>();
</script>
<template>
  <slot name="wrapper">
    <div class="order-1 mb-4 flex w-5/6 flex-col">
      <div class="mb-2 w-auto">
        <slot name="cart-image">
          <CartItemImage :cart-item-image="cartItem.cover?.url" fallback="mdi:image"/>
        </slot>
      </div>
      <div class="font-bold">
        <slot name="labelWrapper">
          <NuxtLinkLocale to="/">
            <slot name="label">
              {{ cartItem.label }}
            </slot>
          </NuxtLinkLocale>
        </slot>
      </div>
      <div class="my-2 text-xs">
        <slot name="options">
          <CartItemOptions :cart-item-options="itemOptions"/>
        </slot>
      </div>
      <div class="mb-2 text-xs">
        <slot name="productNumber">
          {{ $t('checkout.cartItemInfoId') }}: {{ cartItem.payload.productNumber }}
        </slot>
      </div>
      <div class="text-xs" v-if="showDeliveryTime">
        <slot name="deliveryPosition">
          <CartItemDeliveryPosition :cart-item-delivery-position="cartDeliveryPosition"/>
        </slot>
      </div>
      <div class="mt-2 text-xs">
        <slot name="wishlist">
          <CartItemAddToWishlist :referenced-id="cartItem.referencedId"/>
        </slot>
      </div>
    </div>
  </slot>
  <slot name="quantity">
    <div class="order-3 mb-4 flex w-full items-center justify-between">
      <CartItemQuantity :cart-item="cartItem"
                        @is-loading="(isLoadingEmit: boolean) => {emits('isLoading', isLoadingEmit)}"/>
    </div>
  </slot>
  <slot name="unitPrice">
    <div class="order-5 flex w-full justify-end text-xs">
      <CartItemUnitPrice :cart-item-unit-price="getFormattedPrice(itemRegularPrice)"/>
    </div>
  </slot>
  <slot name="totalPrice">
    <div class="order-4 flex w-full justify-end">
      <CartItemTotalPrice :cart-item-total-price="getFormattedPrice(itemTotalPrice)"/>
    </div>
  </slot>
</template>
