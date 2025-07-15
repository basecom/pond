<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemUnitPrice?: number
    }>(),
    {
        cartItemUnitPrice: 0,
    },
);
const { getFormattedPrice } = usePrice();
</script>

<template>
    <slot name="unit-price">
        <span v-if="cartItemUnitPrice">
            {{ getFormattedPrice(cartItemUnitPrice) }}*
        </span>
    </slot>
    <slot name="unit-price-descriptor">
        <span> {{ $t('checkout.lineItemUnitPriceSeparator') }} {{ $t('checkout.lineItemUnitPriceDescriptor') }}</span>
    </slot>
</template>
