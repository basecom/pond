<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  lineItem: Schemas['OrderLineItem'];
}>();

const { getStyle } = usePondStyle();
const { getFormattedPrice } = usePrice();
</script>

<template>
    <div :class="getStyle('account.order.lineItem.wrapper')">
        <slot name="line-item">
            <div :class="getStyle('account.order.lineItem.base')">
                <slot name="line-item-cover">
                    <ProductCover
                        :is-promotion="lineItem.type === 'promotion'"
                        :cover="lineItem.cover"
                        :label="lineItem.label"
                        :video-classes="getStyle('account.order.lineItem.cover')"
                        :product-classes="getStyle('account.order.lineItem.cover')"
                        :fallback-classes="getStyle('account.order.lineItem.cover')"
                        :promotion-classes="getStyle('account.order.lineItem.promotion.wrapper')"
                        :promotion-icon-classes="getStyle('account.order.lineItem.promotion.icon')"
                    />
                </slot>

                <slot name="line-item-information">
                    <div :class="getStyle('account.order.lineItem.info')">
                        <span :class="getStyle('account.order.lineItem.label')">
                            {{ lineItem.label }}
                        </span>

                        <span :class="getStyle('account.order.lineItem.description')">
                            {{ lineItem.payload?.productNumber }}
                        </span>
                    </div>
                </slot>
            </div>
        </slot>

        <slot name="quantity">
            <span :class="getStyle('account.order.lineItem.quantity.wrapper')">
                <span :class="getStyle('account.order.lineItem.quantity.label')">
                    {{ $t('account.orderItemColumnQuantity') }}
                </span>
                {{ lineItem.quantity }}
            </span>
        </slot>

        <slot name="unit-price">
            <span :class="getStyle('account.order.lineItem.unitPrice')">
                {{ getFormattedPrice(lineItem.unitPrice) }}
            </span>
        </slot>

        <slot name="total-price">
            <span :class="getStyle('account.order.lineItem.totalPrice')">
                {{ getFormattedPrice(lineItem.totalPrice) }}
            </span>
        </slot>
    </div>
</template>
