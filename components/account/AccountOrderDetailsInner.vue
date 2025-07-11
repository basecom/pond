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

const orderHasPhysicalProductsInOrder = computed(() => props.order?.lineItems?.some(lineItem =>
    // Check if product is physical
    Object.values(lineItem.states).includes('is-physical'),
));

const { getStyle } = usePondStyle();
// skeleton styles
const skeletonOuterStyles = getStyle('account.skeleton.outer');
const skeletonWrapperStyles = getStyle('account.skeleton.wrapper');
const skeletonLargeStyles = getStyle('account.skeleton.large');
const skeletonCollectionOuterStyles = getStyle('account.skeleton.collection.outer');
const skeletonCollectionInnerStyles = getStyle('account.skeleton.collection.inner');
const skeletonMediumStyles = getStyle('account.skeleton.medium');

// order styles
const headerOuterStyles = getStyle('account.header.outer');
const headerInnerStyles = getStyle('account.header.inner');
const productHeaderStyles = getStyle('account.header.product');
const quantityHeaderStyles = getStyle('account.header.quantity');
const unitPriceHeaderStyles = getStyle('account.header.unitPrice');
const totalPriceHeaderStyles = getStyle('account.header.totalPrice');
const separatorHeaderStyles = getStyle('account.header.separator');

const informationOuterStyles = getStyle('account.information.outer');
const generalInformationOuterStyles = getStyle('account.information.general.outer');
const generalInformationLabelStyles = getStyle('account.information.general.label');
const generalInformationValueStyles = getStyle('account.information.general.value');

const priceOuterStyles = getStyle('account.price.outer');
const priceLabelStyles = getStyle('account.price.label');
const priceValueStyles = getStyle('account.price.value');
</script>

<template>
    <template v-if="isLoading">
        <slot name="loading-skeleton">
            <div v-for="n in 2" :key="n" :class="skeletonOuterStyles">
                <div :class="skeletonWrapperStyles">
                    <UiSkeleton :class="skeletonLargeStyles" />
                    
                    <div :class="skeletonCollectionOuterStyles">
                        <UiSkeleton :class="skeletonCollectionInnerStyles" />
                        <UiSkeleton :class="skeletonCollectionInnerStyles" />
                        <UiSkeleton :class="skeletonCollectionInnerStyles" />
                        <UiSkeleton :class="skeletonCollectionInnerStyles" />
                    </div>
                </div>
                
                <UiSkeleton :class="skeletonMediumStyles" />
            </div>
        </slot>
    </template>

    <template v-else>
        <div :class="headerOuterStyles">
            <slot name="line-items-header">
                <div :class="headerInnerStyles">
                    <span :class="productHeaderStyles">{{ $t('order.lineItem.product') }}</span>
                    <span :class="quantityHeaderStyles"> {{ $t('order.lineItem.quantity') }}</span>
                    <span :class="unitPriceHeaderStyles"> {{ $t('order.lineItem.unitPrice') }} </span>
                    <span :class="totalPriceHeaderStyles">{{ $t('order.lineItem.totalPrice') }}</span>
                </div>

                <hr :class="separatorHeaderStyles">
            </slot>

            <slot name="line-items">
                <template v-for="lineItem in order?.lineItems" :key="lineItem.id">
                    <OrderLineItem :line-item="lineItem" />
                </template>
            </slot>
        </div>

        <slot name="order-information">
            <div :class="informationOuterStyles">
                <slot name="general-order-information">
                    <div :class="generalInformationOuterStyles">
                        <slot name="order-date">
                            <span :class="generalInformationLabelStyles">
                                {{ $t('order.orderDate') }}
                            </span>
                            <span :class="generalInformationValueStyles">
                                {{ formatLocaleDate(order?.orderDate) }}
                            </span>
                        </slot>

                        <slot name="order-number">
                            <span :class="generalInformationLabelStyles">
                                {{ $t('order.orderNumber') }}
                            </span>
                            <span :class="generalInformationValueStyles">
                                {{ order?.orderNumber }}
                            </span>
                        </slot>

                        <slot name="payment-method">
                            <span :class="generalInformationLabelStyles">
                                {{ $t('order.paymentMethod') }}
                            </span>
                            <span :class="generalInformationValueStyles">
                                {{ paymentMethodName }}
                            </span>
                        </slot>

                        <slot name="payment-state">
                            <span :class="generalInformationLabelStyles">
                                {{ $t('order.paymentState') }}
                            </span>
                            <span :class="generalInformationValueStyles">
                                {{ paymentState }}
                            </span>
                        </slot>

                        <slot name="shipping-method">
                            <span v-if="orderHasPhysicalProductsInOrder" :class="generalInformationLabelStyles">
                                {{ $t('order.shippingMethod') }}
                            </span>
                            <span v-if="orderHasPhysicalProductsInOrder" :class="generalInformationValueStyles">
                                {{ shippingMethodName }}
                            </span>
                        </slot>

                        <slot name="shipping-state">
                            <span v-if="orderHasPhysicalProductsInOrder" :class="generalInformationLabelStyles">
                                {{ $t('order.shippingState') }}
                            </span>
                            <span v-if="orderHasPhysicalProductsInOrder" :class="generalInformationValueStyles">
                                {{ shippingState }}
                            </span>
                        </slot>

                        <slot name="tracking">
                            <span v-if="orderHasPhysicalProductsInOrder" :class="generalInformationLabelStyles">
                                {{ $t('order.tracking') }}
                            </span>
                            <span v-if="orderHasPhysicalProductsInOrder" :class="generalInformationValueStyles">
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
                    <div :class="priceOuterStyles">
                        <slot name="shipping-costs">
                            <span v-if="orderHasPhysicalProductsInOrder" :class="priceLabelStyles">
                                {{ $t('order.shipping') }}
                            </span>
                            <span v-if="orderHasPhysicalProductsInOrder" :class="priceValueStyles">
                                {{ getFormattedPrice(shippingCosts ?? 0) }}
                            </span>
                        </slot>
                        <slot name="tax">
                            <template v-for="calculatedTax in order?.price.calculatedTaxes" :key="calculatedTax.taxRate">
                                <span :class="priceLabelStyles">
                                    {{ $t('order.tax', { taxRate: calculatedTax.taxRate }) }}
                                </span>
                                <span :class="priceValueStyles">
                                    {{ getFormattedPrice(calculatedTax.tax) }}
                                </span>
                            </template>
                        </slot>
                        <slot name="total">
                            <span :class="priceLabelStyles">
                                {{ $t('order.total') }}
                            </span>
                            <span :class="priceValueStyles">
                                {{ getFormattedPrice(total ?? 0) }}
                            </span>
                        </slot>
                    </div>
                </slot>
            </div>
        </slot>
    </template>
</template>
