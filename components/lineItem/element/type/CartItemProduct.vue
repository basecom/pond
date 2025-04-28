<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemProductInner from './CartItemProductInner.vue';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
      cartDeliveryPosition?: Schemas['CartDeliveryPosition'],
    }>(),
    {
        cartItem: undefined,
        cartDeliveryPosition: undefined,
    },
);
const emits = defineEmits<{
  isLoading: [boolean]
}>();
</script>
<template>
    <CartItemProductInner :cart-item="cartItem" :cart-delivery-position="cartDeliveryPosition" @is-loading="(isLoadingEmit: boolean) => {emits('isLoading', isLoadingEmit)}" />

</template>
