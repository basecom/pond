<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItems?: Schemas['LineItem'][];
      cartDeliveries?: Schemas['CartDelivery'][];
    }>(),
    {
      cartItems: undefined,
      cartDeliveries: undefined,
    },
);

</script>
<template>
  <CheckoutOffcanvasCartInner :cart-items="cartItems" :cart-deliveries="cartDeliveries" />
</template>
