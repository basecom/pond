<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(defineProps<{
  order?: Schemas['Order'];
  paymentMethodName: string;
  shippingCosts?: number;
  total?: number;
  paymentState: string;
  shippingMethodName: string;
  shippingState: string;
  trackingCodes?: string[];
  isLoading?: boolean;
  }>(),
{
    order: undefined,
    shippingCosts: undefined,
    total: undefined,
    trackingCodes: undefined,
    isLoading: false,
},
);

const { getFormattedPrice } = usePrice();
const { formatLocaleDate } = usePondDate();
const { getStyle } = usePondStyle();

const orderHasPhysicalProductsInOrder = computed(() => props.order?.lineItems?.some(lineItem =>
    // Check if product is physical
    Object.values(lineItem.states).includes('is-physical'),
));
</script>

<template>
    <template v-if="isLoading">
        <slot name="loading-skeleton">
            <div v-for="n in 2" :key="n" :class="getStyle('account.order.skeleton.outer')">
                <div :class="getStyle('account.order.skeleton.wrapper')">
                    <UiSkeleton :class="getStyle('account.order.skeleton.large')" />

                    <div :class="getStyle('account.order.skeleton.collection.outer')">
                        <UiSkeleton :class="getStyle('account.order.skeleton.collection.inner')" />
                        <UiSkeleton :class="getStyle('account.order.skeleton.collection.inner')" />
                        <UiSkeleton :class="getStyle('account.order.skeleton.collection.inner')" />
                        <UiSkeleton :class="getStyle('account.order.skeleton.collection.inner')" />
                    </div>
                </div>

                <UiSkeleton :class="getStyle('account.order.skeleton.medium')" />
            </div>
        </slot>
    </template>

    <template v-else>
        <div :class="getStyle('account.order.header.outer')">
            <slot name="line-items-header">
                <div :class="getStyle('account.order.header.inner')">
                    <span :class="getStyle('account.order.header.product')">{{ $t('account.orderItemColumnName') }}</span>
                    <span :class="getStyle('account.order.header.quantity')"> {{ $t('account.orderItemColumnQuantity') }}</span>
                    <span :class="getStyle('account.order.header.unitPrice')"> {{ $t('account.orderItemColumnPrice') }} </span>
                    <span :class="getStyle('account.order.header.totalPrice')">{{ $t('account.orderItemColumnTotal') }}</span>
                </div>

                <hr :class="getStyle('account.order.header.separator')">
            </slot>

            <slot name="line-items">
                <template v-for="lineItem in order?.lineItems" :key="lineItem.id">
                    <OrderLineItem :line-item="lineItem" />
                </template>
            </slot>
        </div>

        <slot name="order-information">
            <div :class="getStyle('account.order.information.outer')">
                <slot name="general-order-information">
                    <div :class="getStyle('account.order.information.general.outer')">
                        <slot name="order-date">
                            <span :class="getStyle('account.order.information.general.label')">
                                {{ $t('account.orderItemDate') }}
                            </span>
                            <span :class="getStyle('account.order.information.general.value')">
                                {{ formatLocaleDate(order?.orderDate) }}
                            </span>
                        </slot>

                        <slot name="order-number">
                            <span :class="getStyle('account.order.information.general.label')">
                                {{ $t('account.orderItemColumnNumber') }}
                            </span>
                            <span :class="getStyle('account.order.information.general.value')">
                                {{ order?.orderNumber }}
                            </span>
                        </slot>

                        <slot name="payment-method">
                            <span :class="getStyle('account.order.information.general.label')">
                                {{ $t('account.orderItemPaymentMethod') }}
                            </span>
                            <span :class="getStyle('account.order.information.general.value')">
                                {{ paymentMethodName }}
                            </span>
                        </slot>

                        <slot name="payment-state">
                            <span :class="getStyle('account.order.information.general.label')">
                                {{ $t('account.orderPaymentStatus') }}
                            </span>
                            <span :class="getStyle('account.order.information.general.value')">
                                {{ paymentState }}
                            </span>
                        </slot>

                        <slot name="shipping-method">
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.order.information.general.label')"
                            >
                                {{ $t('account.orderItemShippingMethod') }}
                            </span>
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.order.information.general.value')"
                            >
                                {{ shippingMethodName }}
                            </span>
                        </slot>

                        <slot name="shipping-state">
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.order.information.general.label')"
                            >
                                {{ $t('account.orderShippingStatus') }}
                            </span>
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.order.information.general.value')"
                            >
                                {{ shippingState }}
                            </span>
                        </slot>

                        <slot name="tracking">
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.order.information.general.label')"
                            >
                                {{ $t('account.orderItemTracking') }}
                            </span>
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.order.information.general.value')"
                            >
                                <template v-if="trackingCodes && trackingCodes.length > 0">
                                    <template
                                        v-for="(trackingCode, index) in trackingCodes"
                                        :key="trackingCode"
                                    >
                                        {{ trackingCode }}
                                        <span v-if="index !== trackingCodes.length - 1">, </span>
                                    </template>
                                </template>
                                <template v-else>
                                    {{ $t('account.orderTrackingNotAvailable') }}
                                </template>
                            </span>
                        </slot>
                    </div>
                </slot>

                <slot name="price-order-information">
                    <div :class="getStyle('account.order.price.outer')">
                        <slot name="shipping-costs">
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.order.price.label')"
                            >
                                {{ $t('account.orderItemShippingcosts') }}
                            </span>
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.order.price.value')"
                            >
                                {{ getFormattedPrice(shippingCosts ?? 0) }}
                            </span>
                        </slot>

                        <slot name="tax">
                            <template
                                v-for="calculatedTax in order?.price.calculatedTaxes"
                                :key="calculatedTax.taxRate"
                            >
                                <span :class="getStyle('account.order.price.label')">
                                    {{ $t('checkout.summaryTax', { rate: calculatedTax.taxRate }) }}
                                </span>
                                <span :class="getStyle('account.order.price.value')">
                                    {{ getFormattedPrice(calculatedTax.tax) }}
                                </span>
                            </template>
                        </slot>

                        <slot name="total">
                            <span :class="getStyle('account.order.price.label')">
                                {{ $t('account.orderItemTotal') }}
                            </span>
                            <span :class="getStyle('account.order.price.value')">
                                {{ getFormattedPrice(total ?? 0) }}
                            </span>
                        </slot>
                    </div>
                </slot>
            </div>
        </slot>
    </template>
</template>
