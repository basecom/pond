<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItem: Schemas['LineItem'];
      itemQuantity?: number;
      quantity?: number;

    }>(),
    {
        itemQuantity: 1,
        quantity: 1,
    },
);
const {cartItem, quantity} = toRefs(props);

defineEmits<{
  changeCartItemQuantity: [quantityInput: number]
}>();

const configStore = useConfigStore();
const maxQuantityConfig = configStore.get('core.cart.maxQuantity') as number;

const isDigital = computed(() => cartItem.value?.states?.includes('is-download') ||
      (cartItem.value?.payload?.maxPurchase === 1));
</script>

<template>
    <slot name="quantity-container">
        <UiNumberField
            class="w-full flex justify-between items-center"
            :model-value="quantity"
            :max="cartItem?.payload?.maxPurchase ?? maxQuantityConfig"
            :min="cartItem?.payload?.minPurchase ?? 1"
            :step="cartItem?.payload?.purchaseSteps ?? 1"
            :disabled="!cartItem?.stackable || isDigital"
            :default-value="itemQuantity"
            @update:model-value="(val) => { if (val !== quantity) $emit('changeCartItemQuantity', val) }"
        >
            <slot name="quantity-label">
                <UiLabel class="flex font-bold" :for="cartItem.id+'-quantity'">{{ $t('checkout.quantity') }}</UiLabel>
            </slot>
            <UiNumberFieldContent class="w-1/3">
                <UiNumberFieldDecrement class="cursor-pointer" />
                <UiNumberFieldInput :id="cartItem.id+'-quantity'" />
                <UiNumberFieldIncrement  class="cursor-pointer" />
            </UiNumberFieldContent>
        </UiNumberField>
    </slot>
</template>
