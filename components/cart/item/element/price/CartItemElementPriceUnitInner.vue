<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemUnitPrice?: string
    }>(),
    {
        cartItemUnitPrice: undefined,
    },
);
</script>

<template>
    <slot name="unit-price">
        <span v-if="cartItemUnitPrice">
            {{ cartItemUnitPrice }}*
        </span>
    </slot>
    <slot name="unit-price-descriptor">
        <span> {{ $t('checkout.lineItemUnitPriceSeparator') }} {{ $t('checkout.lineItemUnitPriceDescriptor') }}</span>
    </slot>
</template>
