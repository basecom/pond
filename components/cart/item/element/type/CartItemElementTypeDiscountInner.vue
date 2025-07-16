<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getMainImageUrl } from '@shopware-pwa/helpers-next';

const props = withDefaults(
    defineProps<{
      cartItem: Schemas['LineItem'];
      itemTotalPrice?: number;
    }>(),
    {
        itemTotalPrice: 0,
    },
);
const { cartItem } = toRefs(props);

const imageUrl = computed(() => props.cartItem ? getMainImageUrl(props.cartItem) : undefined);
</script>

<template>
    <slot name="discount-content">
        <slot name="image-container">
            <div class="order-1 mb-4 flex w-5/6 flex-col text-left">
                <div class="mb-2 w-auto">
                    <slot name="image">
                        <CartItemElementImage :cart-item-image="imageUrl" fallback="mdi:percent" />
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
                    <CartItemElementPriceTotal :cart-item-total-price="itemTotalPrice" />
                </slot>
            </div>
        </slot>
    </slot>
</template>
