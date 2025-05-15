<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import type {AcceptableValue} from "reka-ui";

const props = withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
      cartDeliveries?: Schemas['CartDelivery'][];
      cart?: Schemas['Cart'];
      shippingMethods?: Schemas['ShippingMethod'][];
      selectedShippingMethod?: Schemas['ShippingMethod'];
      shippingCost?: Schemas['CartDelivery'];
      subtotal?: Number;
      isLoading: {
        promo: boolean,
        select: boolean
      };
    }>(),
    {
      cartItems: undefined,
      cartDeliveries: undefined,
      cart: undefined,
      cartDeliveries: undefined,
      shippingMethods: undefined,
      selectedShippingMethod: undefined,
      shippingCost: undefined,
      subtotal: undefined,
      isLoading: () => ({
        promo: false,
        select: false
      })
    },
);


const {cartDeliveries} = toRefs(props);
const hasLineItems = (cartItems?: Schemas['LineItem'][]) => cartItems && cartItems.length > 0;
const getCartDeliveryPositions = (cartDeliveries?: Schemas['CartDelivery'][]) => cartDeliveries?.find(() => true)?.positions;

const getCartDeliveryPosition = (id: string, cartDeliveryPositions?: Schemas['CartDeliveryPosition'][]) =>
    cartDeliveryPositions?.find(
        (cartDeliveryPosition) => cartDeliveryPosition.lineItem?.id === id,
    );

const emits = defineEmits<{
  setSelectedShippingMethod: [shippingMethodId: AcceptableValue];
  addSelectedPromotionCode: [promotionCode: string];
}>();

const setSelectedShippingMethod = async (shippingMethodId: AcceptableValue) => {
  emits('setSelectedShippingMethod', shippingMethodId);
};

const addSelectedPromotionCode = async (promotionCode: string) => {
  emits('addSelectedPromotionCode', promotionCode);
};

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
        <CheckoutOffcanvasCartSummary
                                      :cart="cart"
                                      :cart-deliveries="cartDeliveries"
                                      :shipping-methods="shippingMethods"
                                      :selected-shipping-method="selectedShippingMethod"
                                      :shipping-cost="shippingCost"
                                      :subtotal="subtotal"
                                      :is-loading="isLoading"
                                      @add-selected-promotion-code="(promotionCode: string) => addSelectedPromotionCode(promotionCode)"
                                      @set-selected-shipping-method="(shippingMethodId: AcceptableValue) => setSelectedShippingMethod(shippingMethodId)"
        />
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
