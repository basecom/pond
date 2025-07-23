<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { AcceptableValue } from 'reka-ui';

withDefaults(
    defineProps<{
      cart?: Schemas['Cart'];
      cartDeliveries?: Schemas['CartDelivery'][];
      shippingMethods?: Schemas['ShippingMethod'][];
      selectedShippingMethod?: Schemas['ShippingMethod'];
      shippingCost?: Schemas['CartDelivery'];
      subtotal?: number;
      isLoading?: {
        promotion: boolean,
        select: boolean
      };
    }>(),
    {
        cart: undefined,
        cartDeliveries: undefined,
        shippingMethods: undefined,
        selectedShippingMethod: undefined,
        shippingCost: undefined,
        subtotal: undefined,
        isLoading: () => ({
            promotion: false,
            select: false,
        }),
    },
);

const emits = defineEmits<{
  'set-selected-shipping-method': [shippingMethodId: AcceptableValue];
  'add-selected-promotion-code': [promotionCode: string];
}>();

const { getFormattedPrice } = usePrice();
const { getStyle } = usePondStyle();

const { t } = useI18n();

const showSelectionSelect = ref(false);

const inputPromotionCode = ref('');

const addSelectedPromotionCode = (promotionCode: string) => {
    if(!inputPromotionCode.value.trim()) {
        return;
    }

    emits('add-selected-promotion-code', promotionCode);
    inputPromotionCode.value = '';
};

</script>

<template>
    <slot name="wrapper">
        <div>
            <slot name="subTotal">
                <div :class="getStyle('cart.subTotalRow')">
                    <div :class="getStyle('cart.subTotalLabel')">
                        {{ $t("checkout.subTotal") }}
                    </div>
                    <div>
                        {{ getFormattedPrice(subtotal) }}*
                    </div>
                </div>
            </slot>
            <slot name="shipping">
                <div :class="getStyle('cart.shippingRow')">
                    <LayoutLoader :is-loading="isLoading.select" :spinner-classes="{ [getStyle('cart.shippingSpinnerClasses')]: true }">
                        <template #loading-spinner-content>
                            <div :class="getStyle('cart.shippingContainer')">
                                <slot name="shipping-label">
                                    <div :class="getStyle('cart.shippingLabel')">
                                        <span>{{ $t('checkout.summaryShipping') }}</span>
                                        <UiButton variant="ghost" :class="getStyle('cart.shippingButton')" @click="showSelectionSelect = !showSelectionSelect">({{
                                            selectedShippingMethod?.translated?.name || $t('checkout.noShippingMethod')
                                        }})
                                        </UiButton>
                                    </div>
                                </slot>
                                <slot name="shipping-cost">
                                    <div :class="getStyle('cart.shippingCost')">
                                        <template v-if="shippingCost?.shippingCosts">
                                            <strong>{{ shippingCost.shippingCosts?.totalPrice < 0 ? '-' : '+' }} {{
                                                getFormattedPrice(shippingCost.shippingCosts?.totalPrice || 0)
                                            }}*</strong>
                                        </template>
                                    </div>
                                </slot>
                            </div>
                            <slot name="shipping-selection">
                                <template v-if="showSelectionSelect">
                                    <UiSelect
                                        :model-value="selectedShippingMethod?.id"
                                        @update:model-value="(shippingMethodId: AcceptableValue) => emits('set-selected-shipping-method', shippingMethodId)"
                                    >
                                        <UiSelectTrigger>
                                            <UiSelectValue />
                                        </UiSelectTrigger>
                                        <UiSelectContent>
                                            <UiSelectGroup>
                                                <template v-for="(shippingMethod) in shippingMethods" :key="shippingMethod.id">
                                                    <slot name="shipping-selection-option">
                                                        <UiSelectItem :value="shippingMethod.id">
                                                            {{ shippingMethod.translated.name }}
                                                        </UiSelectItem>
                                                    </slot>
                                                </template>
                                            </UiSelectGroup>
                                        </UiSelectContent>
                                    </UiSelect>
                                </template>
                            </slot>
                        </template>
                    </LayoutLoader>
                </div>
            </slot>
        </div>
    </slot>
    <slot name="tax-information">
        <div :class="getStyle('cart.taxInformation')">
            <template v-if="cart?.price?.taxStatus === 'net'">
                *{{ $t('general.netTaxInformation') }}
            </template>
            <template v-else>
                *{{ $t('general.grossTaxInformation') }}
            </template>
        </div>
    </slot>
    <slot name="promotion">
        <div :class="getStyle('cart.promotionRow')">
            <slot name="promotion-input-button">
                <div :class="getStyle('cart.promotionInputWrapper')">
                    <UiInput
                        :id="t('checkout.promoLabel')"
                        v-model="inputPromotionCode"
                        :class="getStyle('cart.promotionInput')"
                        type="text"
                        :placeholder="$t('checkout.addPromotionPlaceholder')"
                    />
                    <slot name="promotion-button">
                        <UiButton
                            :aria-label="t('checkout.addPromotionPlaceholder')"
                            :is-loading="isLoading.promotion"
                            :disabled="!inputPromotionCode.trim()"
                            :class="getStyle('cart.promotionButton')"
                            @click="addSelectedPromotionCode(inputPromotionCode)"
                        >
                            <Icon name="mdi:check" class="size-4" />
                        </UiButton>
                    </slot>
                </div>
            </slot>
        </div>
    </slot>
</template>
