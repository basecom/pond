<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemQuantityInner from './CartItemQuantityInner.vue';
const props = withDefaults(
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
    <CartItemQuantityInner :cart-item="cartItem" @is-loading="(isLoadingEmit: boolean) => {emits('isLoading', isLoadingEmit)}" />
</template>
