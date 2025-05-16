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
const {subtotal, shippingCosts, addPromotionCode, cart} = useCart();
const {getShippingMethods, setShippingMethod, selectedShippingMethod} = useCheckout();
const shippingCost = ref(shippingCosts.value.find((shippingCost) => shippingCost.shippingMethod.id === selectedShippingMethod.value.id));
const isLoading = ref({
    promo: false,
    select: false,
});
const shippingMethods = await getShippingMethods();

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

    isLoading.value.select = false;
};
const addSelectedPromotionCode = async (promotionCode: string) => {
    try {
        isLoading.value.promo = true;
        const result = await addPromotionCode(promotionCode);
        if (result.errors) {
            toast({
                title: t('error.generalHeadline'),
                description: t(`error.${Object.keys(result.errors)[0] ?? 'DEFAULT'}`),
                variant: 'destructive',
            });
        } else {
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
        @add-selected-promotion-code="(promotionCode: string) => addSelectedPromotionCode(promotionCode)"
        @set-selected-shipping-method="(shippingMethodId: AcceptableValue) => setSelectedShippingMethod(shippingMethodId)"
    />
</template>
