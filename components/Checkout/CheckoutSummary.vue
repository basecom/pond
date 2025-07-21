<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
        reducedDisplay?: boolean;
    }>(),
    {
        reducedDisplay: false,
    },
);
const { t } = useI18n();
const { pushSuccess } = useNotifications();
const { preselectShippingMethodFallback } = useShippingMethod();
await preselectShippingMethodFallback();

const { totalPrice, shippingTotal, cart } = useCart();

const netPrice = computed(() => cart.value?.price?.netPrice || 0);
const calculatedTaxes = computed(() => cart.value?.price?.calculatedTaxes || []);

watch(cart, async () => {
    for (const key in cart.value.errors) {
        if (key.includes('promotion-discount-added')) {
            const error = cart.value.errors[key];

            const lineItem = cart.value.lineItems.find((item: Schemas['LineItem']) => item.id === error.parameters?.discountLineItemId);

            if (lineItem) {
                pushSuccess(t('checkout.promotion.promotionApplied', { promotionText: lineItem.payload?.code?.length ? lineItem.payload.code : lineItem.description }));
            }
        }
    }
});
</script>

<template>
    <div class="rounded-md bg-gray-light p-4">
        <h2 class="pb-4">{{ t('checkout.summary.heading') }}</h2>
        <template v-if="!reducedDisplay">
            <CheckoutSummaryValues
                :label="t('checkout.summary.netPriceLabel')"
                :value="netPrice"
            />

            <template
                v-for="(calculatedTax, index) in calculatedTaxes"
                :key="`calculated-tax-${index}`"
            >
                <CheckoutSummaryValues
                    :label="t('checkout.summary.taxLabel')"
                    :value="calculatedTax.tax"
                />
            </template>

            <CheckoutSummaryValues
                :label="t('checkout.summary.shippingCostLabel')"
                :value="shippingTotal"
            />
        </template>

        <CheckoutSummaryValues
            :label="t('checkout.summary.totalLabel')"
            :value="totalPrice"
            :highlight="true"
        />
    </div>

    <CheckoutTotalDeliveryTime :cart="cart" />
</template>
