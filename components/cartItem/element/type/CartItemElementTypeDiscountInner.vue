<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {getMainImageUrl} from '@shopware-pwa/helpers-next';

withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      itemTotalPrice?: number,
    }>(),
    {
        cartItem: undefined,
        itemTotalPrice: 0,
    },
);
const {getFormattedPrice} = usePrice();

</script>
<template>
    <slot name="discount-content">
        <slot name="image-container">
            <div class="order-1 mb-4 flex w-5/6 flex-col">
                <div class="mb-2 w-auto">
                    <slot name="image">
                        <CartItemElementImage :cart-item-image="cartItem ? getMainImageUrl(cartItem) : undefined" />
                    </slot>
                </div>
                <div class="font-bold">
                    <slot name="label">
                        {{ cartItem?.label }}
                    </slot>
                </div>
            </div>
        </slot>
        <slot name="total-price-wrapper">
            <div class="order-4 flex w-full justify-end">
                <slot name="total-price">
                    <CartItemElementPriceTotal :cart-item-total-price="getFormattedPrice(itemTotalPrice)" />
                </slot>
            </div>
        </slot>
    </slot>
</template>
