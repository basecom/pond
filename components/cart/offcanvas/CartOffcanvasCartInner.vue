<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { AcceptableValue } from 'reka-ui';

const props = withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
      cartDeliveries?: Schemas['CartDelivery'][];
      cart?: Schemas['Cart'];
      shippingMethods?: Schemas['ShippingMethod'][];
      selectedShippingMethod?: Schemas['ShippingMethod'];
      shippingCost?: Schemas['CartDelivery'];
      subtotal?: number;
      isLoading?: {
        promotion: boolean,
        select: boolean
      };
      isLoggedIn?: boolean
    }>(),
    {
        cartItems: undefined,
        cartDeliveries: undefined,
        cart: undefined,
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
const { cartDeliveries, cartItems } = toRefs(props);

const emits = defineEmits<{
  'set-selected-shipping-method': [shippingMethodId: AcceptableValue];
  'add-selected-promotion-code': [promotionCode: string];
}>();

const { getStyle } = usePondStyle();

const hasLineItems = (items?: Schemas['LineItem'][]): boolean => !!items && items.length > 0;

const getCartDeliveryPositions = (deliveries?: Schemas['CartDelivery'][]): Schemas['CartDeliveryPosition'][] | undefined => {
    if (!deliveries || deliveries.length === 0) return undefined;
    return deliveries[0]?.positions;
};

const getCartDeliveryPosition = (id: string, cartDeliveryPositions?: Schemas['CartDeliveryPosition'][]): Schemas['CartDeliveryPosition'] | undefined => {
    if (!id || !cartDeliveryPositions) return undefined;
    return cartDeliveryPositions.find(
        (cartDeliveryPosition) => cartDeliveryPosition.lineItem?.id === id,
    );
};
</script>

<template>
    <slot name="offcanvas-content">
        <div :class="getStyle('cart.wrapper')">
            <template v-if="hasLineItems(cartItems)">
                <template v-for="cartItem in cartItems">
                    <slot name="cartItem">
                        <CartItem
                            :cart-item="cartItem"
                            :cart-delivery-position="getCartDeliveryPosition(cartItem.id, getCartDeliveryPositions(cartDeliveries))"
                            :is-logged-in="isLoggedIn"
                        />
                    </slot>
                </template>
            </template>

            <template v-else>
                <slot name="no-line-items-label">
                    <div :class="getStyle('cart.noLineItemsLabel')">
                        <UiAlert>
                            <UiAlertDescription>{{ $t('checkout.noLineItems') }}</UiAlertDescription>
                        </UiAlert>
                    </div>
                </slot>
            </template>
        </div>
        <slot name="cart-summary">
            <div v-if="hasLineItems(cartItems)">
                <CheckoutOffcanvasCartSummary
                    :cart="cart"
                    :cart-deliveries="cartDeliveries"
                    :shipping-methods="shippingMethods"
                    :selected-shipping-method="selectedShippingMethod"
                    :shipping-cost="shippingCost"
                    :subtotal="subtotal"
                    :is-loading="isLoading"
                    @add-selected-promotion-code="(promotionCode: string) => emits('add-selected-promotion-code', promotionCode)"
                    @set-selected-shipping-method="(shippingMethodId: AcceptableValue) => emits('set-selected-shipping-method', shippingMethodId)"
                />
            </div>
        </slot>
        <div :class="getStyle('cart.buttonGroup')">
            <div :class="getStyle('cart.buttonWrapper')">
                <slot name="proceed-to-checkout-button">
                    <NuxtLinkLocale to="/checkout/confirm">
                        <UiButton :class="getStyle('cart.proceedToCheckoutButton')">{{ $t('checkout.proceedToCheckout') }}</UiButton>
                    </NuxtLinkLocale>
                </slot>
            </div>
            <div :class="getStyle('cart.buttonWrapper')">
                <slot name="proceed-to-cart-button">
                    <NuxtLinkLocale to="/checkout/cart">
                        <UiButton variant="link">{{ $t('checkout.proceedToCart') }}</UiButton>
                    </NuxtLinkLocale>
                </slot>
            </div>
        </div>
    </slot>
</template>
