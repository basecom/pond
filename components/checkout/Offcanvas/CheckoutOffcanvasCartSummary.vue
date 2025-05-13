<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartDeliveries?: Schemas['CartDelivery'][];
    }>(),
    {
        cartDeliveries: undefined,
    },
);
</script>
<template>
    <CheckoutOffcanvasCartSummaryInner :cart-deliveries="cartDeliveries" />

</template>
