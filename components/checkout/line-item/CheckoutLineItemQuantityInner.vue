<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
        cartItem: Schemas['LineItem'];
        itemQuantity?: number;
    }>(),
    {
        itemQuantity: undefined,
    },
);

defineEmits<{
    changeQuantity: [quantity: number];
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
        @update:model-value="val => $emit('changeQuantity', val)"
    >
        <UiLabel :for="`quantity-${cartItem.id}`" class="sr-only">
            {{ $t('checkout.cartHeaderQuantity') }}
        </UiLabel>

        <UiNumberFieldContent>
            <UiNumberFieldDecrement />
            <UiNumberFieldInput />
            <UiNumberFieldIncrement />
        </UiNumberFieldContent>
    </UiNumberField>
</template>
