<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemAddToWishlistInner from "./CartItemAddToWishlistInner.vue";
const props = withDefaults(
    defineProps<{
      referencedId?: string
    }>(),
    {
      referencedId: undefined
    },
);
</script>
<template>
  <CartItemAddToWishlistInner :referenced-id="referencedId"/>

</template>