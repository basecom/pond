<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
        cartItem: Schemas['LineItem'];
        isStackable?: boolean;
        itemQuantity?: number;
    }>(),
    {
        isStackable: false,
        itemQuantity: undefined,
    },
);

defineEmits<{
    'change-quantity': [quantity: number];
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <UiNumberField
        :id="`quantity-${cartItem.id}`"
        :default-value="itemQuantity"
        :min="cartItem.quantityInformation?.minPurchase"
        :max="cartItem.quantityInformation?.maxPurchase"
        :step="cartItem.quantityInformation?.purchaseSteps"
        :class="getStyle('cart.lineItem.quantity')"
        @update:model-value="val => $emit('change-quantity', val)"
    >
        <UiLabel :for="`quantity-${cartItem.id}`" class="sr-only">
            Menge
        </UiLabel>

        <UiNumberFieldContent>
            <UiNumberFieldDecrement />
            <UiNumberFieldInput />
            <UiNumberFieldIncrement />
        </UiNumberFieldContent>
    </UiNumberField>
</template>
