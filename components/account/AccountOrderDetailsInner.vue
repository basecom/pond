<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(defineProps<{
  order?: Schemas['Order'] | undefined;
  paymentMethodName: string;
  shippingCosts?: number | undefined;
  total?: number | undefined;
  paymentState: string;
  shippingMethodName: string;
  shippingState: string;
  trackingCodes?: string[] | undefined;
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

const orderHasPhysicalProductsInOrder = computed(() => props.order?.lineItems?.some(lineItem =>
    // Check if product is physical
    Object.values(lineItem.states).includes('is-physical'),
));
</script>

<template>
    <template v-if="isLoading">
        <slot name="loading-skeleton">
            <div v-for="n in 2" :key="n" class="flex flex-col gap-5">
                <div class="flex gap-5">
                    <UiSkeleton class="w-20 h-25" />
                    <div class="space-y-2 w-full">
                        <UiSkeleton class="h-4 w-full" />
                        <UiSkeleton class="h-4 w-full" />
                        <UiSkeleton class="h-4 w-full" />
                        <UiSkeleton class="h-4 w-full" />
                    </div>
                </div>
                <UiSkeleton class="w-full h-15" />
            </div>
        </slot>
    </template>

    <template v-else>
        <div class="flex flex-col gap-2 p-4 pb-0 md:pb-4">
            <slot name="line-items-header">
                <div class="hidden md:grid grid-cols-5 gap-5">
                    <span class="col-span-2 font-bold">{{ $t('order.lineItem.product') }}</span>
                    <span class="col-start-3 flex justify-center font-bold"> {{ $t('order.lineItem.quantity') }}</span>
                    <span class="flex justify-center font-bold"> {{ $t('order.lineItem.unitPrice') }} </span>
                    <span class="flex justify-center font-bold">{{ $t('order.lineItem.totalPrice') }}</span>
                </div>
                <hr class="md:mt-2.5 text-gray-300">
            </slot>

            <slot name="line-items">
                <template v-for="lineItem in order?.lineItems" :key="lineItem.id">
                    <OrderLineItem :line-item="lineItem" />
                </template>
            </slot>
        </div>

        <slot name="order-information">
            <div class="flex flex-col md:flex-row justify-between bg-gray-100 p-4">
                <slot name="general-order-information">
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <slot name="order-date">
                            <span class="font-bold col-start-1">
                                {{ $t('order.orderDate') }}
                            </span>
                            <span class="md:col-span-2 text-end md:text-start">
                                {{ formatLocaleDate(order?.orderDate) }}
                            </span>
                        </slot>
                        <slot name="order-number">
                            <span class="font-bold col-start-1">
                                {{ $t('order.orderNumber') }}
                            </span>
                            <span class="text-end md:text-start md:col-span-2">
                                {{ order?.orderNumber }}
                            </span>
                        </slot>
                        <slot name="payment-method">
                            <span class="font-bold col-start-1">
                                {{ $t('order.paymentMethod') }}
                            </span>
                            <span class="md:col-span-2 text-end md:text-start">
                                {{ paymentMethodName }}
                            </span>
                        </slot>
                        <slot name="payment-state">
                            <span class="font-bold col-start-1">
                                {{ $t('order.paymentState') }}
                            </span>
                            <span class="md:col-span-2 text-end md:text-start">
                                {{ paymentState }}
                            </span>
                        </slot>
                        <slot name="shipping-method">
                            <span v-if="orderHasPhysicalProductsInOrder" class="font-bold col-start-1">
                                {{ $t('order.shippingMethod') }}
                            </span>
                            <span v-if="orderHasPhysicalProductsInOrder" class="md:col-span-2 text-end md:text-start">
                                {{ shippingMethodName }}
                            </span>
                        </slot>
                        <slot name="shipping-state">
                            <span v-if="orderHasPhysicalProductsInOrder" class="font-bold col-start-1">
                                {{ $t('order.shippingState') }}
                            </span>
                            <span v-if="orderHasPhysicalProductsInOrder" class="md:col-span-2 text-end md:text-start">
                                {{ shippingState }}
                            </span>
                        </slot>
                        <slot name="tracking">
                            <span v-if="orderHasPhysicalProductsInOrder" class="font-bold col-start-1">
                                {{ $t('order.tracking') }}
                            </span>
                            <span v-if="orderHasPhysicalProductsInOrder" class="md:col-span-2 text-end md:text-start">
                                <template v-if="trackingCodes && trackingCodes.length > 0">
                                    <template v-for="(trackingCode, index)  in trackingCodes" :key="trackingCode">
                                        {{ trackingCode }} <span v-if="index !== trackingCodes.length - 1">, </span>
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
                    <div class="grid grid-cols-2 gap-2 h-fit">
                        <slot name="shipping-costs">
                            <span class="font-bold">
                                {{ $t('order.shipping') }}
                            </span>
                            <span class="flex justify-end col-start-2">
                                {{ getFormattedPrice(shippingCosts ?? 0) }}
                            </span>
                        </slot>
                        <slot name="tax">
                            <template v-for="calculatedTax in order?.price.calculatedTaxes" :key="calculatedTax.taxRate">
                                <span class="font-bold">
                                    {{ $t('order.tax', { taxRate: calculatedTax.taxRate }) }}
                                </span>
                                <span class="flex justify-end col-start-2">
                                    {{ getFormattedPrice(calculatedTax.tax) }}
                                </span>
                            </template>
                        </slot>
                        <slot name="total">
                            <span class="font-bold">
                                {{ $t('order.total') }}
                            </span>
                            <span class="flex justify-end col-start-2">
                                {{ getFormattedPrice(total ?? 0) }}
                            </span>
                        </slot>
                    </div>
                </slot>
            </div>
        </slot>
    </template>
</template>
