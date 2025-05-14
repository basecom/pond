<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
      cartDeliveries?: Schemas['CartDelivery'][];
    }>(),
    {
      cartItems: undefined,
      cartDeliveries: undefined,
    },
);

const { cartDeliveries } = toRefs(props);
const hasLineItems = (cartItems?: Schemas['LineItem'][]) => cartItems && cartItems.length > 0;
const getCartDeliveryPositions = (cartDeliveries?: Schemas['CartDelivery'][]) => cartDeliveries?.find(() => true)?.positions;

const getCartDeliveryPosition = (id: string, cartDeliveryPositions?: Schemas['CartDeliveryPosition'][]) =>
    cartDeliveryPositions?.find(
        (cartDeliveryPosition) => cartDeliveryPosition.lineItem?.id === id,
    );
</script>
<template>
  <slot name="offcanvasContent">
  <div class="mb-4">
    <template v-if="hasLineItems(cartItems)">
      <template v-for="cartItem in cartItems">
        <slot name="cartItem">
          <CartItem
              :cart-item="cartItem"
              :cart-delivery-position="getCartDeliveryPosition(cartItem.id, getCartDeliveryPositions(cartDeliveries))"
          />
        </slot>
      </template>
    </template>

    <template v-else>
      <div class="w-full">
        <slot name="noLineItemsLabel">
          <UiAlert>
            <UiAlertDescription>{{ $t('checkout.noLineItems') }}</UiAlertDescription>
          </UiAlert>
        </slot>
      </div>
    </template>
  </div>
  <div>
    <slot name="cartSummary">
      <CheckoutOffcanvasCartSummary :cart-deliveries="cartDeliveries" />
    </slot>
  </div>
  <div class="flex w-full flex-col gap-1">
    <div class="w-full text-center">
      <slot name="proceedToCheckoutButton">
        <NuxtLinkLocale to="/checkout/confirm">
          <UiButton :class="'w-full'">{{ $t('checkout.proceedToCheckout') }}</UiButton>
        </NuxtLinkLocale>
      </slot>
    </div>
    <div class="w-full text-center">
      <slot name="proceedToCartButton">
        <NuxtLinkLocale to="/checkout/cart">
          <UiButton variant="link">{{ $t('checkout.proceedToCart') }}</UiButton>
        </NuxtLinkLocale>
      </slot>
    </div>
  </div>
  </slot>
</template>
