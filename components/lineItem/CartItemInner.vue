<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import CartItemRemove from './element/CartItemRemove.vue';
import CartItemQuantity from './element/CartItemQuantity.vue';
import CartItemTotalPrice from './element/price/CartItemTotalPrice.vue';
import CartItemUnitPrice from './element/price/CartItemUnitPrice.vue';
import CartItemProduct from './element/type/CartItemProduct.vue';
import CartItemDiscount from './element/type/CartItemDiscount.vue';
import {Loader2} from 'lucide-vue-next';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
        cartItem: undefined,
        cartDeliveryPosition: undefined,
    },
);

const isLoading = ref(false);
</script>
<template>
  <div v-if="isLoading">
    <div class="flex justify-center items-center p-24">
    <Loader2 class="size-12 animate-spin" />
    </div>
  </div>
    <div v-else class="flex flex-wrap border-b py-4">
        <template v-if="cartItem.type === 'product'">
          <CartItemProduct :cart-item="cartItem" :cart-delivery-position="cartDeliveryPosition" />
          <div class="order-2 flex w-1/6 justify-end"><CartItemRemove :cart-item="cartItem" @is-loading="(isLoadingEmit: boolean) => isLoading = isLoadingEmit"/></div>
        </template>
        <template v-if="cartItem.type === 'promotion'">
          <CartItemDiscount :cart-item="cartItem" />
          <div class="order-2 flex w-1/6 justify-end"><CartItemRemove :cart-item="cartItem" @is-loading="(isLoadingEmit: boolean) => isLoading = isLoadingEmit" /></div>
        </template>
    </div>
</template>
