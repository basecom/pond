<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import {toast} from '../../ui/toast';
import {ApiClientError} from '@shopware/api-client';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
    }>(),
    {
        cartItem: undefined,
    },
);
const emits = defineEmits<{
  removeCartItem: [],
}>();

</script>
<template>
    <CartItemElementRemoveInner
      @remove-cart-item="emits('removeCartItem')"
    />
</template>
