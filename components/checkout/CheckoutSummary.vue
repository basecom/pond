<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';

const { handleError } = usePondHandleError();
const { toast } = usePondToast();
const { cart, shippingCosts, subtotal, totalPrice } = useCart();
const { selectedShippingMethod, getShippingMethods, shippingMethods, setShippingMethod } = useCheckout();

const shippingCost = computed(() => shippingCosts.value.find((shippingCost) => shippingCost?.shippingMethod?.id === selectedShippingMethod.value.id));

const setSelectedShippingMethod = async (shippingMethodId: AcceptableValue) => {
    try {
        const shippingMethodIdString = shippingMethodId?.toString();
        await setShippingMethod({ id: shippingMethodIdString });
    } catch (error) {
    } finally {
    }
};

onMounted(async () => {
    try {
        getShippingMethods();
    } catch {}
});
</script>

<template>
    <CheckoutSummaryInner
        :cart="cart"
        :shipping-cost="shippingCost"
        :shipping-methods="shippingMethods"
        :selected-shipping-method="selectedShippingMethod"
        :subtotal="subtotal"
        :total-price="totalPrice"
        @set-selected-shipping-method="shippingMethodId => setSelectedShippingMethod(shippingMethodId)"
    />
</template>
