<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItemDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
        cartItemDeliveryPosition: undefined,
    },
);
</script>
<template>
    <CartItemElementDeliveryPositionInner :cart-item-delivery-position="cartItemDeliveryPosition" />

</template>
