<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartItemTotalPrice?: string
    }>(),
    {
        cartItemTotalPrice: undefined,
    },
);
</script>
<template>
    <span class="font-bold">
      <slot name="totalPrice">
        {{ cartItemTotalPrice }}*
        </slot>
    </span>

</template>
