<script setup lang="ts">
withDefaults(
    defineProps<{
      cartItemTotalPrice?: number
    }>(),
    {
        cartItemTotalPrice: 0,
    },
);
const { getFormattedPrice } = usePrice();
const { getStyle } = usePondStyle();
</script>

<template>
    <span :class="getStyle('cart.totalPriceWrapper')">
        <slot name="total-price">
            {{ getFormattedPrice(cartItemTotalPrice) }}*
        </slot>
    </span>
</template>
