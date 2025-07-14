<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {toast} from '../../ui/toast';
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
const {handleError} = usePondHandleError();

const isLoading = ref({
    promotion: false,
    select: false,
});
const shippingMethods = ref<Schemas['ShippingMethod'][]>([]);

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
        } else {
            toast({
                title: t('error.generalHeadline'),
                description: t('error.INVALID_SHIPPING_METHOD'),
                variant: 'destructive',
            });
        }
    } catch (error) {
        handleError(error, true, {show: true});
    } finally {
        await refreshCart();
        shippingCost.value = findSelectedShippingCost(shippingCosts.value);
        isLoading.value.select = false;
    }
};

const addSelectedPromotionCode = async (promotionCode: string) => {
    isLoading.value.promotion = true;
    try {
        const result = await addPromotionCode(promotionCode);
        const errorKeys = Object.keys(result.errors);
        if (errorKeys.length > 0) {
            const isSuccess = errorKeys[0]?.includes('promotion-discount-added');
            if(isSuccess) {
                toast({
                    description: t('checkout.promotionSuccess'),
                });
            } else {
                toast({
                    title: t('error.generalHeadline'),
                    description: t(`error.${errorKeys[0]?.replaceAll('-', '_')?.toUpperCase() ?? 'DEFAULT'}`),
                    variant: 'destructive',
                });
            }
        }

    } catch (error) {
        handleError(error,true, {show: true});
    } finally {
        isLoading.value.promotion = false;
    }
};

onMounted(async () => {
    isLoading.value.select = true;
    try {
        const result = await getShippingMethods();
        shippingMethods.value = result.value;
    } catch (error) {
        handleError(error);
    } finally {
        isLoading.value.select = false;
    }
});
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
