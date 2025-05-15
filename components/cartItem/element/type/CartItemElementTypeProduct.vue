<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
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
const {cartItem} = toRefs(props);
const {
  itemOptions,
} = useCartItem(cartItem);

const {
  itemTotalPrice,
  itemRegularPrice,
} = useCartItem(cartItem);


const emits = defineEmits<{
  isLoading: [boolean]
}>();
</script>
<template>
    <CartItemElementTypeProductInner :cart-item="cartItem"
                                     :cart-delivery-position="cartDeliveryPosition"
                                     :item-total-price="itemTotalPrice"
                                     :item-regular-price="itemRegularPrice"
                                     :item-options="itemOptions"
                                     @is-loading="(isLoadingEmit: boolean) => {emits('isLoading', isLoadingEmit)}" />

</template>
