<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {Loader2} from 'lucide-vue-next';
const {subtotal, shippingCosts, addPromotionCode} = useCart();
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
const isLoadingPromo = ref(false);
const isLoadingSelect = ref(false);

const setSelectedShippingMethod = async (shippingMethodId: string) => {
  isLoadingSelect.value = true;
  await setShippingMethod({id: shippingMethodId});
  isLoadingSelect.value = false;
}
const addSelectedPromotionCode = async (promotionCode: string) => {
  isLoadingPromo.value = true;
  await addPromotionCode(promotionCode);
  isLoadingPromo.value = false;
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
        <template v-if="!isLoadingSelect">
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
                <UiSelectValue/>
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
        </template>
        <template v-else>
          <Loader2 class="mr-2 size-4 animate-spin" />
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
        <UiButton @click="addSelectedPromotionCode(inputPromotionCode)" :is-loading="isLoadingPromo">
          <Icon name="mdi:check" class="size-4"/>
        </UiButton>
      </div>
    </div>
  </slot>

</template>
