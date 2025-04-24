<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import OffcanvasCartSummaryInner from "./OffcanvasCartSummaryInner.vue";
const props = withDefaults(
    defineProps<{
      cartDeliveries?: Schemas['CartDelivery'][];
    }>(),
    {
      cartDeliveries: undefined
    },
);
</script>
<template>
  <OffcanvasCartSummaryInner :cart-deliveries="cartDeliveries"/>

</template>