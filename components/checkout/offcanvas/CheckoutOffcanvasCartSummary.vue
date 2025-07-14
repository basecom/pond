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
        promotion: boolean,
        select: boolean
      };
      isLoggedIn?: boolean;
    }>(),
    {
        cart: undefined,
        cartDeliveries: undefined,
        shippingMethods: undefined,
        selectedShippingMethod: undefined,
        shippingCost: undefined,
        subtotal: undefined,
        isLoading: () => ({
            promotion: false,
            select: false,
        }),
        isLoggedIn: false,
    },
);

const emits = defineEmits<{
  'set-selected-shipping-method': [shippingMethodId: AcceptableValue];
  'add-selected-promotion-code': [promotionCode: string];
}>();
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
        @add-selected-promotion-code="(promotionCode: string) => emits('add-selected-promotion-code', promotionCode)"
        @set-selected-shipping-method="(shippingMethodId: AcceptableValue) =>  emits('set-selected-shipping-method', shippingMethodId)"
    />
</template>
