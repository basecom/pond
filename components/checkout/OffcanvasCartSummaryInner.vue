<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const {subtotal, totalPrice, shippingCosts, addPromotionCode} = useCart();
const {getShippingMethods, setShippingMethod, selectedShippingMethod} = useCheckout();
const {getFormattedPrice} = usePrice();
const props = withDefaults(
    defineProps<{
      cartDeliveries?: Schemas['CartDelivery'][];
    }>(),
    {
        cartDeliveries: undefined,
    },
);
const showSelectionSelect = ref(false);
const inputPromotionCode = ref('');
const shippingMethods = await getShippingMethods();
const shippingCost = ref(shippingCosts.value.find((shippingCost) => shippingCost.shippingMethod.id === selectedShippingMethod.value.id));

const setSelectedShippingMethod = (shippingMethodId: string) => setShippingMethod({id: shippingMethodId});
const addSelectedPromotionCode = async (promotionCode:string) => {
    console.log(promotionCode);
    return await addPromotionCode(promotionCode);
};
</script>
<template>
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
                <div class="flex justify-between">
                    <div>
                        <span>{{ $t('checkout.summaryShipping') }}</span>
                        <UiButton variant="ghost" class="p-1" @click="showSelectionSelect = !showSelectionSelect">({{
                            selectedShippingMethod.translated.name
                        }})
                        </UiButton>
                    </div>
                    <div class="flex items-center">
                        <strong>{{ shippingCost.shippingCosts.totalPrice < 0 ? '-' : '+' }} {{
                            getFormattedPrice(shippingCost.shippingCosts.totalPrice)
                        }}*</strong>
                    </div>
                </div>
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
                                <template v-for="(shippingMethod) in shippingMethods">
                                    <UiSelectItem :value="shippingMethod.id">
                                        {{ shippingMethod.translated.name }}
                                    </UiSelectItem>
                                </template>
                            </UiSelectGroup>
                        </UiSelectContent>
                    </UiSelect>
                </template>
            </div>
        </slot>
    </div>
    <div class="mb-4 text-xs">
        *{{ $t('general.grossTaxInformation') }}
    </div>
    <slot name="promotion">
        <div class="mb-4">
            <UiLabel>Promocode</UiLabel>
            <div class="flex w-full max-w-sm">
                <UiInput
                    v-model="inputPromotionCode"
                    class="w-full"
                    type="text"
                    :placeholder="$t('checkout.addPromotionPlaceholder')"
                />
                <UiButton @click="addSelectedPromotionCode(inputPromotionCode)">
                    <Icon name="mdi:check" class="size-4" />
                </UiButton>
            </div>
        </div>
    </slot>

</template>
