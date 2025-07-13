<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
withDefaults(
    defineProps<{
      cartItemOptions?: Schemas['LineItem']['payload']['options'];
    }>(),
    {
        cartItemOptions: undefined,
    },
);
</script>

<template>
    <CartItemElementOptionsInner v-bind="$props" />
</template>
