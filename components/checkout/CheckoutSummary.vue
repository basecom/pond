<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';

const { handleError } = usePondHandleError();
const { toast } = usePondToast();
const { t } = useI18n();
const { cart, shippingCosts, subtotal, totalPrice, addPromotionCode, refreshCart } = useCart();
const { selectedShippingMethod, getShippingMethods, shippingMethods, setShippingMethod } = useCheckout();

const promotionIsLoading = ref(false);

const setSelectedShippingMethod = async (shippingMethodId: AcceptableValue) => {
    try {
        const shippingMethodIdString = shippingMethodId?.toString();

        if (!shippingMethodIdString) {
            toast({ title: t('error.message-default'), variant: 'destructive' });
            return;
        }

        await setShippingMethod({ id: shippingMethodIdString });
        await refreshCart();
    } catch (error) {
        handleError(error, true);
        toast({ title: t('error.message-default'), variant: 'destructive' });
    }
};

const addPromotionCodeToCart = async (promotionCode: string) => {
    promotionIsLoading.value = true;
    try {
        const result = await addPromotionCode(promotionCode);
        const errorKeys = Object.keys(result?.errors ?? {});

        if (errorKeys.length > 0) {
            const itsAnError = !errorKeys[0]?.includes('promotion-discount-added');
            const code = !itsAnError ? 'promotion-discount-added' : errorKeys[0];
            toast({
                title: t(`checkout.${code}`, {
                    name: promotionCode,
                    code: promotionCode,
                }),
                variant: itsAnError ? 'destructive' : 'default',
            });
        }
    } catch (error) {
        handleError(error, true);
        toast({ title: t('error.message-default'), variant: 'destructive' });
    } finally {
        promotionIsLoading.value = false;
    }
};

onMounted(async () => {
    try {
        await getShippingMethods();
    } catch (error) {
        handleError(error,true);
    }
});
</script>

<template>
    <CheckoutSummaryInner
        :cart="cart"
        :shipping-costs="shippingCosts"
        :shipping-methods="shippingMethods"
        :selected-shipping-method="selectedShippingMethod"
        :subtotal="subtotal"
        :total-price="totalPrice"
        @set-selected-shipping-method="shippingMethodId => setSelectedShippingMethod(shippingMethodId)"
        @add-promotion-code="promotionCode => addPromotionCodeToCart(promotionCode)"
    />
</template>
