<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  lineItem: Schemas['OrderLineItem'];
}>();

const { getFormattedPrice } = usePrice();
const configStore = useConfigStore();
const productFallBackCover = configStore.get('BasecomPondCompanionPlugin.config.productFallBackCover') as string;

const { getStyle } = usePondStyle();

const orderItemWrapperStyle = getStyle('order.lineItem.wrapper');
const lineItemBaseStyle = getStyle('order.lineItem.base');
const coverImageStyle = getStyle('order.lineItem.cover');
const promotionCoverStyle = getStyle('order.lineItem.promotion.wrapper');
const promotionIconStyle = getStyle('order.lineItem.promotion.icon');
const lineItemInfoStyle = getStyle('order.lineItem.info');
const itemLabelStyle = getStyle('order.lineItem.label');
const quantityStyle = getStyle('order.lineItem.quantity.wrapper');
const quantityLabelStyle = getStyle('order.lineItem.quantity.label');
const unitPriceStyle = getStyle('order.lineItem.unitPrice');
const totalPriceStyle = getStyle('order.lineItem.totalPrice');
</script>

<template>
    <div :class="orderItemWrapperStyle">
        <slot name="line-item">
            <div :class="lineItemBaseStyle">
                <slot name="line-item-cover">
                    <img
                        v-if="lineItem.cover?.url"
                        :src="lineItem.cover.url"
                        :alt="lineItem.cover.translated?.alt"
                        :title="lineItem.cover.translated?.title"
                        :class="coverImageStyle"
                    >
                    <img
                        v-else-if="lineItem.type !== 'promotion' && productFallBackCover"
                        :src="productFallBackCover"
                        alt=""
                        title=""
                        :class="coverImageStyle"
                    >
                    <div
                        v-else-if="lineItem.type === 'promotion'"
                        :class="promotionCoverStyle"
                    >
                        <Icon name="mdi:percent" :class="promotionIconStyle" />
                    </div>
                </slot>

                <slot name="line-item-information">
                    <div :class="lineItemInfoStyle">
                        <span :class="itemLabelStyle">
                            {{ lineItem.label }}
                        </span>
                        <span>
                            {{ lineItem.payload?.productNumber }}
                        </span>
                    </div>
                </slot>
            </div>
        </slot>

        <slot name="quantity">
            <span :class="quantityStyle">
                <span :class="quantityLabelStyle">
                    {{ $t('order.lineItem.quantity') }}
                </span>
                {{ lineItem.quantity }}
            </span>
        </slot>

        <slot name="unit-price">
            <span :class="unitPriceStyle">
                {{ getFormattedPrice(lineItem.unitPrice) }}
            </span>
        </slot>

        <slot name="total-price">
            <span :class="totalPriceStyle">
                {{ getFormattedPrice(lineItem.totalPrice) }}
            </span>
        </slot>
    </div>
</template>
