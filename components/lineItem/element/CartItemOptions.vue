<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CartItemOptionsInner from './CartItemOptionsInner.vue';
const props = withDefaults(
    defineProps<{
      cartItemOptions?: Schemas['LineItem']['payload']['options']
    }>(),
    {
        cartItemOptions: undefined,
    },
);
</script>
<template>
    <CartItemOptionsInner :cart-item-options="cartItemOptions" />

</template>
