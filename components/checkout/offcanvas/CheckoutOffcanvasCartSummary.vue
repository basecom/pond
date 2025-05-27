<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import type {AcceptableValue} from 'reka-ui';

withDefaults(
    defineProps<{
      cart?: Schemas['Cart'];
      cartDeliveries?: Schemas['CartDelivery'][];
      shippingMethods?: Schemas['ShippingMethod'][];
      selectedShippingMethod?: Schemas['ShippingMethod'];
      shippingCost?: Schemas['CartDelivery'];
      subtotal?: number;
      isLoading?: {
        promo: boolean,
        select: boolean
      };
      isLoggedIn?: boolean
    }>(),
    {
        cart: undefined,
        cartDeliveries: undefined,
        shippingMethods: undefined,
        selectedShippingMethod: undefined,
        shippingCost: undefined,
        subtotal: undefined,
        isLoading: () => ({
            promo: false,
            select: false,
        }),
        isLoggedIn: false,
    },
);

const emits = defineEmits<{
  setSelectedShippingMethod: [shippingMethodId: AcceptableValue];
  addSelectedPromotionCode: [promotionCode: string];
}>();

const setSelectedShippingMethod = (shippingMethodId: AcceptableValue) => {
    emits('setSelectedShippingMethod', shippingMethodId);
};

const addSelectedPromotionCode = (promotionCode: string) => {
    emits('addSelectedPromotionCode', promotionCode);
};

</script>
<template>
    <CheckoutOffcanvasCartSummaryInner
        :cart="cart"
        :cart-deliveries="cartDeliveries"
        :shipping-methods="shippingMethods"
        :selected-shipping-method="selectedShippingMethod"
        :shipping-cost="shippingCost"
        :subtotal="subtotal"
        :is-loading="isLoading"
        :is-logged-in="isLoggedIn"
        @add-selected-promotion-code="(promotionCode: string) => addSelectedPromotionCode(promotionCode)"
        @set-selected-shipping-method="(shippingMethodId: AcceptableValue) => setSelectedShippingMethod(shippingMethodId)"
    />

</template>
