<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {Loader2} from 'lucide-vue-next';
import type {AcceptableValue} from 'reka-ui';

const {getFormattedPrice} = usePrice();
const showSelectionSelect = ref(false);

withDefaults(
    defineProps<{
      cart?: Schemas['Cart'];
      cartDeliveries?: Schemas['CartDelivery'][];
      shippingMethods?: Schemas['ShippingMethod'][];
      selectedShippingMethod?: Schemas['ShippingMethod'];
      shippingCost?: Schemas['CartDelivery'];
      subtotal?: number;
      isLoading?: {
        promo: boolean,
        select: boolean
      };
      isLoggedIn?: boolean
    }>(),
    {
        cart: undefined,
        cartDeliveries: undefined,
        shippingMethods: undefined,
        selectedShippingMethod: undefined,
        shippingCost: undefined,
        subtotal: undefined,
        isLoading: () => ({
            promo: false,
            select: false,
        }),
        isLoggedIn: false,
    },
);
const inputPromotionCode = ref('');

const emits = defineEmits<{
  setSelectedShippingMethod: [shippingMethodId: AcceptableValue];
  addSelectedPromotionCode: [promotionCode: string];
}>();

const setSelectedShippingMethod = async (shippingMethodId: AcceptableValue) => {
    emits('setSelectedShippingMethod', shippingMethodId);
};

const addSelectedPromotionCode = async (promotionCode: string) => {
    emits('addSelectedPromotionCode', promotionCode);
    inputPromotionCode.value = '';
};

</script>
<template>
    <template v-if="isLoggedIn">
        <slot name="wrapper">
            <div>
                <slot name="subTotal">
                    <div class="flex justify-between">
                        <div class="font-bold">
                            {{ $t("checkout.subTotal") }}
                        </div>
                        <div>
                            {{ getFormattedPrice(subtotal) }}*
                        </div>
                    </div>
                </slot>
                <slot name="shipping">
                    <div class="mb-4">
                        <template v-if="!isLoading.select">
                            <div class="flex justify-between">
                                <slot name="shipping-label">
                                    <div>
                                        <span>{{ $t('checkout.summaryShipping') }}</span>
                                        <UiButton variant="ghost" class="p-1" @click="showSelectionSelect = !showSelectionSelect">({{
                                            selectedShippingMethod.translated.name
                                        }})
                                        </UiButton>
                                    </div>
                                </slot>
                                <slot name="shipping-cost">
                                    <div class="flex items-center">
                                        <template v-if="shippingCost.shippingCosts">
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
                                        :model-value="selectedShippingMethod.id"
                                        @update:model-value="setSelectedShippingMethod"
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
                        <template v-else>
                            <Loader2 class="mr-2 size-4 animate-spin" />
                        </template>
                    </div>
                </slot>
            </div>
        </slot>
        <slot name="tax-information">
            <div class="mb-4 text-xs">
                <template v-if="cart.price?.taxStatus === 'net'">
                    *{{ $t('general.netTaxInformation') }}
                </template>
                <template v-else>
                    *{{ $t('general.grossTaxInformation') }}
                </template>
            </div>
        </slot>
        <slot name="promotion">
            <div class="mb-4">
                <slot name="promotion-label"><UiLabel>{{ $t('checkout.promoLabel') }}</UiLabel></slot>
                <slot name="promotion-input-button">
                    <div class="flex w-full max-w-sm">
                        <UiInput
                            v-model="inputPromotionCode"
                            class="w-full"
                            type="text"
                            :placeholder="$t('checkout.addPromotionPlaceholder')"
                        />
                        <slot name="promotion-button">
                            <UiButton :is-loading="isLoading.promo" @click="addSelectedPromotionCode(inputPromotionCode)">
                                <Icon name="mdi:check" class="size-4" />
                            </UiButton>
                        </slot>
                    </div>
                </slot>
            </div>
        </slot>
    </template>
</template>
