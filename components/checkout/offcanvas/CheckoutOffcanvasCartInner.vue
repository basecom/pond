<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import type {AcceptableValue} from 'reka-ui';

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
        promo: boolean,
        select: boolean
      };
      isLoggedIn?: boolean
    }>(),
    {
        isLoggedIn: false,
        cartItems: undefined,
        cartDeliveries: undefined,
        cart: undefined,
        shippingMethods: undefined,
        selectedShippingMethod: undefined,
        shippingCost: undefined,
        subtotal: undefined,
        isLoading: () => ({
            promo: false,
            select: false,
        }),
    },
);

const {cartDeliveries, cartItems} = toRefs(props);
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
    <slot name="offcanvas-content">
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
                <slot name="no-line-items-label">
                    <div class="w-full">
                        <UiAlert>
                            <UiAlertDescription>{{ $t('checkout.noLineItems') }}</UiAlertDescription>
                        </UiAlert>
                    </div>
                </slot>
            </template>
        </div>
        <slot name="cart-summary">
            <div>
                <CheckoutOffcanvasCartSummary
                    :cart="cart"
                    :is-logged-in="isLoggedIn"
                    :cart-deliveries="cartDeliveries"
                    :shipping-methods="shippingMethods"
                    :selected-shipping-method="selectedShippingMethod"
                    :shipping-cost="shippingCost"
                    :subtotal="subtotal"
                    :is-loading="isLoading"
                    @add-selected-promotion-code="(promotionCode: string) => addSelectedPromotionCode(promotionCode)"
                    @set-selected-shipping-method="(shippingMethodId: AcceptableValue) => setSelectedShippingMethod(shippingMethodId)"
                />
            </div>
        </slot>
        <div class="flex w-full flex-col gap-1">
            <div class="w-full text-center">
                <slot name="proceed-to-checkout-button">
                    <NuxtLinkLocale to="/checkout/confirm">
                        <UiButton :class="'w-full'">{{ $t('checkout.proceedToCheckout') }}</UiButton>
                    </NuxtLinkLocale>
                </slot>
            </div>
            <div class="w-full text-center">
                <slot name="proceed-to-cart-button">
                    <NuxtLinkLocale to="/checkout/cart">
                        <UiButton variant="link">{{ $t('checkout.proceedToCart') }}</UiButton>
                    </NuxtLinkLocale>
                </slot>
            </div>
        </div>
    </slot>
</template>
