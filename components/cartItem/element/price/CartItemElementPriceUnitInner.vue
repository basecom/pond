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
    <slot name="unitPrice">
        <span>
            {{ cartItemUnitPrice }}*
        </span>
    </slot>
    <slot name="unitPriceDescriptor">
        <span> / {{ $t('checkout.lineItemUnitPriceDescriptor') }}</span>
    </slot>
</template>
