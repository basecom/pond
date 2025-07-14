<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  lineItem: Schemas['OrderLineItem'];
}>();

const { getStyle } = usePondStyle();
const { getFormattedPrice } = usePrice();
const configStore = useConfigStore();
const productFallBackCover = configStore.get('BasecomPondCompanionPlugin.config.productFallBackCover') as string;
</script>

<template>
    <div :class="getStyle('order.lineItem.wrapper')">
        <slot name="line-item">
            <div :class="getStyle('order.lineItem.base')">
                <slot name="line-item-cover">
                    <img
                        v-if="lineItem.cover?.url"
                        :src="lineItem.cover.url"
                        :alt="lineItem.cover.translated?.alt"
                        :title="lineItem.cover.translated?.title"
                        :class="getStyle('order.lineItem.cover')"
                    >
                    <img
                        v-else-if="lineItem.type !== 'promotion' && productFallBackCover"
                        :src="productFallBackCover"
                        alt=""
                        title=""
                        :class="getStyle('order.lineItem.cover')"
                    >
                    <div
                        v-else-if="lineItem.type === 'promotion'"
                        :class="getStyle('order.lineItem.promotion.wrapper')"
                    >
                        <Icon name="mdi:percent" :class="getStyle('order.lineItem.promotion.icon')" />
                    </div>
                </slot>

                <slot name="line-item-information">
                    <div :class="getStyle('order.lineItem.info')">
                        <span :class="getStyle('order.lineItem.label')">
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
            <span :class="getStyle('order.lineItem.quantity.wrapper')">
                <span :class="getStyle('order.lineItem.quantity.label')">
                    {{ $t('order.lineItem.quantity') }}
                </span>
                {{ lineItem.quantity }}
            </span>
        </slot>

        <slot name="unit-price">
            <span :class="getStyle('order.lineItem.unitPrice')">
                {{ getFormattedPrice(lineItem.unitPrice) }}
            </span>
        </slot>

        <slot name="total-price">
            <span :class="getStyle('order.lineItem.totalPrice')">
                {{ getFormattedPrice(lineItem.totalPrice) }}
            </span>
        </slot>
    </div>
</template>
