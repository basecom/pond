<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getMainImageUrl } from '@shopware-pwa/helpers-next';
import { usePondStyle } from '~/composables/usePondStyle';

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

const { getStyle } = usePondStyle();
const imageUrl = computed(() => props.cartItem ? getMainImageUrl(props.cartItem) : undefined);
</script>

<template>
    <slot name="discount-content">
        <slot name="image-container">
            <div :class="getStyle('cart.discountWrapper')">
                <div :class="getStyle('cart.discountImageWrapper')">
                    <slot name="image">
                        <CartItemElementImage :cart-item-image="imageUrl" fallback="mdi:percent" />
                    </slot>
                </div>
                <div :class="getStyle('cart.discountLabel')">
                    <slot name="label">
                        {{ cartItem?.label }}
                    </slot>
                </div>
            </div>
        </slot>
        <slot name="total-price-wrapper">
            <div :class="getStyle('cart.discountTotalPriceWrapper')">
                <slot name="total-price">
                    <CartItemElementPriceTotal :cart-item-total-price="itemTotalPrice" />
                </slot>
            </div>
        </slot>
    </slot>
</template>
