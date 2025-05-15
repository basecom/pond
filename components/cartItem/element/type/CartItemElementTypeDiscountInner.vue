<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      itemTotalPrice: number
    }>(),
    {
        cartItem: undefined,
        itemTotalPrice: 0
    },
);
const {getFormattedPrice} = usePrice();

</script>
<template>
    <slot name="imageContainer">
        <div class="order-1 mb-4 flex w-5/6 flex-col">
            <div class="mb-2 w-auto">
                <slot name="image">
                    <CartItemElementImage :cart-item-image="cartItem.cover?.url" />
                </slot>
            </div>
            <div class="font-bold">
                <NuxtLinkLocale to="/">
                    <slot name="label">
                        {{ cartItem.label }}
                    </slot>
                </NuxtLinkLocale>
            </div>
        </div>
    </slot>
    <slot name="totalPriceWrapper">
        <div class="order-4 flex w-full justify-end">
            <slot name="totalPrice">
                <CartItemElementPriceTotal :cart-item-total-price="getFormattedPrice(itemTotalPrice)" />
            </slot>
        </div>
    </slot>
</template>
