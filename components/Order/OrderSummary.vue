<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { t } = useI18n();

defineProps<{
    order: Schemas['Order'];
}>();
</script>

<template>
    <div class="bg-gray-light p-4">
        <h2 class="pb-4">{{ t('order.summary.heading') }}</h2>

        <CheckoutSummaryValues
            :label="t('order.summary.netPriceLabel')"
            :value="order.price.netPrice"
        />

        <template
            v-for="(calculatedTax, index) in order.price.calculatedTaxes"
            :key="`calculated-tax-${index}`"
        >
            <CheckoutSummaryValues
                :label="t('order.summary.taxLabel')"
                :value="calculatedTax.tax"
            />
        </template>

        <!-- using v-if="order.shippingTotal" would hide the row for free-shipping orders because 0 is falsy. displaying a price of 0 is expected UX -->
        <CheckoutSummaryValues
            v-if="order.shippingTotal !== null && order.shippingTotal !== undefined"
            :label="t('order.summary.shippingCostLabel')"
            :value="order.shippingTotal"
        />

        <CheckoutSummaryValues
            :label="t('order.summary.totalLabel')"
            :value="order.price.totalPrice"
            :highlight="true"
        />
    </div>
</template>
