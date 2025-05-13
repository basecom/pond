<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
    }>(),
    {
        cartItem: undefined,
    },
);
const emits = defineEmits<{
  isLoading: [boolean]
}>();

</script>
<template>
    <CartItemElementQuantityInner :cart-item="cartItem" @is-loading="(isLoadingEmit: boolean) => {emits('isLoading', isLoadingEmit)}" />
</template>
