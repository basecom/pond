<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import {toast} from '../../ui/toast';
import {ApiClientError} from '@shopware/api-client';
const { t } = useI18n();
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
      quantity: number,
      itemQuantity: number
    }>(),
    {
        cartItem: undefined,
        quantity: 1,
        itemQuantity: 1,
    },
);
const {cartItem, quantity} = toRefs(props);

const emits = defineEmits<{
  changeCartItemQuantity: [number]
}>();


</script>
<template>
    <CartItemElementQuantityInner
        :cart-item="cartItem"
        :quantity="quantity"
        :item-quantity="itemQuantity"
        @change-cart-item-quantity="(quantityInput: number) => emits('changeCartItemQuantity', quantityInput)"
    />
</template>
