<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  lineItem: Schemas['OrderLineItem'];
}>();

const { getFormattedPrice } = usePrice();
const configStore = useConfigStore();
const productFallBackCover = configStore.get('BasecomPondCompanionPlugin.config.productFallBackCover') as string;
const promotionCover = configStore.get('BasecomPondCompanionPlugin.config.promotionCover') as string;
</script>

<template>
    <div class="flex flex-col md:grid md:grid-cols-5 gap-5 border-b  border-gray-100 p-2">
        <slot name="line-item">
            <div class="flex col-span-2 gap-2.5">
                <slot name="line-item-cover">
                    <img
                        v-if="lineItem.cover?.url"
                        :src="lineItem.cover.url"
                        :alt="lineItem.cover.translated?.alt"
                        :title="lineItem.cover.translated?.title"
                        class="object-center h-16 aspect-square"
                    >
                    <img
                        v-else-if="lineItem.type === 'promotion' && promotionCover"
                        :src="promotionCover"
                        alt=""
                        title=""
                        class="object-center h-16 aspect-square"
                    >
                    <img
                        v-else-if="lineItem.type === 'product' && productFallBackCover"
                        :src="productFallBackCover"
                        alt=""
                        title=""
                        class="object-center h-16 aspect-square"
                    >
                </slot>

                <slot name="line-item-information">
                    <div class="flex flex-col">
                        <span class="font-bold">
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
            <span class="w-full md:col-start-3 flex justify-between md:justify-center">
                <span class="font-bold md:hidden">{{ $t('order.lineItem.quantity') }} </span>
                {{ lineItem.quantity }}
            </span>
        </slot>

        <slot name="unit-price">
            <span class="justify-center hidden md:flex">
                {{ getFormattedPrice(lineItem.unitPrice) }}
            </span>
        </slot>

        <slot name="total-price">
            <span class="flex justify-end font-bold">
                {{ getFormattedPrice(lineItem.totalPrice) }}
            </span>
        </slot>
    </div>
</template>
