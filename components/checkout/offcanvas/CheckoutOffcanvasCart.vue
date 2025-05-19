<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {toast} from '../../ui/toast';
import {ApiClientError} from '@shopware/api-client';
import type {AcceptableValue} from 'reka-ui';

withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
      cartDeliveries?: Schemas['CartDelivery'][];
    }>(),
    {
        cartItems: undefined,
        cartDeliveries: undefined,
    },
);

const {t} = useI18n();
const {subtotal, shippingCosts, addPromotionCode, cart, refreshCart} = useCart();
const {isLoggedIn} = useUser();
const {getShippingMethods, setShippingMethod, selectedShippingMethod} = useCheckout();

const isLoading = ref({
    promo: false,
    select: false,
});
const shippingMethods = await getShippingMethods();

const findSelectedShippingCost = (shippingCosts: Schemas['CartDelivery'][]) => shippingCosts.find((shippingCost) => shippingCost?.shippingMethod?.id === selectedShippingMethod.value.id);

const shippingCost = ref(findSelectedShippingCost(shippingCosts.value));
const setSelectedShippingMethod = async (shippingMethodId: AcceptableValue) => {
    isLoading.value.select = true;
    try {
        const shippingMethodIdString = shippingMethodId?.toString();
        if(shippingMethodIdString) {
            await setShippingMethod({id: shippingMethodIdString});
            toast({
                description: t('checkout.success'),
            });
        }
    } catch (error) {
        if(error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${error.details.errors[0]?.code ?? 'DEFAULT'}`),
                variant: 'destructive',
            });
        }
    }
    await refreshCart();
    shippingCost.value = findSelectedShippingCost(shippingCosts.value);
    isLoading.value.select = false;
};
const addSelectedPromotionCode = async (promotionCode: string) => {
    try {
        isLoading.value.promo = true;
        const result = await addPromotionCode(promotionCode);
        const errorKeys = Object.keys(result.errors);
        if (errorKeys.length > 0) {
            const error = errorKeys[0]?.split('-').slice(0, -1).join('_');
            if(error !== 'promotion_discount_added') {
                toast({
                    title: t('error.generalHeadline'),
                    description: t(`error.${errorKeys[0]?.replaceAll('-', '_')?.toUpperCase() ?? 'DEFAULT'}`),
                    variant: 'destructive',
                });
            } else {
                toast({
                    description: t('checkout.success'),
                });
            }
        }

    } catch (error) {
        if(error instanceof ApiClientError) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${error.details.errors[0]?.code ?? 'DEFAULT'}`),
                variant: 'destructive',
            });
        }
    }
    isLoading.value.promo = false;
};

</script>
<template>
    <CheckoutOffcanvasCartInner
        :cart-items="cartItems"
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
