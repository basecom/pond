<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      cartItemDeliveryPosition?: Schemas['CartDeliveryPosition'];
    }>(),
    {
        cartItemDeliveryPosition: undefined,
    },
);
</script>

<template>
    <CartItemElementDeliveryPositionInner v-bind="$props" />
</template>
