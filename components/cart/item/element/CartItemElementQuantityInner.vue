<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItem: Schemas['LineItem'];
      quantity?: number;
      itemQuantity?: number;

    }>(),
    {
        quantity: 1,
        itemQuantity: 1,
    },
);

const { cartItem, quantity } = toRefs(props);

defineEmits<{
  'change-cart-item-quantity': [quantityInput: number]
}>();

const { getStyle } = usePondStyle();
const configStore = useConfigStore();
const maxQuantityConfig = configStore.get('core.cart.maxQuantity') as number;

const isDigital = computed(() => cartItem.value?.states?.includes('is-download') ||
      (cartItem.value?.payload?.maxPurchase === 1));
</script>

<template>
    <slot name="quantity-container">
        <UiNumberField
            :class="getStyle('cart.quantityField')"
            :model-value="quantity"
            :max="cartItem?.payload?.maxPurchase ?? maxQuantityConfig"
            :min="cartItem?.payload?.minPurchase ?? 1"
            :step="cartItem?.payload?.purchaseSteps ?? 1"
            :disabled="!cartItem?.stackable || isDigital"
            :default-value="itemQuantity"
            @update:model-value="(val: number) => { if (val !== quantity) $emit('change-cart-item-quantity', val) }"
        >
            <slot name="quantity-label">
                <UiLabel :class="getStyle('cart.quantityLabel')" :for="`${cartItem.id}-quantity`">{{ $t('checkout.quantity') }}</UiLabel>
            </slot>
            <UiNumberFieldContent :class="getStyle('cart.quantityFieldContent')">
                <UiNumberFieldDecrement />
                <UiNumberFieldInput :id="cartItem.id+'-quantity'" />
                <UiNumberFieldIncrement />
            </UiNumberFieldContent>
        </UiNumberField>
    </slot>
</template>
