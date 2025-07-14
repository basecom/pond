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
            <div v-for="n in 2" :key="n" :class="getStyle('account.skeleton.outer')">
                <div :class="getStyle('account.skeleton.wrapper')">
                    <UiSkeleton :class="getStyle('account.skeleton.large')" />

                    <div :class="getStyle('account.skeleton.collection.outer')">
                        <UiSkeleton :class="getStyle('account.skeleton.collection.inner')" />
                        <UiSkeleton :class="getStyle('account.skeleton.collection.inner')" />
                        <UiSkeleton :class="getStyle('account.skeleton.collection.inner')" />
                        <UiSkeleton :class="getStyle('account.skeleton.collection.inner')" />
                    </div>
                </div>

                <UiSkeleton :class="getStyle('account.skeleton.medium')" />
            </div>
        </slot>
    </template>

    <template v-else>
        <div :class="getStyle('account.header.outer')">
            <slot name="line-items-header">
                <div :class="getStyle('account.header.inner')">
                    <span :class="getStyle('account.header.product')">{{ $t('order.lineItem.product') }}</span>
                    <span :class="getStyle('account.header.quantity')"> {{ $t('order.lineItem.quantity') }}</span>
                    <span :class="getStyle('account.header.unitPrice')"> {{ $t('order.lineItem.unitPrice') }} </span>
                    <span :class="getStyle('account.header.totalPrice')">{{ $t('order.lineItem.totalPrice') }}</span>
                </div>

                <hr :class="getStyle('account.header.separator')">
            </slot>

            <slot name="line-items">
                <template v-for="lineItem in order?.lineItems" :key="lineItem.id">
                    <OrderLineItem :line-item="lineItem" />
                </template>
            </slot>
        </div>

        <slot name="order-information">
            <div :class="getStyle('account.information.outer')">
                <slot name="general-order-information">
                    <div :class="getStyle('account.information.general.outer')">
                        <slot name="order-date">
                            <span :class="getStyle('account.information.general.label')">
                                {{ $t('order.orderDate') }}
                            </span>
                            <span :class="getStyle('account.information.general.value')">
                                {{ formatLocaleDate(order?.orderDate) }}
                            </span>
                        </slot>

                        <slot name="order-number">
                            <span :class="getStyle('account.information.general.label')">
                                {{ $t('order.orderNumber') }}
                            </span>
                            <span :class="getStyle('account.information.general.value')">
                                {{ order?.orderNumber }}
                            </span>
                        </slot>

                        <slot name="payment-method">
                            <span :class="getStyle('account.information.general.label')">
                                {{ $t('order.paymentMethod') }}
                            </span>
                            <span :class="getStyle('account.information.general.value')">
                                {{ paymentMethodName }}
                            </span>
                        </slot>

                        <slot name="payment-state">
                            <span :class="getStyle('account.information.general.label')">
                                {{ $t('order.paymentState') }}
                            </span>
                            <span :class="getStyle('account.information.general.value')">
                                {{ paymentState }}
                            </span>
                        </slot>

                        <slot name="shipping-method">
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.information.general.label')"
                            >
                                {{ $t('order.shippingMethod') }}
                            </span>
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.information.general.value')"
                            >
                                {{ shippingMethodName }}
                            </span>
                        </slot>

                        <slot name="shipping-state">
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.information.general.label')"
                            >
                                {{ $t('order.shippingState') }}
                            </span>
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.information.general.value')"
                            >
                                {{ shippingState }}
                            </span>
                        </slot>

                        <slot name="tracking">
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.information.general.label')"
                            >
                                {{ $t('order.tracking') }}
                            </span>
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.information.general.value')"
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
                                    {{ $t('order.noTracking') }}
                                </template>
                            </span>
                        </slot>
                    </div>
                </slot>

                <slot name="price-order-information">
                    <div :class="getStyle('account.price.outer')">
                        <slot name="shipping-costs">
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.price.label')"
                            >
                                {{ $t('order.shipping') }}
                            </span>
                            <span
                                v-if="orderHasPhysicalProductsInOrder"
                                :class="getStyle('account.price.value')"
                            >
                                {{ getFormattedPrice(shippingCosts ?? 0) }}
                            </span>
                        </slot>

                        <slot name="tax">
                            <template
                                v-for="calculatedTax in order?.price.calculatedTaxes"
                                :key="calculatedTax.taxRate"
                            >
                                <span :class="getStyle('account.price.label')">
                                    {{ $t('order.tax', { taxRate: calculatedTax.taxRate }) }}
                                </span>
                                <span :class="getStyle('account.price.value')">
                                    {{ getFormattedPrice(calculatedTax.tax) }}
                                </span>
                            </template>
                        </slot>

                        <slot name="total">
                            <span :class="getStyle('account.price.label')">
                                {{ $t('order.total') }}
                            </span>
                            <span :class="getStyle('account.price.value')">
                                {{ getFormattedPrice(total ?? 0) }}
                            </span>
                        </slot>
                    </div>
                </slot>
            </div>
        </slot>
    </template>
</template>
