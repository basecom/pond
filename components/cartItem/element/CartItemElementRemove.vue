<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
      isLoading?: boolean
    }>(),
    {
        cartItem: undefined,
        isLoading: false,
    },
);
const emits = defineEmits<{
  isLoading: [boolean]
}>();

</script>
<template>
    <CartItemElementRemoveInner :cart-item="cartItem" @is-loading="(isLoadingEmit: boolean) => {emits('isLoading', isLoadingEmit)}" />
</template>
