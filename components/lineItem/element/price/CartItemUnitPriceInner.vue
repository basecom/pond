<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartItemUnitPrice?: string
    }>(),
    {
        cartItemUnitPrice: undefined,
    },
);
</script>
<template>
    <span>
        {{ cartItemUnitPrice }}*
    </span>
    <span class="line-item-unit-price-value-descriptor"> / {{ $t('checkout.lineItemUnitPriceDescriptor') }}</span>

</template>
