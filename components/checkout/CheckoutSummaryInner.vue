<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { AcceptableValue } from 'reka-ui';

withDefaults(
    defineProps<{
        cart?: Schemas['Cart'];
        shippingCosts?: Schemas['CartDelivery'][];
        shippingMethods?: Schemas['ShippingMethod'][];
        selectedShippingMethod?: Schemas['ShippingMethod'];
        subtotal?: number;
        totalPrice?: number;
        promotionIsLoading?: boolean;
    }>(),
    {
        cart: undefined,
        shippingCosts: undefined,
        shippingMethods: undefined,
        selectedShippingMethod: undefined,
        subtotal: undefined,
        totalPrice: undefined,
        promotionIsLoading: false,
    },
);

const emits = defineEmits<{
    setSelectedShippingMethod: [shippingMethodId: AcceptableValue];
    addPromotionCode: [promotionCode: string];
}>();

const { getFormattedPrice } = usePrice();
const { getStyle } = usePondStyle();

const promotionCode = ref('');

const addPromotionCode = () => {
    emits('addPromotionCode', promotionCode.value);
    promotionCode.value = '';
};
</script>

<template>
    <div :class="getStyle('cart.summary.outer')">
        <slot name="summary-position-price">
            <div :class="getStyle('cart.summary.positionPrice')">
                <div>
                    {{ $t('checkout.summaryPositionPrice') }}
                </div>

                <div :class="getStyle('cart.summary.price')">
                    {{ getFormattedPrice(subtotal) }}
                </div>
            </div>
        </slot>

        <slot name="summary-shipping">
            <div :class="getStyle('cart.summary.shipping')">
                <div>
                    {{ $t('checkout.summaryShipping') }}

                    <UiSelect
                        v-if="shippingCosts"
                        :model-value="selectedShippingMethod?.id"
                        @update:model-value="(shippingMethodId: AcceptableValue) => emits('setSelectedShippingMethod', shippingMethodId)"
                    >
                        <UiSelectTrigger>
                            <UiSelectValue />
                        </UiSelectTrigger>

                        <UiSelectContent>
                            <UiSelectGroup>
                                <template v-for="shippingMethod in shippingMethods" :key="shippingMethod.id">
                                    <UiSelectItem :value="shippingMethod.id">
                                        {{ shippingMethod.translated.name }}
                                    </UiSelectItem>
                                </template>
                            </UiSelectGroup>
                        </UiSelectContent>
                    </UiSelect>
                </div>

                <div :class="getStyle('cart.summary.price')">
                    <div
                        v-for="(shippingCost, index) in shippingCosts"
                        :key="index"
                    >
                        {{ getFormattedPrice(shippingCost.shippingCosts?.totalPrice ?? 0) }}
                    </div>
                </div>
            </div>
        </slot>

        <slot name="summary-total-price">
            <div :class="getStyle('cart.summary.total')">
                <div :class="getStyle('cart.summary.totalHighlight')">
                    {{ $t('checkout.summaryTotalPrice') }}
                </div>

                <div :class="[getStyle('cart.summary.totalHighlight'), getStyle('cart.summary.price')]">
                    {{ getFormattedPrice(totalPrice) }}
                </div>
            </div>
        </slot>
    </div>

    <slot name="summary-promotion">
        <form :class="getStyle('cart.summary.promotion')" @submit.prevent="addPromotionCode">
            <UiInput
                v-model="promotionCode"
                type="text"
                :placeholder="$t('checkout.addPromotionPlaceholder')"
            />

            <UiButton
                :is-loading="promotionIsLoading"
                :disabled="!promotionCode.trim()"
            >
                <Icon v-if="!promotionIsLoading" name="mdi:check" class="size-4" />
            </UiButton>
        </form>
    </slot>
</template>
