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
        <span>
            {{ cartItemUnitPrice }}*
        </span>
    </slot>
    <slot name="unit-price-descriptor">
        <span> / {{ $t('checkout.lineItemUnitPriceDescriptor') }}</span>
    </slot>
</template>
